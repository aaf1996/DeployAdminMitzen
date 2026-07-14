ns('Mitosiz.Site.StarByProduct.Index')
Mitosiz.Site.StarByProduct.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Function.clsUpdateDataClick();
        base.Control.btnCreateStarByProduct().click(base.Event.btnCreateStarByProductClick);
        base.Function.clsDeleteDataClick();
        base.Function.GetStarByProductForAdmin();
        base.Function.clsProductPackageAutocomplete();
        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);

        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Control.btnSaveModal().click(base.Event.btnCreateModalClick);
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        starByProductId: 0,
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyTable'); },
        modalSave: function () { return $('#modalSave'); },
        txtProductNameFilter: function () { return $('#txtProductNameFilter'); },
        txtStarPoints: function () { return $('#txtStarPoints'); },
        txtProductModal: function () { return $('#txtProductModal'); },
        txtMaximumStarPoints: function () { return $('#txtMaximumStarPoints'); },
        hiddenProductIdModal: function () { return $('#hiddenProductIdModal'); },
        btnCreateStarByProduct: function () { return $('#btnCreateStarByProduct'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        btnSaveModal: function () { return $('#btnSaveModal'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
    };
    base.Event = {
        AjaxGetStarByProductForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.starByProductForAdmin);
                }
            }
        },
        AjaxGetDetailStarByProductForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataModal(data.data);
                    base.Control.modalSave().modal('show');
                }
            }
        },
        AjaxInsertStarByProductForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalSave().modal('hide');
                    Swal.fire("Excelente !!", "El producto por token fue creado !!", "success")
                    base.Function.GetStarByProductForAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
            }
        },
        AjaxUpdateStarByProductForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.modalSave().modal('hide');
                    Swal.fire("Excelente !!", "El producto por token fue actualizado !!", "success")
                    base.Function.GetStarByProductForAdmin();
                }
                else {
                    Swal.fire("Oops...", data.message, "error");
                }
            }
        },
        AjaxDeleteStarByProductForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "El producto por token fue eliminado !!", "success")
                    base.Function.GetStarByProductForAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                    base.Function.GetStarByProductForAdmin();
                }
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Function.GetStarByProductForAdmin();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Function.GetStarByProductForAdmin();
        },
        btnCreateModalClick: function () {
            if (base.Control.txtProductModal().val() == "") {
                Swal.fire("Oops...", "Debe seleccionar un producto válido", "error");
                return;
            }
            else if (base.Control.txtStarPoints().val() == "") {
                Swal.fire("Oops...", "Debe ingresar Tokens válidos", "error");
                return;
            }
            else if (base.Control.txtMaximumStarPoints().val() == "") {
                Swal.fire("Oops...", "Debe ingresar un Máximo de Tokens válidos", "error");
                return;
            }
            base.Ajax.AjaxInsertStarByProductForAdmin.data = {
                productId: base.Control.hiddenProductIdModal().val(),
                starPoints: base.Control.txtStarPoints().val(),
                maximumPoints: base.Control.txtMaximumStarPoints().val(),
                creationUser: 0,
            };
            base.Ajax.AjaxInsertStarByProductForAdmin.submit();
        },
        btnUpdateModalClick: function () {
            if (base.Control.txtStarPoints().val() == "") {
                Swal.fire("Oops...", "Debe ingresar Tokens válidos", "error");
                return;
            }
            else if (base.Control.txtMaximumStarPoints().val() == "") {
                Swal.fire("Oops...", "Debe ingresar un Máximo de Tokens válidos", "error");
                return;
            }
            base.Ajax.AjaxUpdateStarByProductForAdmin.data = {
                starByProductId: base.Parameters.starByProductId,
                starPoints: base.Control.txtStarPoints().val(),
                maximumPoints: base.Control.txtMaximumStarPoints().val(),
                lastModifierUser: 0,
            };
            base.Ajax.AjaxUpdateStarByProductForAdmin.submit();
        },
        btnCreateStarByProductClick: function () {
            base.Control.txtStarPoints().val(0);
            base.Control.txtProductModal().val("");
            base.Control.txtMaximumStarPoints().val(0);
            base.Control.txtProductModal().prop("readonly", false);

            base.Control.btnUpdateModal().hide();
            base.Control.btnSaveModal().show();
            base.Control.modalSave().modal('show');
        },
    };
    base.Ajax = {
        AjaxGetStarByProductForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarByProduct.Actions.GetStarByProductForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetStarByProductForAdminSuccess
        }),
        AjaxGetDetailStarByProductForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarByProduct.Actions.GetDetailStarByProductForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailStarByProductForAdminSuccess
        }),
        AjaxInsertStarByProductForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarByProduct.Actions.InsertStarByProductForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxInsertStarByProductForAdminSuccess
        }),
        AjaxUpdateStarByProductForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarByProduct.Actions.UpdateStarByProductForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateStarByProductForAdminSuccess
        }),
        AjaxDeleteStarByProductForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.StarByProduct.Actions.DeleteStarByProductForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxDeleteStarByProductForAdminSuccess
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
                base.Function.GetStarByProductForAdmin();
            });
        },
        GetStarByProductForAdmin: function () {
            base.Ajax.AjaxGetStarByProductForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                productName: base.Control.txtProductNameFilter().val(),
            };
            base.Ajax.AjaxGetStarByProductForAdmin.submit();
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
                    '<a class="dropdown-item updateData" value="' + data.starByProductId + '" href="#">Actualizar</a>' +
                    '<a class="dropdown-item deleteData" value="' + data.starByProductId + '" href="#">Eliminar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.starByProductId + '</strong></td>' +
                    '<td>' + data.productName + '</td>' +
                    '<td>' + data.starPoints + '</td>' +
                    '<td style="text-align: center !important;">' + data.maximumPoints + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var starByProductId = $(this).attr('value');
                base.Control.txtProductModal().prop("readonly", true);
                base.Control.btnUpdateModal().show();
                base.Control.btnSaveModal().hide();
                base.Parameters.starByProductId = starByProductId;
                base.Ajax.AjaxGetDetailStarByProductForAdmin.data = {
                    starByProductId: starByProductId
                };
                base.Ajax.AjaxGetDetailStarByProductForAdmin.submit();
            });
        },
        clsDeleteDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.deleteData', function () {
                var starByProductId = $(this).attr('value');
                Swal.fire({
                    title: "Estás segur@ de eliminar el Producto x Token?",
                    text: "Esto no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        base.Ajax.AjaxDeleteStarByProductForAdmin.data = {
                            starByProductId: starByProductId
                        };
                        base.Ajax.AjaxDeleteStarByProductForAdmin.submit();
                    }
                });
            });
        },
        FillDataModal: function (data) {
            base.Control.txtStarPoints().val(data.starPoints);
            base.Control.txtProductModal().val(data.productName);
            base.Control.txtMaximumStarPoints().val(data.maximumPoints);
        },
        clsProductPackageAutocomplete: function () {
            $(document).on('focus', '.productPackage', function () {
                if (!$(this).data('ui-autocomplete')) {
                    $(this).autocomplete({
                        source: function (request, response) {
                            $.ajax({
                                type: 'POST',
                                url: Mitosiz.Site.StarByProduct.Actions.GetDropDownProduct,
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
                            $("#txtProductModal").val(ui.item.label);
                            $("#hiddenProductIdModal").val(ui.item.value);
                            return false;
                        }
                    });
                }
            });
        },
        ClearFilters: function () {
            base.Control.txtProductNameFilter().val("");
        },
    };
}