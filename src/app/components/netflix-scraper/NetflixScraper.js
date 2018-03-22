// return if given improper command line arguments
if (process.argv.length !== 4) {
  throw new Error('Incorrect number of arguments in PuppeteerScraper')
}

// retrieve login credentials
const username = process.argv[2]
const password = process.argv[3]

const puppeteer = require('puppeteer')
const databaseManager = require('../database/DatabaseManager')

const run = async () => {
  // open/create netflix database
  const db = await databaseManager.buildDB()

  // launch browser
  console.log('Opening Netflix...')
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()

  // helper methods:

  // click a selector and wait for network to be idle
  page.clickAndWait = async (selector) => {
    await Promise.all([
      page.click(selector),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ])
  }

  // click selector1 and wait for selector2 to appear
  page.clickAndWaitForSelector = async (selector1, selector2) => {
    await Promise.all([
      page.click(selector1),
      page.waitForSelector(selector2)
    ])
  }

  // goto a page and wait for network to be idle
  page.gotoAndWait = async (url) => {
    await Promise.all([
      page.goto(url),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ])
  }

  // close browser and page
  const closeScraper = async () => {
    await page.close()
    await browser.close()
  }

  // navigate to url with title cards, and get page to display titles across all genres in DOM
  // this is tricky, because Netflix requires you to scroll down to display more titles
  // Until I can think of a better solution, this is what I am doing:
  // - start with titles organized reverse alphabetically, get first item displayed (we call it lastItem)
  // - switch to a-z alphabetical order, and keep scrolling down until lastItem is added to DOM
  page.getContentIntoDom = async (url) => {
    console.log('Getting content into DOM...')
    await page.gotoAndWait(`${url}?so=za`)
    const lastItem = await page.$eval('#title-card-0-0 a', el => el.getAttribute('aria-label'))
    await page.gotoAndWait(`${url}?so=az`)
    while (true) {
      /* eslint-disable */
      const lastItemVisible = await page.$(`[aria-label="${lastItem}"]`)
      if (lastItemVisible) {
        break
      }
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight)
      })
      await page.screenshot({ path: 'test.png' })
      /* eslint-enable */
    }
  }

  // scrape Netflix content from page with title cards
  page.scrapeContent = async () => {
    // get an array of all content info
    const content = await page.$$eval('.title-card a', divs => divs.map((a) => {
      return {
        name: a.getAttribute('aria-label'),
        link: a.href
      }
    }))

    // add array to database
    db.serialize(() => {
      for (let i = 0; i < content.length; i += 1) {
        db.run('INSERT INTO Netflix (name, link) VALUES ($name, $link)', {
          $name: content[i].name,
          $link: content[i].link
        }, (err) => {
          if (err) {
            throw err
          }
          process.stdout.write(`Scraping TV shows: ${((i / (content.length - 1)) * 100).toFixed(2)}%\r`)
        })
      }
      db.close()
    })
  }

  // main script:

  // goto netflix
  await page.gotoAndWait('https://www.netflix.com')

  // goto login page
  await page.clickAndWait('.authLinks')

  // enter credentials and login
  console.log('Logging in...')
  await page.type('#email.ui-text-input', username)
  await page.type('#password.ui-text-input', password)
  await page.clickAndWait('.login-button')

  // return if failed login
  if (await page.$('.ui-message-error')) {
    closeScraper()
    throw new Error('Failed Netflix login')
  }

  console.log('Login successful')

  // select first profile listed
  await page.clickAndWaitForSelector('.profile-icon', '.navigation-tab')

  // get links to tv shows and movies
  let genreLinks = await page.$$eval('.navigation-tab a', divs => divs.map((a) => {
    return a.href
  }))
  genreLinks = genreLinks.slice(1, 3)

  // scrape TV shows
  await page.getContentIntoDom(genreLinks[0])
  await page.scrapeContent()

  // scrape movies
  // see: https://github.com/ivansg44/reimagined-pancake/issues/3
  // console.log('Scraping movies...')
  // await page.getContentIntoDom(genreLinks[1])
  // await page.scrapeContent()
  // console.log('Finished scraping movies')

  closeScraper()
}

run()
