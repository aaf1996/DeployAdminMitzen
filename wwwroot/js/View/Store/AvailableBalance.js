ns('Mitosiz.Site.AvailableBalance.Index')
Mitosiz.Site.AvailableBalance.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Ajax.AjaxGetStores.submit();
        base.Function.clsNumberPagination();
        base.Function.clsUpdtStock();
        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyAvailableBalance'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        slcStoreFilter: function () { return $('#slcStoreFilter'); },
    };
    base.Event = {
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Function.GetAvailableBalance();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Function.GetAvailableBalance();
        },
        AjaxGetAvailableBalanceForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.availableBalanceForAdmin);
                }
            }
        },
        AjaxGetStoresSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcStoreFilter().empty();
                    base.Control.slcStoreFilter().append($('<option>', {
                        value: 0,
                        text: "Seleccione"
                    }));
                    $.each(data.data, function (key, value) {
                        base.Control.slcStoreFilter().append($('<option>', {
                            value: value.storeId,
                            text: value.storeName
                        }));
                    });
                    base.Control.slcStoreFilter().selectpicker('refresh');
                    base.Function.GetAvailableBalance();
                }
            }
        },
        AjaxUpdateAvailableBalanceSuccess: function (data) {
            if (data) {
                base.Function.ShowToastr("El Saldo Disponible fue actualizado");
                base.Function.GetAvailableBalance();
            }
        },
    };
    base.Ajax = {
        AjaxGetAvailableBalanceForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.AvailableBalance.Actions.GetAvailableBalanceForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetAvailableBalanceForAdminSuccess
        }),
        AjaxGetStores: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.AvailableBalance.Actions.GetStores,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetStoresSuccess
        }),
        AjaxUpdateAvailableBalance: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.AvailableBalance.Actions.UpdateAvailableBalance,
            autoSubmit: false,
            onSuccess: base.Event.AjaxUpdateAvailableBalanceSuccess
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
                base.Function.GetAvailableBalance();
            });
        },
        GetAvailableBalance: function () {
            base.Ajax.AjaxGetAvailableBalanceForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                storeId: base.Control.slcStoreFilter().val(),
            };
            base.Ajax.AjaxGetAvailableBalanceForAdmin.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
                base.Control.tbodyTable().append('<tr style="text-align: center;">' +
                    '<td><strong>' + data.availableBalanceId + '</strong></td>' +
                    '<td>' + data.storeName + '</td>' +
                    '<td class="column-modal" id="tdQuantity' + data.storeId + '">' + data.amount + '</td>' +
                    '<td class="column-modal"><input type="text" value="0" style="text-align: center;" class="form-control mb-xl-0 mb-1" id="txtInc' + data.storeId + '"></td>' +
                    '<td class="column-modal"><input type="text" value="0" style="text-align: center;" class="form-control mb-xl-0 mb-1" id="txtDec' + data.storeId + '"></td>' +
                    '<td class="column-modal">' +
                    '<div class="btnUptStock" value="' + data.storeId + '">' +
                    '<a class= "btn btn-primary shadow btn-s sharp me-1">' +
                    '<i class="fa-solid fa-pen-to-square"></i>' +
                    '</a>' +
                    '</div></td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        ClearFilters: function () {
            base.Control.slcStoreFilter().find('option:first').prop('selected', true);
            base.Control.slcStoreFilter().selectpicker('refresh');
        },
        clsUpdtStock: function () {
            var parentElement = $(document);
            parentElement.on('click', '.btnUptStock', function () {
                var storeId = $(this).attr('value');
                base.Ajax.AjaxUpdateAvailableBalance.data = {
                    increase: $('#txtInc' + storeId + '').val(),
                    decrease: $('#txtDec' + storeId + '').val(),
                    storeId: storeId,
                    lastModifierTime: null
                };
                base.Ajax.AjaxUpdateAvailableBalance.submit();
            });
        },
        ShowToastr: function (message) {
            toastr.success("" + message + "", "Excelente", {
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