ns('Mitosiz.Site.InformationFiles.Index')
Mitosiz.Site.InformationFiles.Index.Controller = function () {
    var base = this;
    base.Initialize = function () {
        base.Function.clsNumberPagination();
        base.Ajax.AjaxGetListFileType.submit();
        base.Function.clsUpdateDataClick();
        base.Function.clsDeleteDataClick();

        base.Control.btnSearch().click(base.Event.btnSearchClick);
        base.Control.btnClear().click(base.Event.btnClearClick);
        base.Control.btnCreateInformationFile().click(base.Event.btnCreateInformationFileClick);
        base.Control.btnUpdateModal().click(base.Event.btnUpdateModalClick);
        base.Control.btnCreateModal().click(base.Event.btnCreateModalClick);
    };
    base.Parameters = {
        currentPage: 1,
        totalPages: 1,
        sizePagination: 10,
        informationFileId: 0,
        oldFileName: ''
    };
    base.Control = {
        divPagination: function () { return $('#pagination'); },
        tbodyTable: function () { return $('#tbodyInformation'); },
        slcFileTypeFilter: function () { return $('#slcFileTypeFilter'); },
        txtDescriptionFilter: function () { return $('#txtDescriptionFilter'); },
        btnSearch: function () { return $('#btnSearch'); },
        btnClear: function () { return $('#btnClear'); },
        modalSave: function () { return $('#modalSave'); },
        btnCreateInformationFile: function () { return $('#btnCreateInformationFile'); },
        btnUpdateModal: function () { return $('#btnUpdateModal'); },
        btnCreateModal: function () { return $('#btnCreateModal'); },
        txtDescription: function () { return $('#txtDescription'); },
        slcActive: function () { return $('#slcActive'); },
        slcFileType: function () { return $('#slcFileType'); },
        txtFileName: function () { return $('#txtFileName'); },
    };
    base.Event = {
        AjaxGetListFileTypeSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Control.slcFileTypeFilter().empty();
                    base.Control.slcFileTypeFilter().append($('<option>', {
                        value: 0,
                        text: "Seleccione"
                    }));
                    $.each(data.data, function (key, value) {
                        base.Control.slcFileTypeFilter().append($('<option>', {
                            value: value.fileTypeId,
                            text: value.description
                        }));
                    });
                    base.Control.slcFileTypeFilter().selectpicker('refresh');

                    base.Control.slcFileType().empty();
                    $.each(data.data, function (key, value) {
                        base.Control.slcFileType().append($('<option>', {
                            value: value.fileTypeId,
                            text: value.description
                        }));
                    });
                    base.Control.slcFileType().selectpicker('refresh');

                    base.Function.GetInformationFilesForAdmin();
                }
            }
        },
        AjaxGetInformationFilesForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Parameters.totalPages = data.data.totalPages;
                    base.Function.FillData(data.data.informationFilesForAdmin);
                }
            }
        },
        AjaxGetDetailInformationFilesForAdminSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    base.Function.FillDataModal(data.data);
                    base.Control.modalSave().modal('show');
                }
            }
        },
        AjaxDeleteInformationFilesSuccess: function (data) {
            if (data) {
                if (data.isSuccess) {
                    Swal.fire("Excelente !!", "El Archivo fue eliminado !!", "success")
                }
                else {
                    Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                }
                base.Function.GetInformationFilesForAdmin();
            }
        },
        btnSearchClick: function () {
            base.Parameters.currentPage = 1;
            base.Function.GetInformationFilesForAdmin();
        },
        btnClearClick: function () {
            base.Function.ClearFilters();
            base.Parameters.currentPage = 1;
            base.Function.GetInformationFilesForAdmin();
        },
        btnUpdateModalClick: function () {
            var formData = new FormData();
            var fileNameUpdate = base.Parameters.oldFileName;
            var fileInput = $('#txtFileName')[0].files[0];
            if (fileInput) {
                formData.append('file', fileInput);
                fileNameUpdate = fileInput.name;
            }
            formData.append('informationFilesId', base.Parameters.informationFileId);
            formData.append('active', base.Control.slcActive().val());
            formData.append('description', base.Control.txtDescription().val());
            formData.append('fileTypeId', base.Control.slcFileType().val());
            formData.append('oldFileName', base.Parameters.oldFileName);
            formData.append('fileName', fileNameUpdate);

            $.ajax({
                url: Mitosiz.Site.InformationFiles.Actions.UpdateInformationFiles,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data) {
                        if (data.isSuccess) {
                            base.Control.txtFileName().val('');
                            Swal.fire("Excelente !!", "El archivo fue actualizado !!", "success")
                            base.Control.modalSave().modal('hide');
                            base.Function.GetInformationFilesForAdmin();
                        }
                        else {
                            Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('Upload failed:', textStatus, errorThrown);
                }
            });
        },
        btnCreateModalClick: function () {
            var formData = new FormData();
            var fileNameInsert = "";
            var fileInput = $('#txtFileName')[0].files[0];
            if (fileInput) {
                formData.append('file', fileInput);
                fileNameInsert = fileInput.name;
            }
            formData.append('active', base.Control.slcActive().val());
            formData.append('description', base.Control.txtDescription().val());
            formData.append('fileTypeId', base.Control.slcFileType().val());
            formData.append('fileName', fileNameInsert);

            $.ajax({
                url: Mitosiz.Site.InformationFiles.Actions.SaveInformationFiles,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data) {
                        if (data.isSuccess) {
                            base.Control.txtFileName().val('');
                            Swal.fire("Excelente !!", "El archivo fue registrado !!", "success")
                            base.Control.modalSave().modal('hide');
                            base.Function.GetInformationFilesForAdmin();
                        }
                        else {
                            Swal.fire("Oops...", "Ocurrió un error, Por favor intententelo nuevamente", "error")
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('Upload failed:', textStatus, errorThrown);
                }
            });
        },
        btnCreateInformationFileClick: function () {
            base.Control.txtDescription().val("");
            base.Control.slcActive().val("true");
            base.Control.slcActive().selectpicker('refresh');
            base.Control.slcFileType().find('option:first').prop('selected', true);
            base.Control.slcFileType().selectpicker('refresh');
            base.Control.txtFileName().val("");

            base.Control.btnUpdateModal().hide();
            base.Control.btnCreateModal().show();
            base.Control.modalSave().modal('show');
        },
    };
    base.Ajax = {
        AjaxGetListFileType: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.InformationFiles.Actions.GetListFileType,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetListFileTypeSuccess
        }),
        AjaxGetInformationFilesForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.InformationFiles.Actions.GetInformationFilesForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetInformationFilesForAdminSuccess
        }),
        AjaxGetDetailInformationFilesForAdmin: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.InformationFiles.Actions.GetDetailInformationFilesForAdmin,
            autoSubmit: false,
            onSuccess: base.Event.AjaxGetDetailInformationFilesForAdminSuccess
        }),
        AjaxDeleteInformationFiles: new Mitosiz.Site.UI.Web.Components.Ajax({
            action: Mitosiz.Site.InformationFiles.Actions.DeleteInformationFiles,
            autoSubmit: false,
            onSuccess: base.Event.AjaxDeleteInformationFilesSuccess
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
                base.Function.GetInformationFilesForAdmin();
            });
        },
        GetInformationFilesForAdmin: function () {
            base.Ajax.AjaxGetInformationFilesForAdmin.data = {
                number: base.Parameters.currentPage,
                size: base.Parameters.sizePagination,
                typeFileId: base.Control.slcFileTypeFilter().val(),
                description: base.Control.txtDescriptionFilter().val()
            };
            base.Ajax.AjaxGetInformationFilesForAdmin.submit();
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
                    '<a class="dropdown-item updateData" value="' + data.informationFilesId + '" href="#">Actualizar</a>' +
                    '<a class="dropdown-item deleteData" value="' + data.informationFilesId + '" href="#">Eliminar</a>' +
                    '</div>' +
                    '</div></td>' +
                    '<td><strong>' + data.informationFilesId + '</strong></td>' +
                    '<td>' + data.description + '</td>' +
                    '<td>' + data.fileType + '</td>' +
                    '<td>' + status + '</td>' +
                    '</tr>');
            });
            base.Function.UpdatePagination();
        },
        clsUpdateDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.updateData', function () {
                var informationFilesId = $(this).attr('value');
                base.Control.btnUpdateModal().show();
                base.Control.btnCreateModal().hide();
                base.Ajax.AjaxGetDetailInformationFilesForAdmin.data = {
                    informationFilesId: informationFilesId
                };
                base.Ajax.AjaxGetDetailInformationFilesForAdmin.submit();
            });
        },
        clsDeleteDataClick: function () {
            var parentElement = $(document);
            parentElement.on('click', '.deleteData', function () {
                var informationFilesId = $(this).attr('value');
                base.Ajax.AjaxDeleteInformationFiles.data = {
                    informationFilesId: informationFilesId
                };
                base.Ajax.AjaxDeleteInformationFiles.submit();
            });
        },
        FillDataModal: function (data) {
            base.Control.txtDescription().val(data.description);
            base.Control.slcActive().val(data.active.toString());
            base.Control.slcActive().selectpicker('refresh');
            base.Control.slcFileType().val(data.fileTypeId);
            base.Control.slcFileType().selectpicker('refresh');
            base.Parameters.oldFileName = data.fileName;
            base.Parameters.informationFileId = data.informationFilesId;
        },
        ClearFilters: function () {
            base.Control.slcFileTypeFilter().find('option:first').prop('selected', true);
            base.Control.slcFileTypeFilter().selectpicker('refresh');
            base.Control.txtDescriptionFilter().val("");
        },
    };
}