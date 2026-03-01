ns('Mitosiz.Site.Promotion.Index')
Mitosiz.Site.Promotion.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Function.clsNumberPaginationAditionalScore();
        base.Function.GetPromotionAmount45Admin();
        base.Function.GetAdditionalScorePromotionFromViewAdmin();
        base.Function.clsUpdateDataClick();
        base.Function.clsUpdateDataAditionalScoreClick();
        base.Function.clsDeleteDataClick();
        base.Function.clsDeleteDataAditionalScoreClick();

        base.Control.btnAddYapaPromotion().click(base.Event.btnAddYapaPromotion);
        base.Control.btnCreateAditionalScore().click(base.Event.btnCreateAditionalScore);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Control.btnCreateModal().click(base.Event.btnCreateModalClick);
        base.Control.btnUpdateModalAditionalScore().click(base.Event.btnUpdateModalAditionalScoreClick);
        base.Control.btnCreateModalAditionalScore().click(base.Event.btnCreateModalAditionalScoreClick);
        base.Ajax.AjaxGetAditionalScorePurchase.submit();
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        currentPageAditionalScore: 1,
        totalPagesAditionalScore: 1,
        sizePaginationAditionalScore: 10,
        promotionAmountId: 0,
        idAdditionalScore: 0,
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        divPaginationAditionalScore: function () { return $('#paginationAditionalScore'); },
        tbodyTable: function () { return $('#tbodyPromotionYapa'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        modalSave: function () { return $('#modalSave'); },
        modalAditionalScore: function () { return $('#modalAditionalScore'); },
        btnAddYapaPromotion: function () { return $('#btnAddYapaPromotion'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        btnCreateModal: function () { return $('#btnCreateModal'); },
        btnUpdateModalAditionalScore: function () { return $('#btnUpdateModalAditionalScore'); },
        btnCreateModalAditionalScore: function () { return $('#btnCreateModalAditionalScore'); },
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
        tbodyAditionalScore: function () { return $('#tbodyAditionalScore'); },
        slcAdditionalPercentage: function () { return $('#slcAdditionalPercentage'); },
        slcStatusAdditionalScore: function () { return $('#slcStatusAdditionalScore'); },
        txtStartDateAditionalScore: function () { return $('#txtStartDateAditionalScore'); },
        txtStartHourAditionalScore: function () { return $('#txtStartHourAditionalScore'); },
        txtEndDateAditionalScore: function () { return $('#txtEndDateAditionalScore'); },
        txtEndHourAditionalScore: function () { return $('#txtEndHourAditionalScore'); },
        btnCreateAditionalScore: function () { return $('#btnCreateAditionalScore'); },
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
        AjaxGetAdditionalScorePromotionFromViewAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPagesAditionalScore = data.data.totalPages;
                    base.Function.FillDataAdditionalScorePromotion(data.data.additionalScorePromotionForAdmin);
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
        AjaxGetAdditionalScorePromotionDetailFromViewAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataModalAdditionalScore(data.data);
                    base.Control.modalAditionalScore().modal('show');
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
        AjaxUpdateAdditionalScorePromotionFromViewAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalAditionalScore().modal('hide');
                    Swal.fire("Excelente !!", "La promoción fue actualizada !!", "success")
                    base.Function.GetAdditionalScorePromotionFromViewAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error")
                }
            }
        },
        AjaxInsertAdditionalScorePromotionFromViewAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalAditionalScore().modal('hide');
                    Swal.fire("Excelente !!", "La promoción fue creada !!", "success")
                    base.Function.GetAdditionalScorePromotionFromViewAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error")
                }
            }
        },
        AjaxDeleteAdditionalScorePromotionFromViewAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "La promoción fue eliminada !!", "success")
                    base.Function.GetAdditionalScorePromotionFromViewAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
            }
        },
        AjaxGetAditionalScorePurchaseSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcAdditionalPercentage().empty();
                    $.each(data.data, function (key, value) {
                        base.Control.slcAdditionalPercentage().append($('<option>', {
                            value: value.value,
                            text: value.name
                        }));
                    });
                    base.Control.slcAdditionalPercentage().selectpicker('refresh');
                }
            }
        },
        btnUpdateModalClick: function () {
            if (base.Control.txtPoints().val() == "") {
                Swal.fire("Oops...", "Porfavor ingrese un valor válido en Puntos", "error")
            }
            else if (base.Control.txtQuantity().val() == "") {
                Swal.fire("Oops...", "Porfavor ingrese un valor válido en Cantidad", "error")
            }
            else {
                //let listSubTypes = $('.chkSubTypePurchaseYapa:checked').map(function () {
                //    return parseInt($(this).attr('value-hidden'));
                //}).get();
                //let txtSubTypes = listSubTypes.join(',');

                base.Ajax.AjaxUpdatePromotionAmount45.data = {
                    promotionAmountId: base.Parameters.promotionAmountId,
                    pointsEvaluated: base.Control.txtPoints().val(),
                    quantity: base.Control.txtQuantity().val(),
                    active: base.Control.slcStatus().val() === "true",
                    //subTypePurchase: txtSubTypes,
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
                Swal.fire("Oops...", "Porfavor ingrese un valor válido en Puntos", "error")
            }
            else if (base.Control.txtQuantity().val() == "") {
                Swal.fire("Oops...", "Porfavor ingrese un valor válido en Cantidad", "error")
            }
            else {
                //let listSubTypes = $('.chkSubTypePurchaseYapa:checked').map(function () {
                //    return parseInt($(this).attr('value-hidden'));
                //}).get();
                //let txtSubTypes = listSubTypes.join(',');

                base.Ajax.AjaxInsertPromotionAmount45.data = {
                    pointsEvaluated: base.Control.txtPoints().val(),
                    quantity: base.Control.txtQuantity().val(),
                    active: base.Control.slcStatus().val() === "true",
                    //subTypePurchase: txtSubTypes,
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
        btnUpdateModalAditionalScoreClick: function () {
            let listSubTypes = $('.chkSubTypePurchase:checked').map(function () {
                return parseInt($(this).attr('value-hidden'));
            }).get();
            let txtSubTypes = listSubTypes.join(',');

            base.Ajax.AjaxUpdateAdditionalScorePromotionFromViewAdmin.data = {
                idAdditionalScore: base.Parameters.idAdditionalScore,
                active: base.Control.slcStatusAdditionalScore().val() === "true",
                additionalPercentage: base.Control.slcAdditionalPercentage().val(),
                subTypePurchase: txtSubTypes,
                startDate: base.Control.txtStartDateAditionalScore().val(),
                startHour: base.Control.txtStartHourAditionalScore().val(),
                endDate: base.Control.txtEndDateAditionalScore().val(),
                endHour: base.Control.txtEndHourAditionalScore().val(),
            };
            base.Ajax.AjaxUpdateAdditionalScorePromotionFromViewAdmin.submit();
        },
        btnCreateModalAditionalScoreClick: function () {
            let listSubTypes = $('.chkSubTypePurchase:checked').map(function () {
                return parseInt($(this).attr('value-hidden'));
            }).get();
            let txtSubTypes = listSubTypes.join(',');

            base.Ajax.AjaxInsertAdditionalScorePromotionFromViewAdmin.data = {
                active: base.Control.slcStatusAdditionalScore().val() === "true",
                additionalPercentage: base.Control.slcAdditionalPercentage().val(),
                subTypePurchase: txtSubTypes,
                startDate: base.Control.txtStartDateAditionalScore().val(),
                startHour: base.Control.txtStartHourAditionalScore().val(),
                endDate: base.Control.txtEndDateAditionalScore().val(),
                endHour: base.Control.txtEndHourAditionalScore().val(),
            };
            base.Ajax.AjaxInsertAdditionalScorePromotionFromViewAdmin.submit();
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
            //$('.chkSubTypePurchaseYapa').prop('checked', false);

            base.Control.btnUpdateModal().hide();
            base.Control.btnCreateModal().show();
            base.Control.modalSave().modal('show');
        },
        btnCreateAditionalScore: function () {
            base.Control.slcStatusAdditionalScore().val("true");
            base.Control.slcStatusAdditionalScore().selectpicker('refresh');
            base.Control.slcAdditionalPercentage().val("1.00");
            base.Control.slcAdditionalPercentage().selectpicker('refresh');
            base.Control.txtStartDateAditionalScore().datepicker("setDate", new Date());
            base.Control.txtStartHourAditionalScore().val("00:00");
            base.Control.txtEndDateAditionalScore().datepicker("setDate", new Date());
            base.Control.txtEndHourAditionalScore().val("00:00");
            $('.chkSubTypePurchase').prop('checked', false);

            base.Control.btnUpdateModalAditionalScore().hide();
            base.Control.btnCreateModalAditionalScore().show();
            base.Control.modalAditionalScore().modal('show');
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
        AjaxGetAditionalScorePurchase: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.GetAditionalScorePurchase,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetAditionalScorePurchaseSuccess
        }),
        AjaxGetAdditionalScorePromotionFromViewAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.GetAdditionalScorePromotionFromViewAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetAdditionalScorePromotionFromViewAdminSuccess
        }),
        AjaxGetAdditionalScorePromotionDetailFromViewAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.GetAdditionalScorePromotionDetailFromViewAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetAdditionalScorePromotionDetailFromViewAdminSuccess
        }),
        AjaxDeleteAdditionalScorePromotionFromViewAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.DeleteAdditionalScorePromotionFromViewAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxDeleteAdditionalScorePromotionFromViewAdminSuccess
        }),
        AjaxInsertAdditionalScorePromotionFromViewAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.InsertAdditionalScorePromotionFromViewAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxInsertAdditionalScorePromotionFromViewAdminSuccess
        }),
        AjaxUpdateAdditionalScorePromotionFromViewAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Promotion.Actions.UpdateAdditionalScorePromotionFromViewAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateAdditionalScorePromotionFromViewAdminSuccess
        }),
    };
    base.Function = {
        UpdatePagination: function () {
            base.Control.divPagination().empty();
            base.Control.divPagination().append('<li class="page-item page-indicator"><a class="page-link page-link-M" href="#" id="prev">«</a></li>');

            if (base.Parameters.totalPages <= 5) {
                for (var i = 1; i <= base.Parameters.totalPages; i++) {
                    base.Control.divPagination().append('<li class="page-item ' + (i === base.Parameters.currentPage ? 'active' : '') + '"><a class="page-link page-link-M" href="#">' + i + '</a></li>');
                }
            } else {
                var startPage = Math.max(1, base.Parameters.currentPage - 2);
                var endPage = Math.min(base.Parameters.totalPages, base.Parameters.currentPage + 2);

                if (base.Parameters.currentPage >= base.Parameters.totalPages - 2) {
                    startPage = base.Parameters.totalPages - 4;
                }

                if (startPage > 1) {
                    base.Control.divPagination().append('<li class="page-item"><a class="page-link page-link-M" href="#">1</a></li>');
                    if (startPage > 2) {
                        if (base.Parameters.currentPage != base.Parameters.totalPages) {
                            endPage--;
                        }
                        startPage++;
                        var valueHidden = startPage - 1;
                        base.Control.divPagination().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link page-link-M" href="#">..</a></li>');
                    }
                }

                for (var i = startPage; i <= endPage; i++) {
                    base.Control.divPagination().append('<li class="page-item ' + (i === base.Parameters.currentPage ? 'active' : '') + '"><a class="page-link page-link-M" href="#">' + i + '</a></li>');
                }

                if (endPage < base.Parameters.totalPages) {
                    if (endPage < base.Parameters.totalPages - 1) {
                        var valueHidden = endPage + 1;
                        base.Control.divPagination().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link page-link-M" href="#">..</a></li>');
                    }
                    base.Control.divPagination().append('<li class="page-item"><a class="page-link page-link-M" href="#">' + base.Parameters.totalPages + '</a></li>');
                }
            }

            base.Control.divPagination().append('<li class="page-item page-indicator"><a class="page-link page-link-M" href="#" id="next">»</a></li>');
        },
        UpdatePaginationAditionalScorePromotion: function () {
            base.Control.divPaginationAditionalScore().empty();
            base.Control.divPaginationAditionalScore().append('<li class="page-item page-indicator"><a class="page-link page-link-AS" href="#" id="prev">«</a></li>');

            if (base.Parameters.totalPagesAditionalScore <= 5) {
                for (var i = 1; i <= base.Parameters.totalPagesAditionalScore; i++) {
                    base.Control.divPaginationAditionalScore().append('<li class="page-item ' + (i === base.Parameters.currentPageAditionalScore ? 'active' : '') + '"><a class="page-link page-link-AS" href="#">' + i + '</a></li>');
                }
            } else {
                var startPage = Math.max(1, base.Parameters.currentPageAditionalScore - 2);
                var endPage = Math.min(base.Parameters.totalPagesAditionalScore, base.Parameters.currentPageAditionalScore + 2);

                if (base.Parameters.currentPageAditionalScore >= base.Parameters.totalPagesAditionalScore - 2) {
                    startPage = base.Parameters.totalPagesAditionalScore - 4;
                }

                if (startPage > 1) {
                    base.Control.divPaginationAditionalScore().append('<li class="page-item"><a class="page-link page-link-AS" href="#">1</a></li>');
                    if (startPage > 2) {
                        if (base.Parameters.currentPageAditionalScore != base.Parameters.totalPagesAditionalScore) {
                            endPage--;
                        }
                        startPage++;
                        var valueHidden = startPage - 1;
                        base.Control.divPaginationAditionalScore().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link page-link-AS" href="#">..</a></li>');
                    }
                }

                for (var i = startPage; i <= endPage; i++) {
                    base.Control.divPaginationAditionalScore().append('<li class="page-item ' + (i === base.Parameters.currentPageAditionalScore ? 'active' : '') + '"><a class="page-link page-link-AS" href="#">' + i + '</a></li>');
                }

                if (endPage < base.Parameters.totalPagesAditionalScore) {
                    if (endPage < base.Parameters.totalPagesAditionalScore - 1) {
                        var valueHidden = endPage + 1;
                        base.Control.divPaginationAditionalScore().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link page-link-AS" href="#">..</a></li>');
                    }
                    base.Control.divPaginationAditionalScore().append('<li class="page-item"><a class="page-link page-link-AS" href="#">' + base.Parameters.totalPagesAditionalScore + '</a></li>');
                }
            }

            base.Control.divPaginationAditionalScore().append('<li class="page-item page-indicator"><a class="page-link page-link-AS" href="#" id="next">»</a></li>');
        },
        clsNumberPagination: function () {
            var parentElement = $(document);
            parentElement.on('click', '.page-link-M', function () {
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
        clsNumberPaginationAditionalScore: function () {
            var parentElement = $(document);
            parentElement.on('click', '.page-link-AS', function () {
                var page = $(this).text();
                if (page === '«') {
                    if (base.Parameters.currentPageAditionalScore > 1) {
                        base.Parameters.currentPageAditionalScore--;
                    }
                } else if (page === '»') {
                    if (base.Parameters.currentPageAditionalScore < base.Parameters.totalPagesAditionalScore) {
                        base.Parameters.currentPageAditionalScore++;
                    }
                } else if (page === '..') {
                    base.Parameters.currentPageAditionalScore = parseInt($(this).attr('value-hidden'));
                } else {
                    base.Parameters.currentPageAditionalScore = parseInt(page);
                }
                base.Function.GetAdditionalScorePromotionFromViewAdmin();
            });
        },
        GetPromotionAmount45Admin: function () {
            base.Ajax.AjaxGetPromotionAmount45Admin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination
            };
            base.Ajax.AjaxGetPromotionAmount45Admin.submit();
        },
        GetAdditionalScorePromotionFromViewAdmin: function () {
            base.Ajax.AjaxGetAdditionalScorePromotionFromViewAdmin.data = {
                number: base.Parameters.currentPageAditionalScore,
                size: base.Parameters.sizePaginationAditionalScore
            };
            base.Ajax.AjaxGetAdditionalScorePromotionFromViewAdmin.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
                var status = data.active ? "Activo" : "Inactivo";
                base.Control.tbodyTable().append('<tr style="text-align: center;">' +
                    '<td>' +
                    '<div class="dropdown" style="position: static;">' +
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
        FillDataAdditionalScorePromotion: function (listData) {
            base.Control.tbodyAditionalScore().empty();
            listData.forEach(function (data) {
                var status = data.active ? "Activo" : "Inactivo";
                base.Control.tbodyAditionalScore().append('<tr style="text-align: center;">' +
                    '<td>' +
                    '<div class="dropdown" style="position: static;">' +
                    '<button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">' +
                    '<svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">' +
                    '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
                    '<rect x="0" y="0" width="24" height="24" /><circle fill="#000000" cx="5" cy="12" r="2" /><circle fill="#000000" cx="12" cy="12" r="2" /><circle fill="#000000" cx="19" cy="12" r="2" />' +
                    '</g>' +
                    '</svg>' +
                    '</button>' +
                    '<div class="dropdown-menu">' +
                    '<a class="dropdown-item updateDataAditionalScore" value="' + data.idAdditionalScore + '" href="#">Actualizar</a>' +
                    '<a class="dropdown-item deleteDataAditionalScore" value="' + data.idAdditionalScore + '" href="#">Eliminar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.idAdditionalScore + '</strong></td>' +
                    '<td>' + data.descriptionAdditionalPercentage + '</td>' +
                    '<td>' + status + '</td>' +
                    '<td>' + data.startDate + '</td>' +
                    '<td>' + data.endDate + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePaginationAditionalScorePromotion();
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
        clsUpdateDataAditionalScoreClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateDataAditionalScore', function () {
                var idAdditionalScore = $(this).attr('value');
                base.Control.btnUpdateModalAditionalScore().show();
                base.Control.btnCreateModalAditionalScore().hide();
                base.Parameters.idAdditionalScore = idAdditionalScore;
                base.Ajax.AjaxGetAdditionalScorePromotionDetailFromViewAdmin.data = {
                    idAdditionalScore: idAdditionalScore
                };
                base.Ajax.AjaxGetAdditionalScorePromotionDetailFromViewAdmin.submit();
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
        clsDeleteDataAditionalScoreClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.deleteDataAditionalScore', function () {
                var idAdditionalScore = $(this).attr('value');
                base.Ajax.AjaxDeleteAdditionalScorePromotionFromViewAdmin.data = {
                    idAdditionalScore: idAdditionalScore
                };
                base.Ajax.AjaxDeleteAdditionalScorePromotionFromViewAdmin.submit();
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
            //$('.chkSubTypePurchaseYapa').prop('checked', false);
            //let listSubTypePurchase = data.subTypePurchase.split(",");
            //listSubTypePurchase.forEach(id => {
            //    $('#chkYapa' + id).prop('checked', true);
            //});
        },
        FillDataModalAdditionalScore: function (data) {
            base.Control.slcStatusAdditionalScore().val(data.active.toString());
            base.Control.slcStatusAdditionalScore().selectpicker('refresh');
            base.Control.slcAdditionalPercentage().val(data.additionalPercentage.toFixed(2).toString());
            base.Control.slcAdditionalPercentage().selectpicker('refresh');
            base.Control.txtStartDateAditionalScore().val(data.startDatePromotion);
            base.Control.txtStartHourAditionalScore().val(data.startHourPromotion);
            base.Control.txtEndDateAditionalScore().val(data.endDatePromotion);
            base.Control.txtEndHourAditionalScore().val(data.endHourPromotion);
            $('.chkSubTypePurchase').prop('checked', false);
            let listSubTypePurchase = data.subTypePurchase.split(",");
            listSubTypePurchase.forEach(id => {
                $('#chk' + id).prop('checked', true);
            });
        },
    };
}