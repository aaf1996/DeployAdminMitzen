ns('Mitosiz.Site.Network.Index')
Mitosiz.Site.Network.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Control.btnRecalculation().click(base.Event.btnRecalculationClick);
        base.Ajax.AjaxGetPeriods.submit();
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyTable'); },
        txtUserIdFilter: function () { return $('#txtUserIdFilter'); },
        txtNamesFilter: function () { return $('#txtNamesFilter'); },
        slcPeriodFilter: function () { return $('#slcPeriodFilter'); },
        slcProcess: function () { return $('#slcProcess'); },
        slcPeriod: function () { return $('#slcPeriod'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        btnRecalculation: function () { return $('#btnRecalculation'); },
    };
    base.Event = {
        AjaxGetUserNetworkForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.userNetworkForAdmin);
                }
            }
        },
        AjaxRecalculationsPointsSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    $('#loading-area').fadeOut();
                    Swal.fire("Excelente !!", "Recalculo terminado !!", "success");
                    base.Function.GetUserNetworkForAdmin();
                }
            }
        },
        AjaxGeneralRecalculationRangeSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    $('#loading-area').fadeOut();
                    Swal.fire("Excelente !!", "Recalculo terminado !!", "success");
                    base.Function.GetUserNetworkForAdmin();
                }
            }
        },
        AjaxGetPeriodSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcPeriod().empty();
                    base.Control.slcPeriodFilter().empty();
                    $.each(data.data, function (key, value) {
                        base.Control.slcPeriod().append($('<option>', {
                            value: value.networkPeriodId,
                            text: value.periodName
                        }));
                        base.Control.slcPeriodFilter().append($('<option>', {
                            value: value.networkPeriodId,
                            text: value.periodName
                        }));
                    });
                    base.Control.slcPeriod().selectpicker('refresh');
                    base.Control.slcPeriodFilter().selectpicker('refresh');
                    base.Function.GetUserNetworkForAdmin();
                }
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            var userId = (base.Control.txtUserIdFilter().val() == "") ? 0 : parseInt(base.Control.txtUserIdFilter().val());
            base.Ajax.AjaxGetUserNetworkForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                userId: userId,
                networkPeriodId: base.Control.slcPeriodFilter().val(),
                names: base.Control.txtNamesFilter().val()
            };
            base.Ajax.AjaxGetUserNetworkForAdmin.submit();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            var userId = (base.Control.txtUserIdFilter().val() == "") ? 0 : parseInt(base.Control.txtUserIdFilter().val());
            base.Ajax.AjaxGetUserNetworkForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                userId: userId,
                networkPeriodId: base.Control.slcPeriodFilter().val(),
                names: base.Control.txtNamesFilter().val()
            };
            base.Ajax.AjaxGetUserNetworkForAdmin.submit();
        },
        btnRecalculationClick: function () {
            $('#loading-area').fadeIn();
            var process = base.Control.slcProcess().val();
            if (process == "1") {
                base.Ajax.AjaxRecalculationsPoints.data = {
                    networkPeriodId: base.Control.slcPeriod().val()
                };
                base.Ajax.AjaxRecalculationsPoints.submit();
            }
            else if (process == "2") {
                base.Ajax.AjaxGeneralRecalculationRange.data = {
                    networkPeriodId: base.Control.slcPeriod().val()
                };
                base.Ajax.AjaxGeneralRecalculationRange.submit();
            }
        },
    };
    base.Ajax = {
        AjaxGetPeriods: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Network.Actions.GetNetworkPeriodForMLM,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetPeriodSuccess
        }),
        AjaxRecalculationsPoints: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Network.Actions.RecalculationsPoints,
            autoSubmit: false,
            onSuccess: base.Event.AjaxRecalculationsPointsSuccess
        }),
        AjaxGeneralRecalculationRange: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Network.Actions.GeneralRecalculationRange,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGeneralRecalculationRangeSuccess
        }),
        AjaxGetUserNetworkForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.Network.Actions.GetUserNetworkForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetUserNetworkForAdminSuccess
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
                base.Function.GetUserNetworkForAdmin();
            });
        },
        GetUserNetworkForAdmin: function () {
            var userId = (base.Control.txtUserIdFilter().val() == "") ? 0 : parseInt(base.Control.txtUserIdFilter().val());
            base.Ajax.AjaxGetUserNetworkForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                userId: userId,
                networkPeriodId: base.Control.slcPeriodFilter().val(),
                names: base.Control.txtNamesFilter().val()
            };
            base.Ajax.AjaxGetUserNetworkForAdmin.submit();
        },
        FillData: function (listData) {
            base.Control.tbodyTable().empty();
            listData.forEach(function (data) {
                base.Control.tbodyTable().append('<tr style="text-align: center;">' +
                    '<td><strong>' + data.userId + '</strong></td>' +
                    '<td>' + data.names + '</td>' +
                    '<td>' + data.lastName + '</td>' +
                    '<td>' + data.pp + '</td>' +
                    '<td>' + data.elite + '</td>' +
                    '<td>' + data.vp + '</td>' +
                    '<td>' + data.vpa + '</td>' +
                    '<td>' + data.vg + '</td>' +
                    '<td>' + data.vq + '</td>' +
                    '<td>' + data.range + '</td>' +
                    '<td>' + data.maximumRange + '</td>' +
                    '<td>' + data.phone + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        ClearFilters: function () {
            base.Control.txtUserIdFilter().val("");
            base.Control.txtNamesFilter().val("");
            base.Control.slcPeriodFilter().find('option:first').prop('selected', true);
            base.Control.slcPeriodFilter().selectpicker('refresh');
        },
    };
}