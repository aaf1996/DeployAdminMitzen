ns('Mitosiz.Site.Commission.Index')
Mitosiz.Site.Commission.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Function.clsUpdateDataClick();
        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Control.btnRecalculation().click(base.Event.btnRecalculationClick);
        base.Control.btnGenerateReport().click(base.Event.btnGenerateReportClick);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Ajax.AjaxGetPeriods.submit();
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        commissionId: 0
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyTable'); },
        txtUserIdFilter: function () { return $('#txtUserIdFilter'); },
        txtNamesFilter: function () { return $('#txtNamesFilter'); },
        slcPeriodFilter: function () { return $('#slcPeriodFilter'); },
        slcProcess: function () { return $('#slcProcess'); },
        slcReports: function () { return $('#slcReports'); },
        slcPeriod: function () { return $('#slcPeriod'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        btnRecalculation: function () { return $('#btnRecalculation'); },
        btnGenerateReport: function () { return $('#btnGenerateReport'); },
        txtNames: function () { return $('#txtNames'); },
        txtPeriodName: function () { return $('#txtPeriodName'); },
        txtPatronBonus: function () { return $('#txtPatronBonus'); },
        txtRetirementBonus: function () { return $('#txtRetirementBonus'); },
        txtRtiBonus: function () { return $('#txtRtiBonus'); },
        txtExtraBonus: function () { return $('#txtExtraBonus'); },
        modalUpdate: function () { return $('#modalUpdate'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },

    };
    base.Event = {
        AjaxGetUserCommissionForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.userCommissionForAdmin);
                }
            }
        },
        AjaxRecalculationRTIBonusSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    $('#loading-area').fadeOut();
                    Swal.fire("Excelente !!", "Recalculo terminado !!", "success");
                    base.Function.GetUserCommissionForAdmin();
                }
            }
        },
        AjaxRecalculationRetirementBonusSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    $('#loading-area').fadeOut();
                    Swal.fire("Excelente !!", "Recalculo terminado !!", "success");
                    base.Function.GetUserCommissionForAdmin();
                }
            }
        },
        AjaxRecalculationPatronBonusSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    $('#loading-area').fadeOut();
                    Swal.fire("Excelente !!", "Recalculo terminado !!", "success");
                    base.Function.GetUserCommissionForAdmin();
                }
            }
        },
        AjaxRecalculationCommissionWholesaleSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    $('#loading-area').fadeOut();
                    Swal.fire("Excelente !!", "Recalculo terminado !!", "success");
                }
            }
        },
        AjaxGetReportNetworkWithCommissionSuccess: function (data) {
            if (data) {
                $('#loading-area').fadeOut();
                window.open('https://api.yosoymitosis.com/StaticFiles/ReportCommission/' + data.data);
            }
        },
        AjaxGetReportGeneralCommissionSuccess: function (data) {
            if (data) {
                $('#loading-area').fadeOut();
                window.open('https://api.yosoymitosis.com/StaticFiles/ReportCommission/' + data.data);
            }
        },
        AjaxGetPeriodSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcPeriod().empty();
                    base.Control.slcPeriodFilter().empty();
                    $.each(data.data, function (key, value) {
                        base.Control.slcPeriod().append($('<option>', {
                            value: value.commissionPeriodId,
                            text: value.periodName
                        }));
                        base.Control.slcPeriodFilter().append($('<option>', {
                            value: value.commissionPeriodId,
                            text: value.periodName
                        }));
                    });
                    base.Control.slcPeriod().selectpicker('refresh');
                    base.Control.slcPeriodFilter().selectpicker('refresh');
                    base.Function.GetUserCommissionForAdmin();
                }
            }
        },
        AjaxGetDetailCommissionByCommissionIdSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.txtNames().val(data.data.names);
                    base.Control.txtPeriodName().val(data.data.periodName);
                    base.Control.txtPatronBonus().val(data.data.patronBonus);
                    base.Control.txtRetirementBonus().val(data.data.retirementBonus);
                    base.Control.txtRtiBonus().val(data.data.rtiBonus);
                    base.Control.txtExtraBonus().val(data.data.extraBonus);
                    base.Control.modalUpdate().modal('show');
                }
            }
        },
        AjaxUpdateCommissionUserByCommissionIdSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "Comisión Actualizada !!", "success")
                    base.Control.modalUpdate().modal('hide');
                    base.Function.GetUserCommissionForAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            var userId = (base.Control.txtUserIdFilter().val() == "") ? 0 : parseInt(base.Control.txtUserIdFilter().val());
            base.Ajax.AjaxGetUserCommissionForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                userId: userId,
                commissionPeriodId: base.Control.slcPeriodFilter().val(),
                names: base.Control.txtNamesFilter().val()
            };
            base.Ajax.AjaxGetUserCommissionForAdmin.submit();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            var userId = (base.Control.txtUserIdFilter().val() == "") ? 0 : parseInt(base.Control.txtUserIdFilter().val());
            base.Ajax.AjaxGetUserCommissionForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                userId: userId,
                commissionPeriodId: base.Control.slcPeriodFilter().val(),
                names: base.Control.txtNamesFilter().val()
            };
            base.Ajax.AjaxGetUserCommissionForAdmin.submit();
        },
        btnRecalculationClick: function () {
            $('#loading-area').fadeIn();
            var process = base.Control.slcProcess().val();
            if (process == "3") {
                base.Ajax.AjaxRecalculationRTIBonus.data = {
                    commissionPeriodId: base.Control.slcPeriod().val()
                };
                base.Ajax.AjaxRecalculationRTIBonus.submit();
            }
            else if (process == "2") {
                base.Ajax.AjaxRecalculationRetirementBonus.data = {
                    commissionPeriodId: base.Control.slcPeriod().val()
                };
                base.Ajax.AjaxRecalculationRetirementBonus.submit();
            }
            else if (process == "1") {
                base.Ajax.AjaxRecalculationPatronBonus.data = {
                    commissionPeriodId: base.Control.slcPeriod().val()
                };
                base.Ajax.AjaxRecalculationPatronBonus.submit();
            }
            else if (process == "4") {
                base.Ajax.AjaxRecalculationCommissionWholesale.data = {
                    commissionPeriodId: base.Control.slcPeriod().val()
                };
                base.Ajax.AjaxRecalculationCommissionWholesale.submit();
            }
        },
        btnGenerateReportClick: function () {
            $('#loading-area').fadeIn();
            var process = base.Control.slcReports().val();
            if (process == "1") {
                base.Ajax.AjaxGetReportNetworkWithCommission.data = {
                    commissionPeriodId: base.Control.slcPeriod().val()
                };
                base.Ajax.AjaxGetReportNetworkWithCommission.submit();
            }
            else if (process == "2") {
                base.Ajax.AjaxGetReportGeneralCommission.data = {
                    commissionPeriodId: base.Control.slcPeriod().val()
                };
                base.Ajax.AjaxGetReportGeneralCommission.submit();
            }
        },
        btnUpdateModalClick: function () {
            base.Ajax.AjaxUpdateCommissionUserByCommissionId.data = {
                commissionId: base.Parameters.commissionId,
                patronBonus: base.Control.txtPatronBonus().val(),
                retirementBonus: base.Control.txtRetirementBonus().val(),
                rtiBonus: base.Control.txtRtiBonus().val(),
                extraBonus: base.Control.txtExtraBonus().val()
            };
            base.Ajax.AjaxUpdateCommissionUserByCommissionId.submit();
        },
    };
    base.Ajax = {
        AjaxGetPeriods: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.GetComissionPeriodForComission,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetPeriodSuccess
        }),
        AjaxRecalculationRTIBonus: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.RecalculationRTIBonus,
            autoSubmit: false,
            onSuccess: base.Event.AjaxRecalculationRTIBonusSuccess
        }),
        AjaxRecalculationRetirementBonus: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.RecalculationRetirementBonus,
            autoSubmit: false,
            onSuccess: base.Event.AjaxRecalculationRetirementBonusSuccess
        }),
        AjaxRecalculationPatronBonus: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.RecalculationPatronBonus,
            autoSubmit: false,
            onSuccess: base.Event.AjaxRecalculationPatronBonusSuccess
        }),
        AjaxGetUserCommissionForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.GetUserCommissionForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetUserCommissionForAdminSuccess
        }),
        AjaxGetReportNetworkWithCommission: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.GetReportNetworkWithCommission,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetReportNetworkWithCommissionSuccess
        }),
        AjaxGetReportGeneralCommission: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.GetReportGeneralCommission,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetReportGeneralCommissionSuccess
        }),
        AjaxGetDetailCommissionByCommissionId: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.GetDetailCommissionByCommissionId,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailCommissionByCommissionIdSuccess
        }),
        AjaxUpdateCommissionUserByCommissionId: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.UpdateCommissionUserByCommissionId,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateCommissionUserByCommissionIdSuccess
        }),
        AjaxRecalculationCommissionWholesale: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Commission.Actions.RecalculationCommissionWholesale,
            autoSubmit: false,
            onSuccess: base.Event.AjaxRecalculationCommissionWholesaleSuccess
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
                base.Function.GetUserCommissionForAdmin();
            });
        },
        GetUserCommissionForAdmin: function () {
            var userId = (base.Control.txtUserIdFilter().val() == "") ? 0 : parseInt(base.Control.txtUserIdFilter().val());
            base.Ajax.AjaxGetUserCommissionForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                userId: userId,
                commissionPeriodId: base.Control.slcPeriodFilter().val(),
                names: base.Control.txtNamesFilter().val()
            };
            base.Ajax.AjaxGetUserCommissionForAdmin.submit();
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
                    '<a class="dropdown-item updateData" value="' + data.commissionId + '" href="#">Actualizar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.userId + '</strong></td>' +
                    '<td>' + data.names + '</td>' +
                    '<td>' + data.lastName + '</td>' +
                    '<td>' + data.patronBonus + '</td>' +
                    '<td>' + data.retirementBonus + '</td>' +
                    '<td>' + data.rtiBonus + '</td>' +
                    '<td>' + data.extraBonus + '</td>' +
                    '<td>' + data.totalComission + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        ClearFilters: function () {
            base.Control.txtUserIdFilter().val("");
            base.Control.txtNamesFilter().val("");
            base.Control.slcPeriodFilter().find('option:first').prop('selected', true);
            base.Control.slcPeriodFilter().selectpicker('refresh');
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var commissionId = $(this).attr('value');
                base.Parameters.commissionId = commissionId;
                base.Ajax.AjaxGetDetailCommissionByCommissionId.data = {
                    commissionId: commissionId
                };
                base.Ajax.AjaxGetDetailCommissionByCommissionId.submit();
            });
        },
    };
}