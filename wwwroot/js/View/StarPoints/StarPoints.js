ns('Mitosiz.Site.StarPoints.Index')
Mitosiz.Site.StarPoints.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Function.clsUpdateDataClick();
        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);

        base.Control.btnRecalculation().click(base.Event.btnRecalculationClick);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Ajax.GetStarPeriodDropDown.submit();
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        starPointsId: 0,
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyTable'); },
        txtUserIdFilter: function () { return $('#txtUserIdFilter'); },
        txtNamesFilter: function () { return $('#txtNamesFilter'); },
        slcPeriodFilter: function () { return $('#slcPeriodFilter'); },
        slcProcess: function () { return $('#slcProcess'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        btnRecalculation: function () { return $('#btnRecalculation'); },
        modalSave: function () { return $('#modalSave'); },
        txtFullName: function () { return $('#txtFullName'); },
        txtStarPoints: function () { return $('#txtStarPoints'); },
        txtExtraStar: function () { return $('#txtExtraStar'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        btnCreateModal: function () { return $('#btnCreateModal'); },
    };
    base.Event = {
        AjaxGetStarPointsForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.starPointsForAdmin);
                }
            }
        },
        AjaxRecalculationStarPointsSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    $('#loading-area').fadeOut();
                    Swal.fire("Excelente !!", "Recalculo terminado !!", "success");
                    base.Function.GetStarPointsForAdmin();
                }
            }
        },
        AjaxGetDetailStarPointsForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataModal(data.data);
                    base.Control.modalSave().modal('show');
                }
            }
        },
        AjaxUpdateStarPointsForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalSave().modal('hide');
                    Swal.fire("Excelente !!", "Las estrellas fueron actualizadas !!", "success")
                    base.Function.GetStarPointsForAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
            }
        },
        btnUpdateModalClick: function () {
            base.Ajax.AjaxUpdateStarPointsForAdmin.data = {
                starPointsId: base.Parameters.starPointsId,
                extraStar: base.Control.txtExtraStar().val(),
            };
            base.Ajax.AjaxUpdateStarPointsForAdmin.submit();
        },
        GetStarPeriodDropDownSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcPeriodFilter().empty();
                    $.each(data.data, function (key, value) {
                        base.Control.slcPeriodFilter().append($('<option>', {
                            value: value.starPeriodId,
                            text: value.periodName
                        }));
                    });
                    base.Control.slcPeriodFilter().selectpicker('refresh');
                    base.Function.GetStarPointsForAdmin();
                }
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Function.GetStarPointsForAdmin();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Function.GetStarPointsForAdmin();
        },
        btnRecalculationClick: function () {
            $('#loading-area').fadeIn();
            var process = base.Control.slcProcess().val();
            if (process == "1") {
                base.Ajax.AjaxRecalculationStarPoints.data = {
                    starPeriodId: base.Control.slcPeriodFilter().val()
                };
                base.Ajax.AjaxRecalculationStarPoints.submit();
            }
        },
    };
    base.Ajax = {
        GetStarPeriodDropDown: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarPoints.Actions.GetStarPeriodDropDown,
            autoSubmit: false,
            onSuccess: base.Event.GetStarPeriodDropDownSuccess
        }),
        AjaxRecalculationStarPoints: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarPoints.Actions.RecalculationStarPoints,
            autoSubmit: false,
            onSuccess: base.Event.AjaxRecalculationStarPointsSuccess
        }),
        AjaxGetStarPointsForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarPoints.Actions.GetStarPointsForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetStarPointsForAdminSuccess
        }),
        AjaxGetDetailStarPointsForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarPoints.Actions.GetDetailStarPointsForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailStarPointsForAdminSuccess
        }),
        AjaxUpdateStarPointsForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarPoints.Actions.UpdateStarPointsForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateStarPointsForAdminSuccess
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
                base.Function.GetStarPointsForAdmin();
            });
        },
        GetStarPointsForAdmin: function () {
            var userId = (base.Control.txtUserIdFilter().val() == "") ? 0 : parseInt(base.Control.txtUserIdFilter().val());
            base.Ajax.AjaxGetStarPointsForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                userId: userId,
                starPeriodId: base.Control.slcPeriodFilter().val(),
                names: base.Control.txtNamesFilter().val()
            };
            base.Ajax.AjaxGetStarPointsForAdmin.submit();
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
                    '<a class="dropdown-item updateData" value="' + data.starPointsId + '" href="#">Actualizar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.starPointsId + '</strong></td>' +
                    '<td>' + data.userId + '</td>' +
                    '<td>' + data.names + '</td>' +
                    '<td>' + data.lastName + '</td>' +
                    '<td>' + data.starPoints + '</td>' +
                    '<td>' + data.extraStar + '</td>' +
                    '<td style="text-align: center !important;">' + data.periodName + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var starPointsId = $(this).attr('value');
                base.Control.btnUpdateModal().show();
                base.Control.btnCreateModal().hide();
                base.Parameters.starPointsId = starPointsId;
                base.Ajax.AjaxGetDetailStarPointsForAdmin.data = {
                    starPointsId: starPointsId
                };
                base.Ajax.AjaxGetDetailStarPointsForAdmin.submit();
            });
        },
        FillDataModal: function (data) {
            base.Control.txtFullName().val(data.fullName);
            base.Control.txtStarPoints().val(data.starPoints);
            base.Control.txtExtraStar().val(data.extraStar);
        },
        ClearFilters: function () {
            base.Control.txtUserIdFilter().val("");
            base.Control.txtNamesFilter().val("");
            base.Control.slcPeriodFilter().find('option:first').prop('selected', true);
            base.Control.slcPeriodFilter().selectpicker('refresh');
        },
    };
}