ns('Mitosiz.Site.MovementOfCommittees.Index')
Mitosiz.Site.MovementOfCommittees.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Ajax.AjaxGetPeriods.submit();
        base.Function.clsNumberPagination();
        base.Function.clsUpdateDataClick();
        base.Control.slcTypeOfMovementFilter().change(base.Event.slcTypeOfMovementFilterChange);
        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Control.btnSaveModal().click(base.Event.btnSaveModalClick);
        base.Control.btnPayCommissions().click(base.Event.btnPayCommissionsClick);
        base.Control.btnNewCommission().click(base.Event.btnNewCommissionClick);
        base.Control.txtNamesFilter().autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: 'POST',
                    url: Mitosiz.Site.MovementOfCommittees.Actions.GetStoresDropDown,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        StoreName: request.term
                    }),
                    async: false,
                    success: function (data) {
                        var results = $.map(data.data, function (tag) {
                            return {
                                label: tag.storeName,
                                value: tag.storeId
                            };
                        });
                        response(results);
                    },
                    error: function (jqXHR, t, exception) {
                        console.log("Error");
                    }
                });
            },
            minLength: 0,
            maxResults: 6,
            select: function (event, ui) {
                base.Control.hiddenStoreIdFilter().val(ui.item.value);
                base.Control.txtNamesFilter().val(ui.item.label);
                return false;
            }
        });
        base.Control.txtNamesModal().autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: 'POST',
                    url: Mitosiz.Site.MovementOfCommittees.Actions.GetStoresDropDown,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        StoreName: request.term
                    }),
                    async: false,
                    success: function (data) {
                        var results = $.map(data.data, function (tag) {
                            return {
                                label: tag.storeName,
                                value: tag.storeId
                            };
                        });
                        response(results);
                    },
                    error: function (jqXHR, t, exception) {
                        console.log("Error");
                    }
                });
            },
            minLength: 0,
            maxResults: 6,
            select: function (event, ui) {
                base.Control.hiddenStoreIdModal().val(ui.item.value);
                base.Control.txtNamesModal().val(ui.item.label);
                return false;
            }
        });
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        process: "",
        movementOfCommitteesId: 0
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyTable'); },
        modalUpdate: function () { return $('#modalUpdate'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        btnSaveModal: function () { return $('#btnSaveModal'); },
        btnPayCommissions: function () { return $('#btnPayCommissions'); },
        btnClear: function () { return $('#btnClear'); },
        btnSearch: function () { return $('#btnSearch'); },
        divPeriodFilter: function () { return $('#divPeriodFilter'); },
        txtNamesFilter: function () { return $('#txtNamesFilter'); },
        slcPeriodFilter: function () { return $('#slcPeriodFilter'); },
        slcTypeOfMovementFilter: function () { return $('#slcTypeOfMovementFilter'); },
        hiddenStoreIdFilter: function () { return $('#hiddenStoreIdFilter'); },
        slcPeriod: function () { return $('#slcPeriod'); },
        slcPeriodModal: function () { return $('#slcPeriodModal'); },
        txtNamesModal: function () { return $('#txtNamesModal'); },
        slcStatusModal: function () { return $('#slcStatusModal'); },
        txtTypeOfMovementModal: function () { return $('#txtTypeOfMovementModal'); },
        txtConceptModal: function () { return $('#txtConceptModal'); },
        txtAmountModal: function () { return $('#txtAmountModal'); },
        txtObservationModal: function () { return $('#txtObservationModal'); },
        divPeriodModal: function () { return $('#divPeriodModal'); },
        divStatusModal: function () { return $('#divStatusModal'); },
        divObservationModal: function () { return $('#divObservationModal'); },
        hiddenStoreIdModal: function () { return $('#hiddenStoreIdModal'); },
        btnNewCommission: function () { return $('#btnNewCommission'); },
    };
    base.Event = {
        slcTypeOfMovementFilterChange: function () {
            var typeOfMovementFilter = base.Control.slcTypeOfMovementFilter().val();
            if (typeOfMovementFilter == "Salida") {
                base.Control.divPeriodFilter().hide();
            }
            else {
                base.Control.divPeriodFilter().show();
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
                        base.Control.slcPeriodModal().append($('<option>', {
                            value: value.commissionPeriodId,
                            text: value.periodName
                        }));
                    });
                    base.Control.slcPeriod().selectpicker('refresh');
                    base.Control.slcPeriodFilter().selectpicker('refresh');
                    base.Control.slcPeriodModal().selectpicker('refresh');
                    base.Function.GetMovementOfCommitteesForAdmin();
                }
            }
        },
        AjaxGetMovementOfCommitteesForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.movementOfCommitteesWholesaleForAdmin);
                }
            }
        },
        AjaxGetDetailMovementOfCommitteesSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.txtNamesModal().val(data.data.storeName);
                    base.Control.hiddenStoreIdModal().val(data.data.storeId);
                    base.Control.txtTypeOfMovementModal().val(data.data.typeOfMovement);
                    base.Control.txtConceptModal().val(data.data.concept);
                    base.Control.txtAmountModal().val(data.data.amount);
                    base.Control.divObservationModal().show();
                    base.Control.txtObservationModal().val(data.data.observation);
                    base.Control.divStatusModal().show();
                    base.Control.slcStatusModal().val(data.data.status);
                    base.Control.slcStatusModal().selectpicker('refresh');
                    if (data.data.typeOfMovement == "Salida") {
                        base.Control.divPeriodModal().hide();
                    }
                    else {
                        base.Control.divPeriodModal().show();
                        base.Control.slcPeriodModal().val(data.data.commissionPeriodId);
                        base.Control.slcPeriodModal().selectpicker('refresh');
                    }
                    base.Control.btnSaveModal().hide();
                    base.Control.btnUpdateModal().show();
                    base.Control.modalUpdate().modal('show');
                }
            }
        },
        AjaxUpdateMovementOfCommitteesForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "Comisión Actualizada !!", "success")
                    base.Control.modalUpdate().modal('hide');
                    base.Function.GetMovementOfCommitteesForAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        AjaxSaveMovementOfCommitteesForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "Comisión Registrada !!", "success")
                    base.Control.modalUpdate().modal('hide');
                    base.Function.GetMovementOfCommitteesForAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        AjaxInsertComissionTobeReceivedSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "Comisiones asignadas !!", "success")
                    base.Function.GetMovementOfCommitteesForAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            var storeId = (base.Control.hiddenStoreIdFilter().val() == '') ? 0 : parseInt(base.Control.hiddenStoreIdFilter().val());
            base.Ajax.AjaxGetMovementOfCommitteesForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                storeId: storeId,
                commissionPeriodId: base.Control.slcPeriodFilter().val(),
                typeOfMovement: base.Control.slcTypeOfMovementFilter().val()
            };
            base.Ajax.AjaxGetMovementOfCommitteesForAdmin.submit();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            var storeId = (base.Control.hiddenStoreIdFilter().val() == '') ? 0 : parseInt(base.Control.hiddenStoreIdFilter().val());
            base.Ajax.AjaxGetMovementOfCommitteesForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                storeId: storeId,
                commissionPeriodId: base.Control.slcPeriodFilter().val(),
                typeOfMovement: base.Control.slcTypeOfMovementFilter().val()
            };
            base.Ajax.AjaxGetMovementOfCommitteesForAdmin.submit();
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
            if (base.Control.hiddenStoreIdModal().val() == '') {
                Swal.fire("Oops...", "Debe completar todos los campos", "error")
            }
            else {
                base.Ajax.AjaxUpdateMovementOfCommitteesForAdmin.data = {
                    movementOfCommitteesWholesaleId: base.Parameters.movementOfCommitteesId,
                    storeId: base.Control.hiddenStoreIdModal().val(),
                    commissionPeriodId: base.Control.txtTypeOfMovementModal().val() == "Salida" ? null : base.Control.slcPeriodModal().val(),
                    status: base.Control.slcStatusModal().val(),
                    concept: base.Control.txtConceptModal().val(),
                    fileName: "",
                    observation: base.Control.txtObservationModal().val(),
                    amount: base.Control.txtAmountModal().val()
                };
                base.Ajax.AjaxUpdateMovementOfCommitteesForAdmin.submit();
            }
        },
        btnSaveModalClick: function () {
            if (base.Control.hiddenStoreIdModal().val() == '' || base.Control.txtAmountModal().val() == '') {
                Swal.fire("Oops...", "Debe completar todos los campos", "error")
            }
            else {
                base.Ajax.AjaxSaveMovementOfCommitteesForAdmin.data = {
                    storeId: base.Control.hiddenStoreIdModal().val(),
                    commissionPeriodId: base.Control.slcPeriodModal().val(),
                    typeOfMovement: base.Control.txtTypeOfMovementModal().val(),
                    concept: base.Control.txtConceptModal().val(),
                    amount: base.Control.txtAmountModal().val()
                };
                base.Ajax.AjaxSaveMovementOfCommitteesForAdmin.submit();
            }
        },
        btnNewCommissionClick: function () {
            base.Control.hiddenStoreIdModal().val(0);
            base.Control.txtNamesModal().val("");
            base.Control.slcPeriodModal().find('option:first').prop('selected', true);
            base.Control.slcPeriodModal().selectpicker('refresh');
            base.Control.txtTypeOfMovementModal().val("");
            base.Control.txtConceptModal().val("");
            base.Control.txtAmountModal().val("");


            base.Control.divPeriodModal().show();
            base.Control.txtTypeOfMovementModal().val("Ingreso");
            base.Control.divStatusModal().hide();
            base.Control.divObservationModal().hide();
            base.Control.btnSaveModal().show();
            base.Control.btnUpdateModal().hide();
            base.Control.modalUpdate().modal('show');
        },
        btnPayCommissionsClick: function () {
            Swal.fire({
                title: "Estás segur@ de asignar el cobro de comisiones a todos los empresarios?",
                text: "Esto no se puede revertir!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, asignar!"
            }).then((result) => {
                if (result.isConfirmed) {
                    base.Ajax.AjaxInsertComissionTobeReceived.data = {
                        commissionPeriodId: base.Control.slcPeriod().val()
                    };
                    base.Ajax.AjaxInsertComissionTobeReceived.submit();
                }
            });
        },
    };
    base.Ajax = {
        AjaxGetPeriods: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.MovementOfCommittees.Actions.GetComissionPeriodForComission,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetPeriodSuccess
        }),
        AjaxGetMovementOfCommitteesForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.MovementOfCommittees.Actions.GetMovementOfCommitteesForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetMovementOfCommitteesForAdminSuccess
        }),
        AjaxGetDetailMovementOfCommittees: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.MovementOfCommittees.Actions.GetDetailMovementOfCommittees,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailMovementOfCommitteesSuccess
        }),
        AjaxSaveMovementOfCommitteesForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.MovementOfCommittees.Actions.SaveMovementOfCommitteesForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxSaveMovementOfCommitteesForAdminSuccess
        }),
        AjaxUpdateMovementOfCommitteesForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.MovementOfCommittees.Actions.UpdateMovementOfCommitteesForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateMovementOfCommitteesForAdminSuccess
        }),
        AjaxInsertComissionTobeReceived: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.MovementOfCommittees.Actions.InsertComissionTobeReceived,
            autoSubmit: false,
            onSuccess: base.Event.AjaxInsertComissionTobeReceivedSuccess
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
                base.Function.GetMovementOfCommitteesForAdmin();
            });
        },
        GetMovementOfCommitteesForAdmin: function () {
            var storeId = (base.Control.hiddenStoreIdFilter().val() == '') ? 0 : parseInt(base.Control.hiddenStoreIdFilter().val());
            base.Ajax.AjaxGetMovementOfCommitteesForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                storeId: storeId,
                commissionPeriodId: base.Control.slcPeriodFilter().val(),
                typeOfMovement: base.Control.slcTypeOfMovementFilter().val()
            };
            base.Ajax.AjaxGetMovementOfCommitteesForAdmin.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
                var urlVoucher = 'https://api.yosoymitosis.com/StaticFiles/MovementOfCommittees/' + data.fileName;
                var styleVoucher = data.fileName == '' || data.fileName  == null ? "display:none;" : "";
                var receipt = data.receipt == null ? "" : data.receipt;
                var observation = data.observation == null ? "" : data.observation;
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
                    '<a class="dropdown-item updateData" value="' + data.movementOfCommitteesWholesaleId + '" href="#">Actualizar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.movementOfCommitteesWholesaleId + '</strong></td>' +
                    '<td>' + data.storeName + '</td>' +
                    '<td>' + data.typeOfMovement + '</td>' +
                    '<td>' + data.concept + '</td>' +
                    '<td>' + receipt + '</td>' +
                    '<td>' + data.amount + '</td>' +
                    '<td>' + data.pendingAmount + '</td>' +
                    '<td>' + data.status + '</td>' +
                    '<td>' + observation + '</td>' +
                    '<td>' + data.creationTime + '</td>' +
                    '<td>' +
                    '<div style="' + styleVoucher + '">' +
                    '<a href = "' + urlVoucher + '" class= "btn btn-primary shadow btn-s sharp me-1" target="_blank">' +
                    '<i class="fa-solid fa-ticket"></i>' +
                    '</a>' +
                    '</div></td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        ClearFilters: function () {
            base.Control.txtNamesFilter().val("");
            base.Control.slcPeriodFilter().find('option:first').prop('selected', true);
            base.Control.slcPeriodFilter().selectpicker('refresh');
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var movementOfCommitteesId = $(this).attr('value');
                base.Parameters.movementOfCommitteesId = movementOfCommitteesId;
                base.Ajax.AjaxGetDetailMovementOfCommittees.data = {
                    movementOfCommitteesWholesaleId: movementOfCommitteesId
                };
                base.Ajax.AjaxGetDetailMovementOfCommittees.submit();
            });
        },
    };
}