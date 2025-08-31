ns('Mitosiz.Site.TravelPointsPeriod.Index')
Mitosiz.Site.TravelPointsPeriod.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Function.GetTravelPointsPeriodForAdmin();
        base.Function.clsUpdateDataClick();

        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Control.btnCreatePeriod().click(base.Event.btnCreatePeriodClick);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Control.btnCreateModal().click(base.Event.btnCreateModalClick);
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        travelPointsPeriodId: 0
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyTravelPoints'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        modalSave: function () { return $('#modalSave'); },
        btnCreatePeriod: function () { return $('#btnCreatePeriod'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        btnCreateModal: function () { return $('#btnCreateModal'); },
        txtPeriodNameFilter: function () { return $('#txtPeriodNameFilter'); },
        txtPeriodName: function () { return $('#txtPeriodName'); },
        slcActive: function () { return $('#slcActive'); },
        txtInitPeriodDate: function () { return $('#txtInitPeriodDate'); },
        txtInitPeriodHour: function () { return $('#txtInitPeriodHour'); },
        txtEndPeriodDate: function () { return $('#txtEndPeriodDate'); },
        txtEndPeriodHour: function () { return $('#txtEndPeriodHour'); },
        txtMinimumPoints: function () { return $('#txtMinimumPoints'); },
    };
    base.Event = {
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Function.GetTravelPointsPeriodForAdmin();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Function.GetTravelPointsPeriodForAdmin();
        },
        AjaxGetTravelPointsPeriodForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.travelPointsPeriodForAdmin);
                }
            }
        },
        AjaxGetDetailTravelPointsPeriodForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataModal(data.data);
                    base.Control.modalSave().modal('show');
                }
            }
        },
        AjaxUpdateTravelPointsPeriodSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalSave().modal('hide');
                    Swal.fire("Excelente !!", "El periodo fue actualizado !!", "success")
                    base.Function.GetTravelPointsPeriodForAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
            }
        },
        AjaxInsertTravelPointsPeriodSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalSave().modal('hide');
                    Swal.fire("Excelente !!", "El periodo fue registrada !!", "success")
                    base.Function.GetTravelPointsPeriodForAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
            }
        },
        btnUpdateModalClick: function () {
            if (base.Control.txtMinimumPoints().val() == "") {
                Swal.fire("Oops...", "Porfavor ingrese un valor válido en Puntaje Minimo", "error")
            }
            else {
                base.Ajax.AjaxUpdateTravelPointsPeriod.data = {
                    travelPointsPeriodId: base.Parameters.travelPointsPeriodId,
                    periodName: base.Control.txtPeriodName().val(),
                    minimumPoints: base.Control.txtMinimumPoints().val(),
                    startDateTravelPointsPeriod: base.Control.txtInitPeriodDate().val(),
                    startHourTravelPointsPeriod: base.Control.txtInitPeriodHour().val(),
                    endDateTravelPointsPeriod: base.Control.txtEndPeriodDate().val(),
                    endHourTravelPointsPeriod: base.Control.txtEndPeriodHour().val(),
                    status: base.Control.slcActive().val(),
                };
                base.Ajax.AjaxUpdateTravelPointsPeriod.submit();
            }
        },
        btnCreateModalClick: function () {
            if (base.Control.txtMinimumPoints().val() == "") {
                Swal.fire("Oops...", "Porfavor ingrese un valor válido en Puntaje Minimo", "error")
            }
            else {
                base.Ajax.AjaxInsertTravelPointsPeriod.data = {
                    periodName: base.Control.txtPeriodName().val(),
                    minimumPoints: base.Control.txtMinimumPoints().val(),
                    startDateTravelPointsPeriod: base.Control.txtInitPeriodDate().val(),
                    startHourTravelPointsPeriod: base.Control.txtInitPeriodHour().val(),
                    endDateTravelPointsPeriod: base.Control.txtEndPeriodDate().val(),
                    endHourTravelPointsPeriod: base.Control.txtEndPeriodHour().val(),
                    status: base.Control.slcActive().val(),
                };
                base.Ajax.AjaxInsertTravelPointsPeriod.submit();
            }
        },
        btnCreatePeriodClick: function () {
            base.Control.txtMinimumPoints().val("0");
            base.Control.slcActive().val("Inactivo");
            base.Control.slcActive().selectpicker('refresh');
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
        AjaxGetTravelPointsPeriodForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.TravelPointsPeriod.Actions.GetTravelPointsPeriodForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetTravelPointsPeriodForAdminSuccess
        }),
        AjaxGetDetailTravelPointsPeriodForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.TravelPointsPeriod.Actions.GetDetailTravelPointsPeriodForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailTravelPointsPeriodForAdminSuccess
        }),
        AjaxInsertTravelPointsPeriod: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.TravelPointsPeriod.Actions.InsertTravelPointsPeriod,
            autoSubmit: false,
            onSuccess: base.Event.AjaxInsertTravelPointsPeriodSuccess
        }),
        AjaxUpdateTravelPointsPeriod: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.TravelPointsPeriod.Actions.UpdateTravelPointsPeriod,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateTravelPointsPeriodSuccess
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
                base.Function.GetTravelPointsPeriodForAdmin();
            });
        },
        GetTravelPointsPeriodForAdmin: function () {
            base.Ajax.AjaxGetTravelPointsPeriodForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                periodName: base.Control.txtPeriodNameFilter().val()
            };
            base.Ajax.AjaxGetTravelPointsPeriodForAdmin.submit();
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
                    '<a class="dropdown-item updateData" value="' + data.travelPointsPeriodId + '" href="#">Actualizar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.travelPointsPeriodId + '</strong></td>' +
                    '<td>' + data.periodName + '</td>' +
                    '<td>' + data.startDate + '</td>' +
                    '<td>' + data.endDate + '</td>' +
                    '<td>' + data.status + '</td>' +
                    '<td>' + data.creationTime + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var travelPointsPeriodId = $(this).attr('value');
                base.Control.btnUpdateModal().show();
                base.Control.btnCreateModal().hide();
                base.Parameters.travelPointsPeriodId = travelPointsPeriodId;
                base.Ajax.AjaxGetDetailTravelPointsPeriodForAdmin.data = {
                    travelPointsPeriodId: travelPointsPeriodId
                };
                base.Ajax.AjaxGetDetailTravelPointsPeriodForAdmin.submit();
            });
        },
        FillDataModal: function (data) {
            base.Control.txtPeriodName().val(data.periodName);
            base.Control.txtMinimumPoints().val(data.minimumPoints);
            base.Control.slcActive().val(data.status);
            base.Control.slcActive().selectpicker('refresh');
            base.Control.txtInitPeriodDate().datepicker({
                autoclose: true
            }).datepicker("setDate", data.startDateTravelPointsPeriod);
            base.Control.txtInitPeriodHour().val(data.startHourTravelPointsPeriod);
            base.Control.txtEndPeriodDate().datepicker({
                autoclose: true
            }).datepicker("setDate", data.endDateTravelPointsPeriod);
            base.Control.txtEndPeriodHour().val(data.endHourTravelPointsPeriod);
        },
        ClearFilters: function () {
            base.Control.txtPeriodNameFilter().val("");
        },
    };
}