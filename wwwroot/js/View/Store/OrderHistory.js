ns('Mitosiz.Site.OrderHistory.Index')
Mitosiz.Site.OrderHistory.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.GetOrderAdmin();
        base.Function.clsNumberPagination();
        base.Function.clsNumberPaginationModal();
        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Function.clsOrderDetailClick();
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Function.clsDeleteOrderClick();
        base.Function.clsApproveOrderClick();
        base.Function.clsApproveShippingClick();
    };
    base.Parameters = {
        currentPage: 1,
        currentPageModal: 1,
        totalPages: 1,
        totalPagesModal: 1,
        sizePagination: 10,
        sizePaginationModal: 4,
        wholesaleOrderId: 0,
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        divPaginationModal: function () { return $('#paginationModal'); },
        tbodyTable: function () { return $('#tbodyOrder'); },
        tbodyDetailOrder: function () { return $('#tbodyDetail'); },
        txtStoreName: function () { return $('#txtStoreName'); },
        btnSearch: function () { return $('#btnSearch'); },
        modalUpdate: function () { return $('#modalUpdate'); },
        txtStartDate: function () { return $('#txtStartDate'); },
        txtEndDate: function () { return $('#txtEndDate'); },
        btnClear: function () { return $('#btnClear'); },
    };
    base.Event = {
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Ajax.AjaxGetWholesaleOrderForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                storeName: base.Control.txtStoreName().val(),
                startDateString: base.Control.txtStartDate().val(),
                endDateString: base.Control.txtEndDate().val()
            };
            base.Ajax.AjaxGetWholesaleOrderForAdmin.submit();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Ajax.AjaxGetWholesaleOrderForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                storeName: base.Control.txtStoreName().val(),
                startDateString: base.Control.txtStartDate().val(),
                endDateString: base.Control.txtEndDate().val()
            };
            base.Ajax.AjaxGetWholesaleOrderForAdmin.submit();
        },
        AjaxGetWholesaleOrderForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.orderWholesaleForAdmins);
                }
            }
        },
        AjaxGetDetailWholesaleOrderSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPagesModal = data.data.totalPages;
                    base.Function.FillDataDetailOrderIntoModal(data.data.orderWholesaleDetailByWholesaleOrderIds);
                    base.Control.modalUpdate().modal('show');
                }
            }
        },
        AjaxDeleteOrderWholesaleSuccess: function (data) {
            if (data) {
                if (data.data.status) {
                    Swal.fire("Excelente !!", "El pedido fue eliminado !!", "success")
                    base.Function.GetOrderAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                    base.Function.GetOrderAdmin();
                }
            }
        },
        AjaxApproveOrderWholesaleSuccess: function (data) {
            if (data) {
                if (data.data.status) {
                    Swal.fire("Excelente !!", "El pedido fue aprobado !!", "success")
                    base.Function.GetOrderAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                    base.Function.GetOrderAdmin();
                }
            }
        },
        AjaxApproveShippingStatusSuccess: function (data) {
            if (data) {
                if (data.data.status) {
                    Swal.fire("Excelente !!", "La entrega fue actualizada !!", "success")
                    base.Function.GetOrderAdmin();
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                    base.Function.GetOrderAdmin();
                }
            }
        },
    };
    base.Ajax = {
        AjaxGetWholesaleOrderForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.OrderHistory.Actions.GetWholesaleOrderForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetWholesaleOrderForAdminSuccess
        }),
        AjaxGetDetailWholesaleOrder: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.OrderHistory.Actions.GetDetailWholesaleOrder,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailWholesaleOrderSuccess
        }),
        AjaxApproveOrderWholesale: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.OrderHistory.Actions.ApproveOrderWholesale,
            autoSubmit: false,
            onSuccess: base.Event.AjaxApproveOrderWholesaleSuccess
        }),
        AjaxApproveShippingStatus: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.OrderHistory.Actions.ApproveShippingStatus,
            autoSubmit: false,
            onSuccess: base.Event.AjaxApproveShippingStatusSuccess
        }),
        AjaxDeleteOrderWholesale: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.OrderHistory.Actions.DeleteOrderWholesale,
            autoSubmit: false,
            onSuccess: base.Event.AjaxDeleteOrderWholesaleSuccess
        }),
    };
    base.Function = {
        UpdatePagination: function () {
            base.Control.divPagination().empty();
            base.Control.divPagination().append('<li class="page-item page-indicator"><a class="page-link number-page" href="#" id="prev">«</a></li>');

            if (base.Parameters.totalPages <= 5) {
                for (var i = 1; i <= base.Parameters.totalPages; i++) {
                    base.Control.divPagination().append('<li class="page-item ' + (i === base.Parameters.currentPage ? 'active' : '') + '"><a class="page-link number-page" href="#">' + i + '</a></li>');
                }
            } else {
                var startPage = Math.max(1, base.Parameters.currentPage - 2);
                var endPage = Math.min(base.Parameters.totalPages, base.Parameters.currentPage + 2);

                if (base.Parameters.currentPage >= base.Parameters.totalPages - 2) {
                    startPage = base.Parameters.totalPages - 4;
                }

                if (startPage > 1) {
                    base.Control.divPagination().append('<li class="page-item"><a class="page-link number-page" href="#">1</a></li>');
                    if (startPage > 2) {
                        if (base.Parameters.currentPage != base.Parameters.totalPages) {
                            endPage--;
                        }
                        startPage++;
                        var valueHidden = startPage - 1;
                        base.Control.divPagination().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link number-page" href="#">..</a></li>');
                    }
                }

                for (var i = startPage; i <= endPage; i++) {
                    base.Control.divPagination().append('<li class="page-item ' + (i === base.Parameters.currentPage ? 'active' : '') + '"><a class="page-link number-page" href="#">' + i + '</a></li>');
                }

                if (endPage < base.Parameters.totalPages) {
                    if (endPage < base.Parameters.totalPages - 1) {
                        var valueHidden = endPage + 1;
                        base.Control.divPagination().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link number-page" href="#">..</a></li>');
                    }
                    base.Control.divPagination().append('<li class="page-item"><a class="page-link number-page" href="#">' + base.Parameters.totalPages + '</a></li>');
                }
            }

            base.Control.divPagination().append('<li class="page-item page-indicator"><a class="page-link number-page" href="#" id="next">»</a></li>');
        },
        UpdatePaginationModal: function () {
            base.Control.divPaginationModal().empty();
            base.Control.divPaginationModal().append('<li class="page-item page-indicator"><a class="page-link number-page-modal" href="#" id="prev">«</a></li>');

            if (base.Parameters.totalPagesModal <= 5) {
                for (var i = 1; i <= base.Parameters.totalPagesModal; i++) {
                    base.Control.divPaginationModal().append('<li class="page-item ' + (i === base.Parameters.currentPageModal ? 'active' : '') + '"><a class="page-link number-page-modal" href="#">' + i + '</a></li>');
                }
            } else {
                var startPage = Math.max(1, base.Parameters.currentPageModal - 2);
                var endPage = Math.min(base.Parameters.totalPagesModal, base.Parameters.currentPageModal + 2);

                if (base.Parameters.currentPageModal >= base.Parameters.totalPagesModal - 2) {
                    startPage = base.Parameters.totalPagesModal - 4;
                }

                if (startPage > 1) {
                    base.Control.divPaginationModal().append('<li class="page-item"><a class="page-link number-page-modal" href="#">1</a></li>');
                    if (startPage > 2) {
                        if (base.Parameters.currentPageModal != base.Parameters.totalPagesModal) {
                            endPage--;
                        }
                        startPage++;
                        var valueHidden = startPage - 1;
                        base.Control.divPaginationModal().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link number-page-modal" href="#">..</a></li>');
                    }
                }

                for (var i = startPage; i <= endPage; i++) {
                    base.Control.divPaginationModal().append('<li class="page-item ' + (i === base.Parameters.currentPageModal ? 'active' : '') + '"><a class="page-link number-page-modal" href="#">' + i + '</a></li>');
                }

                if (endPage < base.Parameters.totalPagesModal) {
                    if (endPage < base.Parameters.totalPagesModal - 1) {
                        var valueHidden = endPage + 1;
                        base.Control.divPaginationModal().append('<li class="page-item page-indicator"><a value-hidden="' + valueHidden + '" class="page-link number-page-modal" href="#">..</a></li>');
                    }
                    base.Control.divPaginationModal().append('<li class="page-item"><a class="page-link number-page-modal" href="#">' + base.Parameters.totalPagesModal + '</a></li>');
                }
            }

            base.Control.divPaginationModal().append('<li class="page-item page-indicator"><a class="page-link number-page-modal" href="#" id="next">»</a></li>');
        },
        clsNumberPagination: function () {
            var parentElement = $(document);
            parentElement.on('click', '.number-page', function () {
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
                base.Function.GetOrderAdmin();
            });
        },
        clsNumberPaginationModal: function () {
            var parentElement = $(document);
            parentElement.on('click', '.number-page-modal', function () {
                var page = $(this).text();
                if (page === '«') {
                    if (base.Parameters.currentPageModal > 1) {
                        base.Parameters.currentPageModal--;
                    }
                } else if (page === '»') {
                    if (base.Parameters.currentPageModal < base.Parameters.totalPagesModal) {
                        base.Parameters.currentPageModal++;
                    }
                } else if (page === '..') {
                    base.Parameters.currentPageModal = parseInt($(this).attr('value-hidden'));
                } else {
                    base.Parameters.currentPageModal = parseInt(page);
                }
                base.Function.GetOrderDetailAdmin();
            });
        },
        GetOrderAdmin: function () {
            base.Ajax.AjaxGetWholesaleOrderForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                storeName: base.Control.txtStoreName().val(),
                startDateString: base.Control.txtStartDate().val(),
                endDateString: base.Control.txtEndDate().val()
            };
            base.Ajax.AjaxGetWholesaleOrderForAdmin.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
                var urlVoucher = 'https://api.yosoymitosis.com/StaticFiles/PaymentWholesale/' + data.imageUrl;
                var styleVoucher = data.imageUrl == '' ? "display:none;" : "";
                var styleDelete = data.statusPurchase == 'Realizada' ? "display:none;" : "";
                var styleApprove = data.statusPurchase == 'Pendiente' || data.statusPurchase == 'Realizada' ? "display:none;" : "";
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
                    '<a class="dropdown-item updateData" value="' + data.wholesaleOrderId + '" href="#">Ver Detalle</a>' +
                    '<a class="dropdown-item approveData" style="' + styleApprove + '" value="' + data.wholesaleOrderId + '" href="#">Aprobar Pedido</a>' +
                    '<a class="dropdown-item deleteData" style="' + styleDelete + '" value="' + data.wholesaleOrderId + '" href="#">Eliminar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.wholesaleOrderId + '</strong></td>' +
                    '<td>' + data.storeName + '</td>' +
                    '<td>' + data.registrationDateOrder + '</td>' +
                    '<td>' + data.registrationTimeOrder + '</td>' +
                    '<td>' + data.paymentDateOrder + '</td>' +
                    '<td>' + data.paymentTimeOrder + '</td>' +
                    '<td>' + data.grossAmount + '</td>' +
                    '<td>' + data.netAmount + '</td>' +
                    '<td>' + data.quantity + '</td>' +
                    '<td>' + data.nameTypePurchase + '</td>' +
                    '<td>' + data.statusPurchase + '</td>' +
                    '<td>' + data.shippingStatus + '</td>' +
                    '<td>' + data.typePayment + '</td>' +
                    '<td>' +
                    '<div style="' + styleVoucher + '">' +
                    '<a href = "' + urlVoucher + '" class= "btn btn-primary shadow btn-s sharp me-1" target="_blank">' +
                    '<i class="fa-solid fa-ticket"></i>' +
                    '</a>' +
                    '</div></td>' +
                    '<td class="column-modal">' +
                    '<div class="approveShipping" value="' + data.wholesaleOrderId + '">' +
                    '<a class= "btn btn-success shadow btn-s sharp me-1">' +
                    '<i class="fa-solid flaticon-381-success-2"></i>' +
                    '</a>' +
                    '</div></td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsOrderDetailClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                base.Parameters.currentPageModal = 1;
                var orderId = $(this).attr('value');
                base.Parameters.wholesaleOrderId = orderId;
                base.Ajax.AjaxGetDetailWholesaleOrder.data = {
                    number: base.Parameters.currentPageModal,
                    size: base.Parameters.sizePaginationModal,
                    wholesaleOrderId: orderId
                };
                base.Ajax.AjaxGetDetailWholesaleOrder.submit();
            });
        },
        GetOrderDetailAdmin: function () {
            base.Ajax.AjaxGetDetailWholesaleOrder.data = {
                number: base.Parameters.currentPageModal,
                size: base.Parameters.sizePaginationModal,
                wholesaleOrderId: base.Parameters.wholesaleOrderId
            };
            base.Ajax.AjaxGetDetailWholesaleOrder.submit();
        },
        FillDataDetailOrderIntoModal: function (listDetail) {
            base.Control.tbodyDetailOrder().empty();
            listDetail.forEach(function (data) {
                base.Control.tbodyDetailOrder().append('<tr style="text-align: center;">' +
                    '<td>' + data.productName + '</td>' +
                    '<td><img src="https://api.yosoymitosis.com/StaticFiles/ProductsImg/' + data.imageName + '" style="height: 80px"></td>' +
                    '<td>' + data.quantity + '</td>' +
                    '<td>' + data.subtotalNetAmount + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePaginationModal();
        },
        ClearFilters: function () {
            base.Control.txtStoreName().val("");
            base.Control.txtStartDate().datepicker("setDate", new Date());
            base.Control.txtEndDate().datepicker("setDate", new Date());
        },
        clsDeleteOrderClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.deleteData', function () {
                var orderId = $(this).attr('value');
                Swal.fire({
                    title: "Estás segur@ de eliminar el pedido?",
                    text: "Esto no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, eliminar!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        base.Ajax.AjaxDeleteOrderWholesale.data = {
                            wholesaleOrderId: orderId
                        };
                        base.Ajax.AjaxDeleteOrderWholesale.submit();
                    }
                });
            });
        },
        clsApproveOrderClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.approveData', function () {
                var orderId = $(this).attr('value');
                Swal.fire({
                    title: "Estás segur@ de aprobar el pedido?",
                    text: "Esto no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, aprobar!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        base.Ajax.AjaxApproveOrderWholesale.data = {
                            wholesaleOrderId: orderId
                        };
                        base.Ajax.AjaxApproveOrderWholesale.submit();
                    }
                });
            });
        },
        clsApproveShippingClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.approveShipping', function () {
                var orderId = $(this).attr('value');
                Swal.fire({
                    title: "Estás segur@ de aprobar el despacho del pedido?",
                    text: "Esto no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, aprobar!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        base.Ajax.AjaxApproveShippingStatus.data = {
                            wholesaleOrderId: orderId
                        };
                        base.Ajax.AjaxApproveShippingStatus.submit();
                    }
                });
            });
        },
    };
}