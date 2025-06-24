ns('Mitosiz.Site.Promotion.Index')
Mitosiz.Site.Promotion.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Function.GetPromotionAmount45Admin();
        base.Function.clsUpdateDataClick();
        base.Function.clsDeleteDataClick();

        base.Control.btnAddYapaPromotion().click(base.Event.btnAddYapaPromotion);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Control.btnCreateModal().click(base.Event.btnCreateModalClick);
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        promotionAmountId: 0
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyPromotionYapa'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        modalSave: function () { return $('#modalSave'); },
        btnAddYapaPromotion: function () { return $('#btnAddYapaPromotion'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        btnCreateModal: function () { return $('#btnCreateModal'); },
        slcStatus: function () { return $('#slcStatus'); },
        txtPoints: function () { return $('#txtPoints'); },
        txtQuantity: function () { return $('#txtQuantity'); },
        txtInitEvaluationDate: function () { return $('#txtInitEvaluationDate'); },
        txtInitEvaluationHour: function () { return $('#txtInitEvaluationHour'); },
        txtEndEvaluationDate: function () { return $('#txtEndEvaluationDate'); },
        txtEndEvaluationHour: function () { return $('#txtEndEvaluationHour'); },
        txtInitPromotionDate: function () { return $('#txtInitPromotionDate'); },
        txtInitPromotionHour: function () { return $('#txtInitPromotionHour'); },
        txtEndPromotionDate: function () { return $('#txtEndPromotionDate'); },
        txtEndPromotionHour: function () { return $('#txtEndPromotionHour'); },
    };
    base.Event = {
        AjaxGetPromotionAmount45AdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.promotionAmount45ForAdmins);
                }
            }
        },
        AjaxGetDetailPromotionAmount45Success: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataModal(data.data);
                    base.Control.modalSave().modal('show');
                }
            }
        },
        AjaxUpdatePromotionAmount45Success: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalSave().modal('hide');
                    Swal.fire("Excelente !!", "La promoción fue actualizada !!", "success")
                    base.Function.GetPromotionAmount45Admin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        AjaxInsertPromotionAmount45Success: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalSave().modal('hide');
                    Swal.fire("Excelente !!", "La promoción fue registrada !!", "success")
                    base.Function.GetPromotionAmount45Admin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        AjaxDeletePromotionAmount45Success: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "La promoción fue eliminada !!", "success")
                    base.Function.GetPromotionAmount45Admin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        btnUpdateModalClick: function () {
            if (base.Control.txtPoints().val() == "") {
                base.Function.ShowToastrError("Porfavor ingrese un valor válido en Puntos");
            }
            else if (base.Control.txtQuantity().val() == "") {
                base.Function.ShowToastrError("Porfavor ingrese un valor válido en Cantidad");
            }
            else {
                base.Ajax.AjaxUpdatePromotionAmount45.data = {
                    promotionAmountId: base.Parameters.promotionAmountId,
                    pointsEvaluated: base.Control.txtPoints().val(),
                    quantity: base.Control.txtQuantity().val(),
                    active: base.Control.slcStatus().val() === "true",
                    startDatePromotionEvaluation: base.Control.txtInitEvaluationDate().val(),
                    startHourPromotionEvaluation: base.Control.txtInitEvaluationHour().val(),
                    endDatePromotionEvaluation: base.Control.txtEndEvaluationDate().val(),
                    endHourPromotionEvaluation: base.Control.txtEndEvaluationHour().val(),
                    startDatePromotionRun: base.Control.txtInitPromotionDate().val(),
                    startHourPromotionRun: base.Control.txtInitPromotionHour().val(),
                    endDatePromotionRun: base.Control.txtEndPromotionDate().val(),
                    endHourPromotionRun: base.Control.txtEndPromotionHour().val(),
                };
                base.Ajax.AjaxUpdatePromotionAmount45.submit();
            }
        },
        btnCreateModalClick: function () {
            if (base.Control.txtPoints().val() == "") {
                base.Function.ShowToastrError("Porfavor ingrese un valor válido en Puntos");
            }
            else if (base.Control.txtQuantity().val() == "") {
                base.Function.ShowToastrError("Porfavor ingrese un valor válido en Cantidad");
            }
            else {
                base.Ajax.AjaxInsertPromotionAmount45.data = {
                    pointsEvaluated: base.Control.txtPoints().val(),
                    quantity: base.Control.txtQuantity().val(),
                    active: base.Control.slcStatus().val() === "true",
                    startDatePromotionEvaluation: base.Control.txtInitEvaluationDate().val(),
                    startHourPromotionEvaluation: base.Control.txtInitEvaluationHour().val(),
                    endDatePromotionEvaluation: base.Control.txtEndEvaluationDate().val(),
                    endHourPromotionEvaluation: base.Control.txtEndEvaluationHour().val(),
                    startDatePromotionRun: base.Control.txtInitPromotionDate().val(),
                    startHourPromotionRun: base.Control.txtInitPromotionHour().val(),
                    endDatePromotionRun: base.Control.txtEndPromotionDate().val(),
                    endHourPromotionRun: base.Control.txtEndPromotionHour().val(),
                };
                base.Ajax.AjaxInsertPromotionAmount45.submit();
            }
        },
        btnAddYapaPromotion: function () {
            base.Control.slcStatus().val("true");
            base.Control.slcStatus().selectpicker('refresh');
            base.Control.txtPoints().val("0");
            base.Control.txtQuantity().val("0");
            base.Control.txtInitEvaluationDate().datepicker("setDate", new Date());
            base.Control.txtInitEvaluationHour().val("00:00");
            base.Control.txtEndEvaluationDate().datepicker("setDate", new Date());
            base.Control.txtEndEvaluationHour().val("00:00");
            base.Control.txtInitPromotionDate().datepicker("setDate", new Date());
            base.Control.txtInitPromotionHour().val("00:00");
            base.Control.txtEndPromotionDate().datepicker("setDate", new Date());
            base.Control.txtEndPromotionHour().val("00:00");

            base.Control.btnUpdateModal().hide();
            base.Control.btnCreateModal().show();
            base.Control.modalSave().modal('show');
        },
    };
    base.Ajax = {
        AjaxGetPromotionAmount45Admin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.GetPromotionAmount45Admin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetPromotionAmount45AdminSuccess
        }),
        AjaxGetDetailPromotionAmount45: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.GetDetailPromotionAmount45,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailPromotionAmount45Success
        }),
        AjaxDeletePromotionAmount45: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.DeletePromotionAmount45,
            autoSubmit: false,
            onSuccess: base.Event.AjaxDeletePromotionAmount45Success
        }),
        AjaxInsertPromotionAmount45: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.InsertPromotionAmount45,
            autoSubmit: false,
            onSuccess: base.Event.AjaxInsertPromotionAmount45Success
        }),
        AjaxUpdatePromotionAmount45: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.UpdatePromotionAmount45,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdatePromotionAmount45Success
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
                base.Function.GetPromotionAmount45Admin();
            });
        },
        GetPromotionAmount45Admin: function () {
            base.Ajax.AjaxGetPromotionAmount45Admin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination
            };
            base.Ajax.AjaxGetPromotionAmount45Admin.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
                var status = data.active ? "Activo" : "Inactivo";
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
                    '<a class="dropdown-item updateData" value="' + data.promotionAmountId + '" href="#">Actualizar</a>' +
                    '<a class="dropdown-item deleteData" value="' + data.promotionAmountId + '" href="#">Eliminar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.promotionAmountId + '</strong></td>' +
                    '<td>' + data.pointsEvaluated + '</td>' +
                    '<td>' + data.quantity + '</td>' +
                    '<td>' + status + '</td>' +
                    '<td>' + data.startDatePromotionEvaluation + '</td>' +
                    '<td>' + data.endDatePromotionEvaluation + '</td>' +
                    '<td>' + data.startDatePromotionRun + '</td>' +
                    '<td>' + data.endDatePromotionRun + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var promotionId = $(this).attr('value');
                base.Control.btnUpdateModal().show();
                base.Control.btnCreateModal().hide();
                base.Parameters.promotionAmountId = promotionId;
                base.Ajax.AjaxGetDetailPromotionAmount45.data = {
                    promotionAmountId: promotionId
                };
                base.Ajax.AjaxGetDetailPromotionAmount45.submit();
            });
        },
        clsDeleteDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.deleteData', function () {
                var promotionId = $(this).attr('value');
                base.Ajax.AjaxDeletePromotionAmount45.data = {
                    promotionAmountId: promotionId
                };
                base.Ajax.AjaxDeletePromotionAmount45.submit();
            });
        },
        FillDataModal: function (data) {
            base.Control.slcStatus().val(data.active.toString());
            base.Control.slcStatus().selectpicker('refresh');
            base.Control.txtPoints().val(data.pointsEvaluated);
            base.Control.txtQuantity().val(data.quantity);
            base.Control.txtInitEvaluationDate().val(data.startDatePromotionEvaluation);
            base.Control.txtInitEvaluationHour().val(data.startHourPromotionEvaluation);
            base.Control.txtEndEvaluationDate().val(data.endDatePromotionEvaluation);
            base.Control.txtEndEvaluationHour().val(data.endHourPromotionEvaluation);
            base.Control.txtInitPromotionDate().val(data.startDatePromotionRun);
            base.Control.txtInitPromotionHour().val(data.startHourPromotionRun);
            base.Control.txtEndPromotionDate().val(data.endDatePromotionRun);
            base.Control.txtEndPromotionHour().val(data.endHourPromotionRun);
        },
        ShowToastrError: function (message) {
            toastr.error("" + message + "", "Ooops!", {
                timeOut: 5e3,
                closeButton: !0,
                debug: !1,
                newestOnTop: !0,
                progressBar: !0,
                positionClass: "toast-top-right",
                preventDuplicates: !0,
                onclick: null,
                showDuration: "300",
                hideDuration: "1000",
                extendedTimeOut: "1000",
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
                tapToDismiss: !1
            })
        },
    };
}