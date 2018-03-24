//Base Authable Route Loading Class

module.exports =
class AuthableLoader extends require("./RoutesLoader") {
	constructor(db, authLoader) {
		super(db);
		this.auth = authLoader;
	}
	
	authenticate(token) {
		return this.auth.authenticate(token);
	}
}