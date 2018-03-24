//Base Authable Route Loading Class

module.exports =
class AuthableLoader extends require("./RoutesLoader") {
	constructor(db, authLoader) {
		super(db);
		this.__auth = authLoader;
	}
	
	authenticate(token) {
		return this.__auth.authenticate(token);
	}
}