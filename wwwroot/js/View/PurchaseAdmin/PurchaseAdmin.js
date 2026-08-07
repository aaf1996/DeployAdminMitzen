ns('Mitosiz.Site.PurchaseAdmin.Index')
Mitosiz.Site.PurchaseAdmin.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.GetPurchaseForAdmin();
        base.Function.clsNumberPagination();
        base.Function.clsAddOriginalProductClick();
        base.Function.clsRemoveOriginalProductClick();
        base.Function.clsProductPackageAutocomplete();
        base.Control.btnCreatePurchase().click(base.Event.btnCreatePurchaseClick);
        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Ajax.AjaxGetStores.submit();
        base.Ajax.AjaxGetTypeOfOrderAdminDropDown.submit();
        base.Ajax.AjaxGetStatusPurchaseAdminDropDown.submit();
        base.Control.txtUser().autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: 'POST',
                    url: Mitosiz.Site.PurchaseAdmin.Actions.GetDropDownPatrons,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        NamePatron: request.term
                    }),
                    async: false,
                    success: function (data) {
                        var results = $.map(data.data, function (tag) {
                            return {
                                label: tag.namePatron,
                                value: tag.userId
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
                base.Control.hiddenUser().val(ui.item.value);
                base.Control.txtUser().val(ui.item.label);
                return false;
            }
        });
        base.Control.btnSaveModal().click(base.Event.btnSaveModalClick);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Function.clsUpdateDataClick();
        base.Function.clsDeleteDataClick();
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        purchaseAdminId: 0,
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbody'); },
        tbodyDetailPurchase: function () { return $('#tbodyDetailPurchase'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        modalUpdate: function () { return $('#modalUpdate'); },
        btnCreatePurchase: function () { return $('#btnCreatePurchase'); },
        txtUserFilter: function () { return $('#txtUserFilter'); },
        txtStartDate: function () { return $('#txtStartDate'); },
        txtEndDate: function () { return $('#txtEndDate'); },
        slcStore: function () { return $('#slcStore'); },
        slcTypeOfOrder: function () { return $('#slcTypeOfOrder'); },
        slcStatus: function () { return $('#slcStatus'); },
        txtUser: function () { return $('#txtUser'); },
        txtReceptor: function () { return $('#txtReceptor'); },
        txtPointsWholesale: function () { return $('#txtPointsWholesale'); },
        txtCreationTime: function () { return $('#txtCreationTime'); },
        txtDeliveryDate: function () { return $('#txtDeliveryDate'); },
        hiddenUser: function () { return $('#hiddenUser'); },
        btnSaveModal: function () { return $('#btnSaveModal'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        rowProductPackage: function () { return $('#rowProductPackage'); },
        clsProductPackage: function () { return $('.productPurchase'); },
        tbodyProductPackage: function () { return $('#tbodyProductPackage'); },
        divDetailPurchaseAdmin: function () { return $('#divDetailPurchaseAdmin'); },
        divUpdate: function () { return $('.divUpdate'); },
    };
    base.Event = {
        AjaxGetPurchaseForAdminPaginationSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.purchaseAdminForAdmin);
                }
            }
        },
        AjaxGetDetailPurchaseAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataIntoModal(data.data);
                    base.Control.modalUpdate().modal('show');
                }
            }
        },
        AjaxSavePurchaseAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "El pedido fue creado !!", "success")
                    base.Control.modalUpdate().modal('hide');
                    base.Function.GetPurchaseForAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error")
                }
            }
        },
        AjaxUpdatePurchaseAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "El pedido fue actualizado !!", "success")
                    base.Control.modalUpdate().modal('hide');
                    base.Function.GetPurchaseForAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error")
                }
            }
        },
        AjaxDeletePurchaseAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "El pedido fue eliminado !!", "success")
                    base.Function.GetPurchaseForAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error")
                }
            }
        },
        AjaxGetStoresSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcStore().empty();
                    $.each(data.data, function (key, value) {
                        base.Control.slcStore().append($('<option>', {
                            value: value.storeId,
                            text: value.storeName
                        }));
                    });
                    base.Control.slcStore().selectpicker('refresh');
                }
            }
        },
        AjaxGetTypeOfOrderAdminDropDownSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcTypeOfOrder().empty();
                    $.each(data.data, function (key, value) {
                        base.Control.slcTypeOfOrder().append($('<option>', {
                            value: value.typeOfOrderAdminId,
                            text: value.description
                        }));
                    });
                    base.Control.slcTypeOfOrder().selectpicker('refresh');
                }
            }
        },
        AjaxGetStatusPurchaseAdminDropDownSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcStatus().empty();
                    $.each(data.data, function (key, value) {
                        base.Control.slcStatus().append($('<option>', {
                            value: value.statusPurchaseAdminId,
                            text: value.description
                        }));
                    });
                    base.Control.slcStatus().selectpicker('refresh');
                }
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Function.GetPurchaseForAdmin();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Function.GetPurchaseForAdmin();
        },
        btnUpdateModalClick: function () {
            if (base.Control.hiddenUser().val() == "" || base.Control.hiddenUser().val() == undefined) {
                Swal.fire("Oops...", "Debe ingresar un empresario válido.", "error")
                return;
            }

            base.Ajax.AjaxUpdatePurchaseAdmin.data = {
                purchaseAdminId: base.Parameters.purchaseAdminId,
                userId: base.Control.hiddenUser().val(),
                storeId: base.Control.slcStore().val(),
                typeOfOrderAdminId: base.Control.slcTypeOfOrder().val(),
                statusPurchaseAdminId: base.Control.slcStatus().val(),
                receptor: base.Control.txtReceptor().val(),
                pointsWholesale: base.Control.txtPointsWholesale().val(),
                lastModifierUser: 0,
            };
            base.Ajax.AjaxUpdatePurchaseAdmin.submit();
        },
        btnSaveModalClick: function () {
            if (base.Control.hiddenUser().val() == "" || base.Control.hiddenUser().val() == undefined) {
                Swal.fire("Oops...", "Debe ingresar un empresario válido.", "error")
                return;
            }

            var purchaseDetail = [];
            $('.productPurchase').each(function () {
                var valueHidden = $(this).attr('value-hidden');
                var productName = $("#product" + valueHidden).val().trim();
                var productId = $("#hiddenProductId" + valueHidden).val();
                var quantity = $("#quantity" + valueHidden).val();
                if (productId != null && productId != undefined && productId != '') {
                    var objDetail = {
                        productId: productId,
                        quantity: quantity,
                        productName: productName
                    };
                    purchaseDetail.push(objDetail);
                }
            });

            if (purchaseDetail.length == 0) {
                Swal.fire("Oops...", "Debe agregar productos al pedido.", "error");
                return;
            }
            
            base.Ajax.AjaxSavePurchaseAdmin.data = {
                userId: base.Control.hiddenUser().val(),
                storeId: base.Control.slcStore().val(),
                typeOfOrderAdminId: base.Control.slcTypeOfOrder().val(),
                creationUser: 0,
                requestInsertDetailPurchaseAdmin: purchaseDetail,
            };
            base.Ajax.AjaxSavePurchaseAdmin.submit();
        },
        btnCreatePurchaseClick: function () {
            base.Control.txtUser().val("");
            base.Control.slcStore().val(1);
            base.Control.slcStore().selectpicker('refresh');
            base.Control.slcTypeOfOrder().val(1);
            base.Control.slcTypeOfOrder().selectpicker('refresh');

            base.Control.tbodyProductPackage().empty();
            base.Control.rowProductPackage().show();
            var rowCount = base.Control.tbodyProductPackage().children('tr').length;
            base.Function.AppendNewRowProductPackage(rowCount);

            base.Control.divUpdate().hide();
            base.Control.divDetailPurchaseAdmin().hide();

            base.Control.btnUpdateModal().hide();
            base.Control.btnSaveModal().show();
            base.Control.modalUpdate().modal('show');
        },
    };
    base.Ajax = {
        AjaxGetTypeOfOrderAdminDropDown: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.PurchaseAdmin.Actions.GetTypeOfOrderAdminDropDown,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetTypeOfOrderAdminDropDownSuccess
        }),
        AjaxGetStatusPurchaseAdminDropDown: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.PurchaseAdmin.Actions.GetStatusPurchaseAdminDropDown,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetStatusPurchaseAdminDropDownSuccess
        }),
        AjaxGetPurchaseForAdminPagination: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.PurchaseAdmin.Actions.GetPurchaseForAdminPagination,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetPurchaseForAdminPaginationSuccess
        }),
        AjaxGetDetailPurchaseAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.PurchaseAdmin.Actions.GetDetailPurchaseAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailPurchaseAdminSuccess
        }),
        AjaxGetStores: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.PurchaseAdmin.Actions.GetStores,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetStoresSuccess
        }),
        AjaxSavePurchaseAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.PurchaseAdmin.Actions.SavePurchaseAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxSavePurchaseAdminSuccess
        }),
        AjaxUpdatePurchaseAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.PurchaseAdmin.Actions.UpdatePurchaseAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdatePurchaseAdminSuccess
        }),
        AjaxDeletePurchaseAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.PurchaseAdmin.Actions.DeletePurchaseAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxDeletePurchaseAdminSuccess
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
                base.Function.GetPurchaseForAdmin();
            });
        },
        GetPurchaseForAdmin: function () {
            base.Ajax.AjaxGetPurchaseForAdminPagination.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                names: base.Control.txtUserFilter().val(),
                startDate: base.Control.txtStartDate().val(),
                endDate: base.Control.txtEndDate().val()
            };
            base.Ajax.AjaxGetPurchaseForAdminPagination.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
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
                    '<a class="dropdown-item updateData" value="' + data.purchaseAdminId + '" href="#">Actualizar</a>' +
                    '<a class="dropdown-item deleteData" value="' + data.purchaseAdminId + '" href="#">Eliminar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.purchaseAdminId + '</strong></td>' +
                    '<td>' + data.names + '</td>' +
                    '<td>' + data.quantity + '</td>' +
                    '<td>' + data.storeName + '</td>' +
                    '<td>' + data.statusPurchaseAdmin + '</td>' +
                    '<td>' + data.typeOfOrderAdmin + '</td>' +
                    '<td>' + data.receptor + '</td>' +
                    '<td>' + data.creationTime + '</td>' +
                    '<td>' + (data.deliveryDate ?? "") + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var purchaseAdminId = $(this).attr('value');
                base.Parameters.purchaseAdminId = purchaseAdminId;
                base.Control.rowProductPackage().hide();
                base.Control.divUpdate().show();
                base.Control.divDetailPurchaseAdmin().show();
                base.Control.btnUpdateModal().show();
                base.Control.btnSaveModal().hide();
                base.Ajax.AjaxGetDetailPurchaseAdmin.data = {
                    purchaseAdminId: purchaseAdminId
                };
                base.Ajax.AjaxGetDetailPurchaseAdmin.submit();
            });
        },
        clsDeleteDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.deleteData', function () {
                var purchaseAdminId = $(this).attr('value');
                base.Ajax.AjaxDeletePurchaseAdmin.data = {
                    purchaseAdminId: purchaseAdminId
                };
                base.Ajax.AjaxDeletePurchaseAdmin.submit();
            });
        },
        clsAddOriginalProductClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.btnAddOriginalProduct', function () {
                var valueHidden = $(this).attr('value-hidden');

                var product = $("#product" + valueHidden).val().trim();
                var productId = $("#hiddenProductId" + valueHidden).val();
                var quantity = $("#quantity" + valueHidden).val().trim();

                if (product == "" || productId == "" || quantity == "" || parseInt(quantity) <= 0) {
                    Swal.fire("Oops...", "Debe seleccionar un producto y una cantidad antes de agregar otro.", "error")
                    return;
                }

                $("#btnAddProduct" + valueHidden).hide();
                $("#btnRemoveProduct" + valueHidden).hide();

                var rowCount = base.Control.tbodyProductPackage().children('tr').length;
                base.Function.AppendNewRowProductPackage(rowCount);
            });
        },
        clsRemoveOriginalProductClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.btnRemoveOriginalProduct', function () {
                var valueHidden = $(this).attr('value-hidden');
                var previousRow = parseInt(valueHidden) - 1;
                $("#btnAddProduct" + previousRow + "").show();
                if (previousRow > 0) {
                    $("#btnRemoveProduct" + previousRow + "").show();
                }
                $('#tbodyProductPackage tr').eq(parseInt(valueHidden)).remove();
            });
        },
        clsProductPackageAutocomplete: function () {
            $(document).on('focus', '.productPurchase', function () {
                if (!$(this).data('ui-autocomplete')) {
                    $(this).autocomplete({
                        source: function (request, response) {
                            console.log(request);
                            console.log(request.term);
                            $.ajax({
                                type: 'POST',
                                url: Mitosiz.Site.PurchaseAdmin.Actions.GetProductForPurchaseAdminDropDown,
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    productName: request.term
                                }),
                                async: false,
                                success: function (data) {
                                    var results = $.map(data.data, function (tag) {
                                        return {
                                            label: tag.productName,
                                            value: tag.productId
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
                            var input = $(this);
                            var valueHidden = input.attr('value-hidden');
                            $("#product" + valueHidden).val(ui.item.label);
                            $("#hiddenProductId" + valueHidden).val(ui.item.value);
                            return false;
                        }
                    });
                }
            });
        },
        FillDataIntoModal: function (data) {
            base.Control.txtUser().val(data.names);
            base.Control.hiddenUser().val(data.userId);
            base.Control.slcStore().val(data.storeId);
            base.Control.slcStore().selectpicker('refresh');
            base.Control.slcTypeOfOrder().val(data.typeOfOrderAdminId);
            base.Control.slcTypeOfOrder().selectpicker('refresh');
            base.Control.slcStatus().val(data.statusPurchaseAdminId);
            base.Control.slcStatus().selectpicker('refresh');
            base.Control.txtReceptor().val(data.receptor);
            base.Control.txtPointsWholesale().val(data.pointsWholesale);
            base.Control.txtCreationTime().val(data.creationTime);
            base.Control.txtDeliveryDate().val(data.deliveryDate ?? "");
            base.Function.FillDataDetailIntoModal(data.dataPurchaseDetailAdmin);
        },
        FillDataDetailIntoModal: function (listDetail) {
            base.Control.tbodyDetailPurchase().empty();
            listDetail.forEach(function (data) {
                base.Control.tbodyDetailPurchase().append('<tr style="text-align: center;">' +
                    '<td>' + data.productName + '</td>' +
                    '<td>' + data.quantity + '</td>' +
                    '</tr>');
            });
        },
        ClearFilters: function () {
            base.Control.txtProductIdFilter().val("");
            base.Control.txtProductNameFilter().val("");
        },
        AppendNewRowProductPackage: function (rowCount) {
            var hideRemove = rowCount == 0 ? "display:none;" : "";
            base.Control.tbodyProductPackage().append('<tr style="text-align: center;">' +
                '<td><input type="text" id="product' + rowCount + '" value-hidden="' + rowCount + '" value="" style="text-align: center;" class="form-control mb-xl-0 mb-1 productPurchase"></td>' +
                '<td style="display:none;"><input type="hidden" id="hiddenProductId' + rowCount + '"></td>' +
                '<td><input type="text" id="quantity' + rowCount + '" value-hidden="' + rowCount + '" value="1" style="text-align: center;" class="form-control mb-xl-0 mb-1"></td>' +
                '<td>' +
                '<div class="btnAddOriginalProduct" value-hidden="' + rowCount + '" id="btnAddProduct' + rowCount + '">' +
                '<a class= "btn btn-success shadow btn-s sharp me-1">' +
                'Agregar' +
                '</a>' +
                '</div></td>' +
                '<td>' +
                '<div class="btnRemoveOriginalProduct" style="' + hideRemove + '" value-hidden="' + rowCount + '" id="btnRemoveProduct' + rowCount + '">' +
                '<a class= "btn btn-danger shadow btn-s sharp me-1">' +
                '<i class="fa-solid fa-minus"></i>' +
                '</a>' +
                '</div></td>' +
                '</tr>');
        },
    };
}