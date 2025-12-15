ns('Mitosiz.Site.CommissionPeriod.Index')
Mitosiz.Site.CommissionPeriod.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Ajax.AjaxListAllNetworkPeriod.submit();
        base.Function.GetCommissionPeriodForAdmin();
        base.Function.clsUpdateDataClick();

        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Control.btnCreateCommissionPeriod().click(base.Event.btnCreateCommissionPeriodClick);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Control.btnCreateModal().click(base.Event.btnCreateModalClick);
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        commissionPeriodId: 0
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyPeriod'); },
        txtPeriodNameFilter: function () { return $('#txtPeriodNameFilter'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        modalSave: function () { return $('#modalSave'); },
        btnCreateModal: function () { return $('#btnCreateModal'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        slcPeriodRelated: function () { return $('#slcPeriodRelated'); },
        txtPeriodName: function () { return $('#txtPeriodName'); },
        slcActive: function () { return $('#slcActive'); },
        txtInitPeriodDate: function () { return $('#txtInitPeriodDate'); },
        txtInitPeriodHour: function () { return $('#txtInitPeriodHour'); },
        txtEndPeriodDate: function () { return $('#txtEndPeriodDate'); },
        txtEndPeriodHour: function () { return $('#txtEndPeriodHour'); },
        btnCreateCommissionPeriod: function () { return $('#btnCreateCommissionPeriod'); },
    };
    base.Event = {
        AjaxListAllNetworkPeriodSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcPeriodRelated().empty();
                    base.Control.slcPeriodRelated().append($('<option>', {
                        value: 0,
                        text: "Seleccione"
                    }));
                    $.each(data.data, function (key, value) {
                        base.Control.slcPeriodRelated().append($('<option>', {
                            value: value.networkPeriodId,
                            text: value.periodName
                        }));
                    });
                    base.Control.slcPeriodRelated().selectpicker('refresh');
                }
            }
        },
        AjaxGetCommissionPeriodForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.commissionPeriodForAdmin);
                }
            }
        },
        AjaxGetCommissionPeriodDetailForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataModal(data.data);
                    base.Control.modalSave().modal('show');
                }
            }
        },
        AjaxUpdateCommissionPeriodSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "Periodo actualizado !!", "success");
                    base.Control.modalSave().modal('hide');
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
                base.Function.GetCommissionPeriodForAdmin();
            }
        },
        AjaxCreateCommissionPeriodSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "Periodo registrado !!", "success");
                    base.Control.modalSave().modal('hide');
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
                base.Function.GetCommissionPeriodForAdmin();
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Function.GetCommissionPeriodForAdmin();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Function.GetCommissionPeriodForAdmin();
        },
        btnUpdateModalClick: function () {
            base.Ajax.AjaxUpdateCommissionPeriodAdmin.data = {
                commissionPeriodId: base.Parameters.commissionPeriodId,
                periodName: base.Control.txtPeriodName().val(),
                networkPeriodId: base.Control.slcPeriodRelated().val(),
                startDateNetworkPeriod: base.Control.txtInitPeriodDate().val(),
                startHourNetworkPeriod: base.Control.txtInitPeriodHour().val(),
                endDateNetworkPeriod: base.Control.txtEndPeriodDate().val(),
                endHourNetworkPeriod: base.Control.txtEndPeriodHour().val(),
                status: base.Control.slcActive().val(),
            };
            base.Ajax.AjaxUpdateCommissionPeriodAdmin.submit();
        },
        btnCreateModalClick: function () {
            base.Ajax.AjaxCreateCommissionPeriod.data = {
                periodName: base.Control.txtPeriodName().val(),
                networkPeriodId: base.Control.slcPeriodRelated().val(),
                startDateNetworkPeriod: base.Control.txtInitPeriodDate().val(),
                startHourNetworkPeriod: base.Control.txtInitPeriodHour().val(),
                endDateNetworkPeriod: base.Control.txtEndPeriodDate().val(),
                endHourNetworkPeriod: base.Control.txtEndPeriodHour().val(),
                status: base.Control.slcActive().val(),
            };
            base.Ajax.AjaxCreateCommissionPeriod.submit();
        },
        btnCreateCommissionPeriodClick: function () {
            base.Control.txtPeriodName().val("");
            base.Control.slcActive().val("Inactivo");
            base.Control.slcActive().selectpicker('refresh');
            base.Control.slcPeriodRelated().val("0");
            base.Control.slcPeriodRelated().selectpicker('refresh');
            base.Control.txtInitPeriodDate().datepicker("setDate", new Date());
            base.Control.txtInitPeriodHour().val("00:00");
            base.Control.txtEndPeriodDate().datepicker("setDate", new Date());
            base.Control.txtEndPeriodHour().val("00:00");

            base.Control.btnUpdateModal().hide();
            base.Control.btnCreateModal().show();
            base.Control.modalSave().modal('show');
        },
    };
    base.Ajax = {
        AjaxGetCommissionPeriodForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.CommissionPeriod.Actions.GetCommissionPeriodForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetCommissionPeriodForAdminSuccess
        }),
        AjaxCreateCommissionPeriod: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.CommissionPeriod.Actions.CreateCommissionPeriod,
            autoSubmit: false,
            onSuccess: base.Event.AjaxCreateCommissionPeriodSuccess
        }),
        AjaxUpdateCommissionPeriodAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.CommissionPeriod.Actions.UpdateCommissionPeriod,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateCommissionPeriodSuccess
        }),
        AjaxGetCommissionPeriodDetailForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.CommissionPeriod.Actions.GetCommissionPeriodDetailForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetCommissionPeriodDetailForAdminSuccess
        }),
        AjaxListAllNetworkPeriod: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.CommissionPeriod.Actions.ListAllNetworkPeriod,
            autoSubmit: false,
            onSuccess: base.Event.AjaxListAllNetworkPeriodSuccess
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
                base.Function.GetCommissionPeriodForAdmin();
            });
        },
        GetCommissionPeriodForAdmin: function () {
            base.Ajax.AjaxGetCommissionPeriodForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                periodName: base.Control.txtPeriodNameFilter().val()
            };
            base.Ajax.AjaxGetCommissionPeriodForAdmin.submit();
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
                    '<a class="dropdown-item updateData" value="' + data.commissionPeriodId + '" href="#">Actualizar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.commissionPeriodId + '</strong></td>' +
                    '<td>' + data.periodName + '</td>' +
                    '<td>' + data.startDate + '</td>' +
                    '<td>' + data.endDate + '</td>' +
                    '<td>' + data.status + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var commissionPeriodId = $(this).attr('value');
                base.Control.btnUpdateModal().show();
                base.Control.btnCreateModal().hide();
                base.Ajax.AjaxGetCommissionPeriodDetailForAdmin.data = {
                    commissionPeriodId: commissionPeriodId
                };
                base.Ajax.AjaxGetCommissionPeriodDetailForAdmin.submit();
            });
        },
        FillDataModal: function (data) {
            base.Control.txtPeriodName().val(data.periodName);
            base.Control.slcActive().val(data.status);
            base.Control.slcActive().selectpicker('refresh');
            base.Control.slcPeriodRelated().val(data.networkPeriodId);
            base.Control.slcPeriodRelated().selectpicker('refresh');
            base.Control.txtInitPeriodDate().datepicker({
                autoclose: true
            }).datepicker("setDate", data.startDateNetworkPeriod);
            base.Control.txtInitPeriodHour().val(data.startHourNetworkPeriod);
            base.Control.txtEndPeriodDate().datepicker({
                autoclose: true
            }).datepicker("setDate", data.endDateNetworkPeriod);
            base.Control.txtEndPeriodHour().val(data.endHourNetworkPeriod);
            base.Parameters.commissionPeriodId = data.commissionPeriodId;
        },
        ClearFilters: function () {
            base.Control.txtPeriodNameFilter().val("");
        },
    };
}