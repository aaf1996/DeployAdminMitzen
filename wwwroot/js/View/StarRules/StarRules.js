ns('Mitosiz.Site.StarRules.Index')
Mitosiz.Site.StarRules.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Function.clsUpdateDataClick();
        base.Function.GetStarRulesForAdmin();

        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        starRulesId: 0,
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyTable'); },
        modalSave: function () { return $('#modalSave'); },
        txtTypePurchase: function () { return $('#txtTypePurchase'); },
        txtStarPoints: function () { return $('#txtStarPoints'); },
        slcActive: function () { return $('#slcActive'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        btnCreateModal: function () { return $('#btnCreateModal'); },
    };
    base.Event = {
        AjaxGetStarRulesForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.starRulesForAdmin);
                }
            }
        },
        AjaxGetDetailStarRulesForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataModal(data.data);
                    base.Control.modalSave().modal('show');
                }
            }
        },
        AjaxUpdateStarRulesForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalSave().modal('hide');
                    Swal.fire("Excelente !!", "Las estrellas fueron actualizadas !!", "success")
                    base.Function.GetStarRulesForAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
            }
        },
        btnUpdateModalClick: function () {
            base.Ajax.AjaxUpdateStarRulesForAdmin.data = {
                starRulesId: base.Parameters.starRulesId,
                starPoints: base.Control.txtStarPoints().val(),
                status: base.Control.slcActive().val(),
            };
            base.Ajax.AjaxUpdateStarRulesForAdmin.submit();
        },
    };
    base.Ajax = {
        AjaxGetStarRulesForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarRules.Actions.GetStarRulesForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetStarRulesForAdminSuccess
        }),
        AjaxGetDetailStarRulesForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarRules.Actions.GetDetailStarRulesForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailStarRulesForAdminSuccess
        }),
        AjaxUpdateStarRulesForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarRules.Actions.UpdateStarRulesForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateStarRulesForAdminSuccess
        }),
    };
    base.Function = {
        UpdatePagination: function () {
            base.Control.divPagination().empty();
            base.Control.divPagination().append('<li class="page-item page-indicator"><a class="page-link" href="#" id="prev">«</a></li>');

            if (base.Parameters.totalPages <= 5) {
                for (var i = 1; i <= base.Parameters.totalPages; i++) {
                    base.Control.divPagination().append('<li class="page-item ' + (i === base.Parameters.currentPage ? 'active' : '') + '"><a class="page-link" href="#">' + i + '</a></li>');
                }
            } else {
                var startPage = Math.max(1, base.Parameters.currentPage - 2);
                var endPage = Math.min(base.Parameters.totalPages, base.Parameters.currentPage + 2);

                if (base.Parameters.currentPage >= base.Parameters.totalPages - 2) {
                    startPage = base.Parameters.totalPages - 4;
                }

                if (startPage > 1) {
                    base.Control.divPagination().append('<li class="page-item"><a class="page-link" href="#">1</a></li>');
                    if (startPage > 2) {
                        if (base.Parameters.currentPage != base.Parameters.totalPages) {
                            endPage--;
                        }
                        startPage++;
                        var valueHidden = startPage - 1;
                        base.Control.divPagination().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link" href="#">..</a></li>');
                    }
                }

                for (var i = startPage; i <= endPage; i++) {
                    base.Control.divPagination().append('<li class="page-item ' + (i === base.Parameters.currentPage ? 'active' : '') + '"><a class="page-link" href="#">' + i + '</a></li>');
                }

                if (endPage < base.Parameters.totalPages) {
                    if (endPage < base.Parameters.totalPages - 1) {
                        var valueHidden = endPage + 1;
                        base.Control.divPagination().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link" href="#">..</a></li>');
                    }
                    base.Control.divPagination().append('<li class="page-item"><a class="page-link" href="#">' + base.Parameters.totalPages + '</a></li>');
                }
            }

            base.Control.divPagination().append('<li class="page-item page-indicator"><a class="page-link" href="#" id="next">»</a></li>');
        },
        clsNumberPagination: function () {
            var parentElement = $(document);
            parentElement.on('click', '.page-link', function () {
                var page = $(this).text();
                if (page === '«') {
                    if (base.Parameters.currentPage > 1) {
                        base.Parameters.currentPage--;
                    }
                } else if (page === '»') {
                    if (base.Parameters.currentPage < base.Parameters.totalPages) {
                        base.Parameters.currentPage++;
                    }
                } else if (page === '..') {
                    base.Parameters.currentPage = parseInt($(this).attr('value-hidden'));
                } else {
                    base.Parameters.currentPage = parseInt(page);
                }
                base.Function.GetStarRulesForAdmin();
            });
        },
        GetStarRulesForAdmin: function () {
            base.Ajax.AjaxGetStarRulesForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination
            };
            base.Ajax.AjaxGetStarRulesForAdmin.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
                base.Control.tbodyTable().append('<tr style="text-align: center;">' +
                    '<td>' +
                    '<div class="dropdown">' +
                    '<button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">' +
                    '<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">' +
                    '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                    '<rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" />' +
                    '</g>' +
                    '</svg>' +
                    '</button>' +
                    '<div class="dropdown-menu">' +
                    '<a class="dropdown-item updateData" value="' + data.starRulesId + '" href="#">Actualizar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.starRulesId + '</strong></td>' +
                    '<td>' + data.typePurchase + '</td>' +
                    '<td>' + data.starPoints + '</td>' +
                    '<td style="text-align: center !important;">' + data.status + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var starRulesId = $(this).attr('value');
                base.Control.btnUpdateModal().show();
                base.Control.btnCreateModal().hide();
                base.Parameters.starRulesId = starRulesId;
                base.Ajax.AjaxGetDetailStarRulesForAdmin.data = {
                    starRulesId: starRulesId
                };
                base.Ajax.AjaxGetDetailStarRulesForAdmin.submit();
            });
        },
        FillDataModal: function (data) {
            base.Control.txtTypePurchase().val(data.typePurchase);
            base.Control.txtStarPoints().val(data.starPoints);
            base.Control.slcActive().val(data.status);
            base.Control.slcActive().selectpicker('refresh');
        },
    };
}