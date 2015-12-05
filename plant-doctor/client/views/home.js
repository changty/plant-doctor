Template.home.onRendered(function() {
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_ONLY"
	});
	console.log("i'm ready!");
});