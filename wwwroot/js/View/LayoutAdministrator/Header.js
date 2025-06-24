ns('Mitosiz.Site.Header.Logout')
Mitosiz.Site.Header.Logout.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Control.bntLogout().click(base.Event.bntLogoutClick);
    };
    base.Parameters = {
    };
    base.Control = {
        bntLogout: function () { return $('.logoutProcess'); }
    };
    base.Event = {
        bntLogoutClick: function () {
            base.Ajax.AjaxLogout.submit();
        },
        AjaxLogoutSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    window.location.href = Mitosiz.Site.Header.Actions.RedirectLogin;
                }
            }
        }
    };
    base.Ajax = {
        AjaxLogout: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Header.Actions.LogoutSession,
            autoSubmit: false,
            onSuccess: base.Event.AjaxLogoutSuccess
        })
    };
    base.Function = {

    };
}