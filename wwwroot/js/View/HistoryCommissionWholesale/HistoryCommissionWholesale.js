ns('Mitosiz.Site.HistoryCommissionWholesale.Index')
Mitosiz.Site.HistoryCommissionWholesale.Index.Controller = function () {
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
        historyCommissionWholesaleId: 0
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyTable'); },
        txtStoreNameFilter: function () { return $('#txtStoreNameFilter'); },
        slcPeriodFilter: function () { return $('#slcPeriodFilter'); },
        slcProcess: function () { return $('#slcProcess'); },
        slcReports: function () { return $('#slcReports'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        btnRecalculation: function () { return $('#btnRecalculation'); },
        btnGenerateReport: function () { return $('#btnGenerateReport'); },
        txtStoreName: function () { return $('#txtStoreName'); },
        txtCommission: function () { return $('#txtCommission'); },
        modalUpdate: function () { return $('#modalUpdate'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },

    };
    base.Event = {
        AjaxGetHistoryCommissionWholesaleForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.historyCommissionWholesaleForAdmin);
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
        AjaxReportCommissionWholesaleSuccess: function (data) {
            if (data) {
                $('#loading-area').fadeOut();
                window.open('https://api.yosoymitosis.com/StaticFiles/ReportCommissionWholesale/' + data.data);
            }
        },
        AjaxGetPeriodSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcPeriodFilter().empty();
                    $.each(data.data, function (key, value) {
                        base.Control.slcPeriodFilter().append($('<option>', {
                            value: value.commissionPeriodId,
                            text: value.periodName
                        }));
                    });
                    base.Control.slcPeriodFilter().selectpicker('refresh');
                    base.Function.GetHistoryCommissionWholesaleForAdmin();
                }
            }
        },
        AjaxGetDetailHistoryCommissionWholesaleSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.txtStoreName().val(data.data.storeName);
                    base.Control.txtCommission().val(data.data.commission);
                    base.Control.modalUpdate().modal('show');
                }
            }
        },
        AjaxUpdateHistoryCommissionWholesaleByCommissionIdSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "Comisión Actualizada !!", "success")
                    base.Control.modalUpdate().modal('hide');
                    base.Function.GetHistoryCommissionWholesaleForAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Function.GetHistoryCommissionWholesaleForAdmin();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Function.GetHistoryCommissionWholesaleForAdmin();
        },
        btnRecalculationClick: function () {
            $('#loading-area').fadeIn();
            var process = base.Control.slcProcess().val();
            if (process == "1") {
                base.Ajax.AjaxRecalculationCommissionWholesale.data = {
                    commissionPeriodId: base.Control.slcPeriodFilter().val()
                };
                base.Ajax.AjaxRecalculationCommissionWholesale.submit();
            }
        },
        btnGenerateReportClick: function () {
            $('#loading-area').fadeIn();
            var process = base.Control.slcReports().val();
            if (process == "1") {
                base.Ajax.AjaxReportCommissionWholesale.data = {
                    commissionPeriodId: base.Control.slcPeriodFilter().val()
                };
                base.Ajax.AjaxReportCommissionWholesale.submit();
            }
        },
        btnUpdateModalClick: function () {
            base.Ajax.AjaxUpdateHistoryCommissionWholesaleByCommissionId.data = {
                historyCommissionWholesaleId: base.Parameters.historyCommissionWholesaleId,
                commission: base.Control.txtCommission().val()
            };
            base.Ajax.AjaxUpdateHistoryCommissionWholesaleByCommissionId.submit();
        },
    };
    base.Ajax = {
        AjaxGetPeriods: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.HistoryCommissionWholesale.Actions.GetComissionPeriodForComission,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetPeriodSuccess
        }),
        AjaxGetHistoryCommissionWholesaleForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.HistoryCommissionWholesale.Actions.GetHistoryCommissionWholesaleForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetHistoryCommissionWholesaleForAdminSuccess
        }),
        AjaxGetDetailHistoryCommissionWholesale: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.HistoryCommissionWholesale.Actions.GetDetailHistoryCommissionWholesale,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailHistoryCommissionWholesaleSuccess
        }),
        AjaxUpdateHistoryCommissionWholesaleByCommissionId: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.HistoryCommissionWholesale.Actions.UpdateHistoryCommissionWholesaleByCommissionId,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateHistoryCommissionWholesaleByCommissionIdSuccess
        }),
        AjaxRecalculationCommissionWholesale: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.HistoryCommissionWholesale.Actions.RecalculationCommissionWholesale,
            autoSubmit: false,
            onSuccess: base.Event.AjaxRecalculationCommissionWholesaleSuccess
        }),
        AjaxReportCommissionWholesale: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.HistoryCommissionWholesale.Actions.GetReportCommissionWholesale,
            autoSubmit: false,
            onSuccess: base.Event.AjaxReportCommissionWholesaleSuccess
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
                base.Function.GetHistoryCommissionWholesaleForAdmin();
            });
        },
        GetHistoryCommissionWholesaleForAdmin: function () {
            base.Ajax.AjaxGetHistoryCommissionWholesaleForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                commissionPeriodId: base.Control.slcPeriodFilter().val(),
                storeName: base.Control.txtStoreNameFilter().val()
            };
            base.Ajax.AjaxGetHistoryCommissionWholesaleForAdmin.submit();
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
                    '<a class="dropdown-item updateData" value="' + data.historyCommissionWholesaleId + '" href="#">Actualizar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.historyCommissionWholesaleId + '</strong></td>' +
                    '<td>' + data.commission + '</td>' +
                    '<td>' + data.storeName + '</td>' +
                    '<td>' + data.periodName + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        ClearFilters: function () {
            base.Control.txtStoreNameFilter().val("");
            base.Control.slcPeriodFilter().find('option:first').prop('selected', true);
            base.Control.slcPeriodFilter().selectpicker('refresh');
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var historyCommissionWholesaleId = $(this).attr('value');
                base.Parameters.historyCommissionWholesaleId = historyCommissionWholesaleId;
                base.Ajax.AjaxGetDetailHistoryCommissionWholesale.data = {
                    historyCommissionWholesaleId: historyCommissionWholesaleId
                };
                base.Ajax.AjaxGetDetailHistoryCommissionWholesale.submit();
            });
        },
    };
}