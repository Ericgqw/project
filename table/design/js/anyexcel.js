var Report = function () {
};
var report = new Report();
var Content = function () {
    this.contentType = 1;
    this.disType = 0;
    this.joinType = 0;
    this.getOrCreateBarCode = function () {
        if (this.barCode == undefined) {
            this.barCode = {}
        }
        return this.barCode
    };
    this.getBarCode = function () {
        return this.barCode
    };
    this.available = function () {
        return this.cellLinked || this.cellImageLinked || this.conditionFormat || this.linkages || this.cellLines || this.dataFilter || this.dataBar || this.diffBar || this.orderBy
    };
    this.setColumnTypeFlag = function (B, A) {
        if (A) {
            this.columnType = this.columnType | (1 << B)
        } else {
            this.columnType = (~(1 << B)) & this.columnType
        }
    };
    this.isGroup = function () {
        var F = (1 << 4) & this.columnType;
        if (F != 0) {
            var D = (1 << 5) & this.columnType;
            var B = (1 << 6) & this.columnType;
            var E = (1 << 7) & this.columnType;
            var C = (1 << 8) & this.columnType;
            var A = (1 << 9) & this.columnType;
            if (D != 0 || B != 0 || E != 0 || C != 0 || A != 0) {
                return false
            }
            return true
        }
        return false
    };
    this.isSum = function () {
        var D = (1 << 5) & this.columnType;
        var B = (1 << 6) & this.columnType;
        var E = (1 << 7) & this.columnType;
        var C = (1 << 8) & this.columnType;
        var A = (1 << 9) & this.columnType;
        if (D != 0 || B != 0 || E != 0 || C != 0 || A != 0) {
            return true
        }
        return false
    };
    this.initChart = function () {
        var E = this.chartType;
        var F = {};
        var C = {};
        var A = {};
        var H = {};
        var D = {};
        var I = {};
        var B = {};
        F.enable3D = Utils.isChart3D(E);
        if (Utils.isXAxisTimeType(E)) {
            C.type = Constant.AXIS_TYPE_DATETIME
        }
        if (Utils.isXAxisNumberType(E)) {
            C.type = Constant.AXIS_TYPE_NUMBER
        }
        if (Utils.isYAxisNumberType(E)) {
            A.type = Constant.AXIS_TYPE_NUMBER
        }
        if (Utils.isYAxisCategory(E)) {
            A.type = Constant.AXIS_TYPE_CATEGORY
        }
        if (Utils.isRightYAxisNumberType(E)) {
            H.type = Constant.AXIS_TYPE_NUMBER
        }
        if (Utils.isPieHalf(E)) {
            D.startAngle = 180;
            D.endAngle = 360
        }
        if (Utils.isDonut(E)) {
            F.type = "donut"
        }
        if (E == Constant.FUNNEL_UP || E == Constant.FUNNEL_UP_3D) {
            F.layout = "up"
        }
        if (E == Constant.RADAR || E == Constant.RADAR_AREA) {
            var G = {};
            G.enabled = false
        }
        if (E == Constant.COLUMN_DIFF) {
            I.enabled = false
        }
        if (E == Constant.SCATTER_MAP) {
            F.backgroundColor = "#404a59";
            B.areaLabelEnable = false;
            B.areaColor = "#323c48";
            B.areaLineColor = "#111";
            B.roam = true;
            B.visualEnabled = false
        }
        if (E == Constant.TREE_MAP) {
            I.enabled = false
        }
        F.type = Utils.getChartTypeName(E);
        this.chart = F;
        this.xAxis = C;
        this.yAxis = A;
        this.yRightAxis = H;
        this.series = D;
        this.legend = I;
        this.map = B
    }
};
var AnyExcel = function () {
};
var tableGrid = null;
var tableIdx = 0;
String.prototype.endWith = function (A) {
    if (A == null || A == "" || this.length == 0 || A.length > this.length) {
        return false
    }
    if (this.substring(this.length - A.length) == A) {
        return true
    } else {
        return false
    }
    return true
};
var colorInput = "<div class='sp-replacer'><div class='sp-preview'><div class='sp-preview-inner'></div></div><div class='sp-dd'>&#9660;</div></div>";
AnyExcel.prototype = {
    init: function () {
        var G = this;
        $("#cell-bg").spectrum({
            allowEmpty: false,
            clearText: "清除",
            color: "#fff",
            showInput: true,
            containerClassName: "full-spectrum",
            showInitial: true,
            showPalette: true,
            showSelectionPalette: true,
            maxPaletteSize: 10,
            preferredFormat: "hex",
            chooseText: "确定",
            cancelText: "取消",
            replaceInput: "<a href=''><i class='icon iconfont icon-caret-down-s icon-size-14'></i></a>",
            change: function (H) {
                $(".cell-bg").css("color", H);
                G.backgroundColor()
            },
            clear: function () {
                $(".cell-bg").removeAttr("style");
                G.backgroundColor()
            },
            cancel: function (H) {
                $(".cell-bg").css("color", H);
                G.backgroundColor()
            },
            palette: PALETTE
        });
        $("#cell-font-color").spectrum({
            allowEmpty: false,
            clearText: "清除",
            color: "#000000",
            showInput: true,
            containerClassName: "full-spectrum",
            showInitial: true,
            showPalette: true,
            showSelectionPalette: true,
            maxPaletteSize: 10,
            preferredFormat: "hex",
            chooseText: "确定",
            cancelText: "取消",
            replaceInput: "<a href=''><i class='icon iconfont icon-caret-down-s icon-size-14'></i></a>",
            change: function (H) {
                $(".cell-font-color").css("color", H);
                G.fontColor()
            },
            clear: function () {
                $(".cell-font-color").removeAttr("style");
                G.fontColor()
            },
            cancel: function (H) {
                $(".cell-font-color").css("color", H);
                G.fontColor()
            },
            palette: PALETTE
        });
        $("#colorpick-border-color").spectrum({
            allowEmpty: false,
            clearText: "清除",
            color: "#000000",
            showInput: true,
            containerClassName: "full-spectrum",
            showInitial: true,
            showPalette: true,
            showSelectionPalette: true,
            maxPaletteSize: 10,
            preferredFormat: "hex",
            chooseText: "确定",
            cancelText: "取消",
            replaceInput: "<a href='javascript:void(0)'><i class='icon iconfont icon-borderColor fa-lg icon-size-16 colorpick-border-color-demo'></i>线条颜色</a>",
            change: function (H) {
                $(".colorpick-border-color-demo").css("color", H);
                $("li.tl-border-color").attr("color", H)
            },
            clear: function () {
                $(".colorpick-border-color-demo").removeAttr("style");
                $("li.tl-border-color").attr("color", "#000000")
            },
            cancel: function (H) {
                $(".colorpick-border-color-demo").css("color", H);
                $("li.tl-border-color").attr("color", H)
            },
            palette: PALETTE
        });
        $("li.tl-font-bold").click(function () {
            if ($(this).hasClass("tl-hover")) {
                $(this).removeClass("tl-hover");
                G.getGrid().font(0, false)
            } else {
                $(this).addClass("tl-hover");
                G.getGrid().font(0, true)
            }
        });
        $("li.tl-font-italic").click(function () {
            if ($(this).hasClass("tl-hover")) {
                $(this).removeClass("tl-hover");
                G.getGrid().font(1, false)
            } else {
                $(this).addClass("tl-hover");
                G.getGrid().font(1, true)
            }
        });
        $("li.tl-font-underline").click(function () {
            if ($(this).hasClass("tl-hover")) {
                $(this).removeClass("tl-hover");
                G.getGrid().font(2, false)
            } else {
                $(this).addClass("tl-hover");
                G.getGrid().font(2, true)
            }
        });
        $("li.tl-font-color").click(function () {
            G.fontColor()
        });
        $("li.tl-background-color").click(function () {
            G.backgroundColor()
        });
        $("li.tl-fontsize").find("select").change(function () {
            var H = $(this).val();
            G.fontSize(parseInt(H))
        });
        $(".tl-align-left").click(function () {
            G.clearAlignStyle();
            $(this).addClass("tl-hover");
            G.getGrid().align("left")
        });
        $(".tl-align-center").click(function () {
            G.clearAlignStyle();
            $(this).addClass("tl-hover");
            G.getGrid().align("center")
        });
        $(".tl-align-right").click(function () {
            G.clearAlignStyle();
            $(this).addClass("tl-hover");
            G.getGrid().align("right")
        });
        $(".tl-valign-top").click(function () {
            G.clearValignStyle();
            $(this).addClass("tl-hover");
            G.getGrid().valign("top")
        });
        $(".tl-valign-middle").click(function () {
            G.clearValignStyle();
            $(this).addClass("tl-hover");
            G.getGrid().valign("middle")
        });
        $(".tl-valign-bottom").click(function () {
            G.clearValignStyle();
            $(this).addClass("tl-hover");
            G.getGrid().valign("bottom")
        });
        $("li.tl-cell-line").click(function () {
            if ($(this).hasClass("tl-hover")) {
                $(this).removeClass("tl-hover")
            } else {
                $(this).addClass("tl-hover")
            }
        });
        $("li.tl-border-color").click(function () {
            var K = $(this).attr("val");
            var J = $(this).attr("color");
            var I = $(this).attr("bstyle") != undefined ? $(this).attr("bstyle") : "solid";
            var H = $(this).attr("bwidth") != undefined ? $(this).attr("bwidth") : 1;
            G.getGrid().cellAreaBorderColor(K, J, I, H)
        });
        $("li.tl-border li").click(function () {
            var I = $(this).attr("val");
            if (I == 8) {
                layer.open({
                    type: 1,
                    title: "线条样式设置",
                    zIndex: 1025,
                    shadeClose: true,
                    shade: false,
                    area: ["420px", "320px"],
                    content: $("#win-border-style"),
                    btn: ["确定", "取消"],
                    yes: function (P) {
                        var O = $("li.tl-border-color");
                        var L = $("#win-border-style").find("table");
                        var K = L.find("tr:eq(0)");
                        var N = K.find("select").val();
                        var J = L.find("tr:eq(1)");
                        var M = J.find("input").val();
                        O.attr("bstyle", N);
                        O.attr("bwidth", M);
                        $("li.tl-border-color").trigger("click");
                        layer.close(P)
                    },
                    success: function () {
                        var O = $("li.tl-border-color");
                        var N = O.attr("bstyle") != undefined ? O.attr("bstyle") : "solid";
                        var M = O.attr("bwidth") != undefined ? O.attr("bwidth") : 1;
                        var L = $("#win-border-style").find("table");
                        var K = L.find("tr:eq(0)");
                        K.find("select").selectpicker("val", N);
                        var J = L.find("tr:eq(1)");
                        J.find("input").val(M)
                    }
                })
            } else {
                var H = $(this).find("i").attr("class");
                $("li.tl-border-color i").attr("class", H);
                $("li.tl-border-color").attr("val", I);
                $("li.tl-border-color").trigger("click")
            }
        });
        $(".cell-merge").click(function () {
            var H = $(".cell-merge").parent("li");
            if (H.hasClass("tl-hover")) {
                G.getGrid().divideCell();
                H.removeClass("tl-hover")
            } else {
                G.getGrid().mergeCell();
                H.addClass("tl-hover")
            }
        });
        $("li.tl-cell-clear").click(function () {
            G.getGrid().clear()
        });
        $(".tl-insert-row").click(function () {
            G.getGrid().insertRow()
        });
        $(".tl-insert-col").click(function () {
            G.getGrid().insertColumn()
        });
        $(".tl-add-row").click(function () {
            G.getGrid().newAddRow()
        });
        $(".tl-add-col").click(function () {
            G.getGrid().newAddColumn()
        });
        $("li.tl-delete-row").click(function () {
            G.getGrid().deleteRow()
        });
        $("li.tl-delete-col").click(function () {
            G.getGrid().deleteCol()
        });
        $(".tab-report-arg").on("shown.bs.tab", function (I) {
            argGrid.syncGridDivs();
            argGrid.syncArgGrips();
            var H = $("#right-metis-menu").children("li");
            H.hide();
            $(H[5]).show();
            $(H[6]).show();
            $(".page-arg").show();
            $(".page-report").hide()
        });
        $(".tab-report-list").on("shown.bs.tab", function (I) {
            var H = $("#right-metis-menu").children("li");
            H.hide();
            $(H[0]).show();
            $(".page-arg").hide();
            $(".page-report").show()
        });
        $("#text-cell-content").keyup(function (I) {
            var H = G.getSelectGridCell();
            if (H == null) {
                return false
            }
            H.setText($(this).val())
        });
        var D = null;
        var E = null;
        var F = function (J) {
            if (D == null) {
                return false
            }
            var I = D.scrollTop();
            var H = D.scrollLeft();
            if (E) {
                E.css({"top": (J.clientY + I + 3) + "px", "left": (J.clientX + H + 3) + "px"})
            }
            return false
        };
        var B = function (O) {
            if (D == null) {
                return false
            }
            D.unbind("mousemove").unbind("mouseup");
            E.remove();
            var R = parseInt(D.type);
            var P = $(O.target);
            var Q = null;
            if (P.is("td")) {
                Q = P
            } else {
                if (P.is("span")) {
                    var J = P.parent().parent().parent();
                    if (J.is("td")) {
                        Q = J;
                        P.remove()
                    }
                } else {
                    if (P.parent().parent().is("td")) {
                        Q = P.parent().parent()
                    }
                }
            }
            if (Q != null) {
                var U = Q.data("gc");
                if (U.rowNum > 0 && U.colNum > 0) {
                    if (Q.find("div.sv").length == 0) {
                        var I = $("<div></div>").css("overflow", "hidden").width(Q.width()).height(Q.height());
                        var T = $("<div></div>").addClass("sv").width(Q.width()).height(Q.height()).appendTo(I);
                        Q.append(I)
                    }
                    U.mark = 2;
                    U.content["editStyle"] = R;
                    if (TYPE == "app") {
                        var N = U.content;
                        N.width = 100;
                        N.widthUnit = "%"
                    }
                    if (R == 18) {
                        var S = grid.getHtmlCells();
                        layer.open({
                            type: 1,
                            title: "选择显示的列",
                            zIndex: 1025,
                            shadeClose: true,
                            shade: false,
                            area: ["380px", "330px"],
                            content: $("#win-select-column"),
                            btn: ["确定", "取消"],
                            yes: function (Z) {
                                var X = $("#win-select-column").find("table");
                                var Y = new Array();
                                X.find("tr:gt(1)").each(function () {
                                    var d = $(this);
                                    var c = d.find("td:eq(0)");
                                    var b = d.find("td:eq(1)");
                                    var a = d.find("td:eq(2)");
                                    if (b.find("input").is(":checked")) {
                                        Y.push({
                                            text: c.html(),
                                            colNum: b.find("input").val(),
                                            columnSelected: a.find("input").is(":checked")
                                        })
                                    }
                                });
                                A(Y, U);
                                layer.close(Z)
                            },
                            success: function () {
                                var Y = $("#win-select-column").find("table");
                                Y.find("tr:gt(1)").remove();
                                var X = Y.find("tr:eq(1)");
                                for (var b = 0; b < S.length; b++) {
                                    var a = S[b];
                                    var c = X.clone().show();
                                    Y.append(c);
                                    c.find("td:eq(0)").append(a.text);
                                    var Z = a.colNum;
                                    c.find("input[type=checkbox]").attr("value", Z).iCheck({checkboxClass: "icheckbox_minimal"})
                                }
                            }
                        });
                        return false
                    }
                    var M = G.createComponent(R);
                    if (R == 2 || R == 10) {
                        M.width(160).height(26);
                        Q.find("div.sv").empty().append(M)
                    } else {
                        if (R == 3) {
                            M.width(160).height(26);
                            Q.find("div.sv").empty().append(M);
                            U.content["dataType"] = 5;
                            anyExcel.initDate(M)
                        } else {
                            if (R == 5 || R == 6) {
                                Q.find("div.sv").append(M)
                            } else {
                                if (R == 9) {
                                    Q.find("div.sv").append(M);
                                    var V = parseInt(D.subType);
                                    var W = "";
                                    if (V == 20) {
                                        W = "查询"
                                    } else {
                                        if (V == 21) {
                                            W = "重置"
                                        } else {
                                            W = ""
                                        }
                                    }
                                    M.attr("value", W);
                                    var K = U.content.data ? U.content.data : {};
                                    var L = K.datas ? K.datas : new Array();
                                    var H = {};
                                    H.type = V;
                                    L.push(H);
                                    K.datas = L;
                                    U.content.data = K
                                } else {
                                    M.width(160).height(26);
                                    Q.find("div.sv").empty().append(M)
                                }
                            }
                        }
                    }
                }
            }
            D = null
        };
        var A = function (L, V) {
            var S = V.rowNum;
            var I = V.colNum;
            var T = 0;
            for (var O = 0; O < L.length; O++) {
                var N = L[O];
                var P = $("<input type='checkbox'>");
                if (T == 6) {
                    S++;
                    I = 1
                }
                var J = argGrid.getGridCell(S - 1, I - 1, 1, 1);
                var K = $(J.o);
                J.mark = 2;
                var Q = J.content;
                Q.editStyle = 18;
                Q.name = "_select-column";
                if (N.columnSelected) {
                    Q.defaultValue = N.colNum
                }
                Q.dataType = 2;
                var M = Q.data ? Q.data : {};
                var R = {};
                R[N.colNum] = N.text;
                M.dataMap = R;
                Q.data = M;
                if (K.find("div.sv").length == 0) {
                    var H = $("<div></div>").css("overflow", "hidden").width(K.width()).height(K.height());
                    var U = $("<div></div>").addClass("sv").width(K.width()).height(K.height()).appendTo(H);
                    K.append(H)
                }
                K.find("div.sv").append(P);
                T++;
                I++
            }
        };
        $("#arg-component").find("li").mousedown(function (H) {
            D = $(document);
            D.bind("mousemove", F);
            D.bind("mouseup", B);
            var I = $(this).text();
            D.type = $(this).attr("type");
            D.subType = $(this).attr("subType");
            E = $("<span class='dragUL'>" + I + "</span>");
            E.appendTo("body");
            if (H.preventDefault) {
                H.preventDefault()
            }
        });
        $("ul.tl-insert-arg").find("li").click(function () {
            var N = $(this).attr("ctype");
            var P = anyExcel.getGrid().selectedGridCell;
            if (P != null) {
                P.mark = 2;
                P.content["editStyle"] = N;
                var M = anyExcel.getGrid().findTd(P.rowNum, P.colNum);
                if (M.find("div.sv").length == 0) {
                    var I = $("<div></div>").css("overflow", "hidden").width(M.width()).height(M.height());
                    var O = $("<div></div>").addClass("sv").width(M.width()).height(M.height()).appendTo(I);
                    M.append(I)
                }
                var L = anyExcel.createComponent(N);
                if (N == 2 || N == 10) {
                    L.width(160).height(26);
                    M.find("div.sv").empty().append(L)
                } else {
                    if (N == 3) {
                        L.width(160).height(26);
                        M.find("div.sv").empty().append(L);
                        P.content["dataType"] = 5;
                        anyExcel.initDate(L)
                    } else {
                        if (N == 5 || N == 6) {
                            M.find("div.sv").append(L)
                        } else {
                            if (N == 9) {
                                M.find("div.sv").append(L);
                                var Q = D ? parseInt(D.subType) : 0;
                                var R = "";
                                if (Q == 20) {
                                    R = "查询"
                                } else {
                                    if (Q == 21) {
                                        R = "重置"
                                    } else {
                                        R = ""
                                    }
                                }
                                L.attr("value", R);
                                var J = P.content.data ? P.content.data : {};
                                var K = J.datas ? J.datas : new Array();
                                var H = {};
                                H.type = Q;
                                K.push(H);
                                J.datas = K;
                                P.content.data = J
                            } else {
                                L.width(160).height(26);
                                M.find("div.sv").empty().append(L)
                            }
                        }
                    }
                }
            }
        });
        if (TYPE == "app") {
            var C = report.reportArg != undefined ? report.reportArg : {};
            C.relative = 2;
            report.reportArg = C;
            report.relative = 2
        }
        $("#right-metis-menu").metisMenu();
        this.initWin()
    }, initWin: function () {
        function A() {
            setTimeout(function () {
                $("input.color-select").each(function () {
                    var B = $(this).attr("default") ? $(this).attr("default") : "#000000";
                    $(this).spectrum({
                        allowEmpty: true,
                        clearText: "清除",
                        color: B,
                        showInput: true,
                        showInitial: true,
                        showPalette: true,
                        showSelectionPalette: true,
                        maxPaletteSize: 10,
                        preferredFormat: "hex",
                        chooseText: "确定",
                        cancelText: "取消",
                        change: function (C) {
                            $(this).val(C).trigger("change")
                        },
                        clear: function () {
                            $(this).val("transparent").trigger("change");
                            $(this).spectrum("set", null)
                        },
                        cancel: function (C) {
                            $(this).val(C).trigger("change")
                        },
                        replaceInput: colorInput,
                        palette: PALETTE
                    })
                })
            }, 100)
        }

        A()
    }
};
AnyExcel.prototype.setToolMenuStyle = function (C) {
    if (this.getGrid().isMergeFlag()) {
        $(".cell-merge").parent("li").addClass("tl-hover")
    } else {
        $(".cell-merge").parent("li").removeClass("tl-hover")
    }
    if (C.hasClass("bold")) {
        $("li.tl-font-bold").addClass("tl-hover")
    } else {
        $("li.tl-font-bold").removeClass("tl-hover")
    }
    if (C.hasClass("italic")) {
        $("li.tl-font-italic").addClass("tl-hover")
    } else {
        $("li.tl-font-italic").removeClass("tl-hover")
    }
    if (C.hasClass("underline")) {
        $("li.tl-font-underline").addClass("tl-hover")
    } else {
        $("li.tl-font-underline").removeClass("tl-hover")
    }
    $("li.tl-fontsize").find("select").selectpicker("val", 12);
    var F = C.attr("style");
    if (F != undefined && F != "") {
        var M = F.split(";");
        for (var O = 0; O < M.length; O++) {
            if (M[O] == "" || M[O].indexOf("font-size") == -1) {
                continue
            }
            var J = M[O].split(":")[1];
            var H = $.trim(J.substring(0, J.length - 2));
            $("li.tl-fontsize").find("select").selectpicker("val", parseInt(H))
        }
    }
    var B = C.attr("align");
    var G = $("li.tl-align-left");
    var E = $("li.tl-align-center");
    var Q = $("li.tl-align-right");
    G.removeClass("tl-hover");
    E.removeClass("tl-hover");
    Q.removeClass("tl-hover");
    if (B == "left") {
        G.addClass("tl-hover")
    } else {
        if (B == "center") {
            E.addClass("tl-hover")
        } else {
            if (B == "right") {
                Q.addClass("tl-hover")
            }
        }
    }
    var K = C.attr("valign");
    var N = $("li.tl-valign-top");
    var A = $("li.tl-valign-middle");
    var L = $("li.tl-valign-bottom");
    N.removeClass("tl-hover");
    A.removeClass("tl-hover");
    L.removeClass("tl-hover");
    if (K == "top") {
        N.addClass("tl-hover")
    } else {
        if (K == "middle") {
            A.addClass("tl-hover")
        } else {
            if (K == "bottom") {
                L.addClass("tl-hover")
            }
        }
    }
    var R = C.data("gc");
    var P = R.content["formatId"];
    var I = $("select.tl-data-format-select");
    anyExcel.setSelectFormat(I, P);
    var D = C.find("span");
    if (D.length > 0 && R.mark != 7 && R.mark != 8) {
        $("#text-cell-content").val(D.text())
    } else {
        $("#text-cell-content").val("")
    }
};
AnyExcel.prototype.setSelectFormat = function (A, C) {
    if (C == undefined || C == "") {
        A.selectpicker("val", "0");
        return
    }
    if (A.find("option[value=" + C + "]").length > 0) {
        A.selectpicker("val", C)
    } else {
        var B = $("<option value='" + C + "' selected='selected'>" + formats[C] + "</option>");
        A.append(B);
        A.selectpicker("refresh")
    }
};
AnyExcel.prototype.setRightProperty = function (AE) {
    var AF = $(".tab-report-arg").attr("aria-expanded");
    if (AF == "true") {
        return
    }
    var AH = AE.data("gc");
    var AM = AH.mark;
    var p = AH.content;
    var L = $("#right-metis-menu").children("li");
    L.hide();
    divCoor.unselected();
    $(L[0]).show();
    if (AM != 3 && AM != 7 && AM != 8) {
        if (!$(L[0]).hasClass("active")) {
            $(L[0]).children("a").trigger("click")
        }
    }
    $(L[8]).show();
    $("#right-property-cell-html").hide();
    $("#right-property-cell-logic").hide();
    $("#right-property-cell-barcode").hide();
    var q = p.contentType != undefined ? p.contentType : 1;
    if (q == 2) {
        $("#right-property-cell-html").show();
        $("#right-property-cell-html textarea").val(Utils.getString(p.expression))
    } else {
        if (q == 3) {
            var j = $("#right-property-cell-logic");
            j.find("tr:gt(2)").remove();
            $("#right-property-cell-logic").show();
            var AO = p.logicMap;
            if (AO != undefined) {
                for (var AD in AO) {
                    this.appendCellLogicMap(AD, AO[AD])
                }
            }
        } else {
            if (q == 5) {
                $("#right-property-cell-barcode").selectpicker("val", "Code 128");
                $("#right-property-cell-barcode-height").val("50");
                $("#right-property-cell-barcode-width").val("200");
                $("#right-property-cell-barcode").show();
                var AI = p.getBarCode();
                if (AI != undefined) {
                    var AL = $("#right-property-cell-barcode");
                    var M = AL.find("tr:eq(0)");
                    var u = AI.type ? AI.type : "Code 128";
                    M.find("select").selectpicker("val", u);
                    var AJ = AL.find("tr:eq(1)");
                    if (AI["textEnabled"] != undefined) {
                        var x = AI["textEnabled"] == 0 ? "uncheck" : "check";
                        AJ.find("input").iCheck(x)
                    } else {
                        AJ.find("input").iCheck("uncheck")
                    }
                    var I = AL.find("tr:eq(2)");
                    var P = AI.height != undefined ? AI.height : 50;
                    I.find("input").val(P);
                    var C = AL.find("tr:eq(3)");
                    var AQ = AI.width != undefined ? AI.width : 200;
                    C.find("input").val(AQ)
                }
            }
        }
    }
    $("#right-property-cell-ctype").selectpicker("val", q);
    if (p.disType) {
        $("#right-property-cell-disType").selectpicker("val", p.disType)
    } else {
        $("#right-property-cell-disType").selectpicker("val", 0)
    }
    if (p.joinType) {
        $("#right-property-cell-joinType").selectpicker("val", p.joinType)
    } else {
        $("#right-property-cell-joinType").selectpicker("val", 0)
    }
    if (p.treeType) {
        $("#right-property-cell-treeType").selectpicker("val", p.treeType)
    } else {
        $("#right-property-cell-treeType").selectpicker("val", 0)
    }
    if (p.orderBy != undefined && p.orderBy.dyn == 1) {
        var u = p.orderBy.type;
        $("#right-property-cell-orderBy").selectpicker("val", u)
    } else {
        $("#right-property-cell-orderBy").selectpicker("val", "")
    }
    var B = $("#right-property-cell").find("tr:eq(6)");
    var AX = $("#right-property-cell").find("tr:eq(7)");
    B.find("input").val(AE.height());
    AX.find("input").val(AE.width());
    var v = $("#right-property-cell").find("tr:eq(8)");
    var Ad = (p.printerFlag != undefined && p.printerFlag == 1) ? "uncheck" : "check";
    v.find("input").iCheck(Ad);
    var Ab = $("#right-property-cell").find("tr:eq(9)");
    var AP = (p.fileOutFlag != undefined && p.fileOutFlag == 1) ? "uncheck" : "check";
    Ab.find("input").iCheck(AP);
    var Ac = $("#right-property-cell").find("tr:eq(10)");
    var AT = p.upperCell != undefined ? p.upperCell : "";
    Ac.find("input").val(AT);
    var d = $("#right-property-cell").find("tr:eq(11)");
    var AG = p.paddingLeft != undefined ? p.paddingLeft : "";
    d.find("input").val(AG);
    var o = $("#right-property-cell").find("tr:eq(12)");
    var y = p.paddingTop != undefined ? p.paddingTop : "";
    o.find("input").val(y);
    var AR = $("#right-property-cell").find("tr:eq(13)");
    var AS = p.paddingRight != undefined ? p.paddingRight : "";
    AR.find("input").val(AS);
    var D = $("#right-property-cell").find("tr:eq(14)");
    var Q = p.paddingBottom != undefined ? p.paddingBottom : "";
    D.find("input").val(Q);
    if (AM == 3) {
        $(L[1]).show();
        if (!$(L[1]).hasClass("active")) {
            $(L[1]).children("a").trigger("click")
        }
        var AW = p.chart ? p.chart : {};
        var AB = $("#right-property-chart").find("tr:eq(1)");
        var AA = $("#right-property-chart").find("tr:eq(2)");
        var z = $("#right-property-chart").find("tr:eq(3)");
        AB.find("input").val(AW.width != undefined ? AW.width : 400);
        AA.find("input").val(AW.height != undefined ? AW.height : 300);
        var AV = Utils.getChartIdx(AW.type);
        z.find("select").selectpicker("val", AV)
    } else {
        if (AM == 2) {
            $(L[5]).show();
            $(L[6]).show();
            $("#right-property-arg-cell").hide();
            this.setRightArgProperty(AE)
        }
    }
    if (AM == 7 || AM == 8) {
        $(L[4]).show();
        if (!$(L[4]).hasClass("active")) {
            $(L[4]).children("a").trigger("click")
        }
        var J = $("#right-property-table");
        var AK = function (c, Ae) {
            return ((1 << c) & Ae) != 0
        };
        var AB = J.find("tr:eq(1)");
        var AU = p.relative != undefined ? p.relative : 6;
        AB.find("input").each(function (Ae) {
            var c = parseInt($(this).val());
            var Af = AK(c, AU) ? "check" : "uncheck";
            $(this).iCheck(Af)
        });
        var h = J.find("tr:eq(2)");
        var S = p.tableBackground != undefined ? p.tableBackground : null;
        h.find("input.color-select").spectrum("set", S);
        var g = J.find("tr:eq(3)");
        var s = p.tableOpacity != undefined ? p.tableOpacity : "";
        g.find("input").val(s);
        var f = (p.userPanel != undefined && p.userPanel == 1) ? "check" : "uncheck";
        var e = J.find("tr:eq(4)");
        e.find("input").iCheck(f);
        if (AM == 8) {
            J.find("tr:eq(0)").find("td").html("面板属性");
            e.hide();
            J.find("tr:gt(4)").show()
        } else {
            J.find("tr:eq(0)").find("td").html("表格属性");
            e.show();
            if (f == "uncheck") {
                J.find("tr:gt(4)").hide()
            }
        }
        var a = J.find("tr:eq(5)");
        var O = p.title != undefined ? p.title : "";
        a.find("input").val(O);
        var Z = J.find("tr:eq(6)");
        var n = p.titleColor != undefined ? p.titleColor : "#000000";
        Z.find("input.color-select").spectrum("set", n);
        if (p.titleFontWeight == "bold") {
            Z.find("li:eq(1)").addClass("tl-hover")
        } else {
            Z.find("li:eq(1)").removeClass("tl-hover")
        }
        if (p.titleFontStyle == "italic") {
            Z.find("li:eq(2)").addClass("tl-hover")
        } else {
            Z.find("li:eq(2)").removeClass("tl-hover")
        }
        var H = p.titleFontSize != undefined ? p.titleFontSize : 12;
        Z.find("select").selectpicker("val", H);
        var Y = J.find("tr:eq(7)");
        var W = p.titleHeight != undefined ? p.titleHeight : 28;
        Y.find("input").val(W);
        var V = J.find("tr:eq(8)");
        var AY = p.panelBorderColor != undefined ? p.panelBorderColor : "#ffffff";
        V.find("input").spectrum("set", AY);
        var U = J.find("tr:eq(9)");
        var r = p.panelBorderWidth != undefined ? p.panelBorderWidth : 0;
        U.find("input").val(r);
        var G = J.find("tr:eq(10)");
        var N = p.panelBorderRadius != undefined ? p.panelBorderRadius : 3;
        G.find("input").val(N);
        var F = J.find("tr:eq(11)");
        var t = p.titleBottomBorderWidth != undefined ? p.titleBottomBorderWidth : 0;
        F.find("input").val(t);
        var E = J.find("tr:eq(12)");
        var X = p.panelBackground != undefined ? p.panelBackground : "#ffffff";
        E.find("input").spectrum("set", X)
    }
    var K = $(".tab-report-table").attr("aria-expanded");
    if (K != "true") {
        if (AM == 7) {
            $("#tab-arg-report").find("li.report-table").show();
            $("#tab-report-table").show();
            var R = "td-" + AH.content.grid.tableIdx;
            $("#report-excel-table").children("div").hide();
            $("#report-excel-table").find("div." + R).show()
        } else {
            $("#tab-arg-report").find("li.report-table").hide();
            $("#tab-report-table").hide()
        }
    }
    if (p.iconStyle != undefined) {
        $(L[7]).show();
        var b = p.iconStyle;
        var i = $("#right-property-icon-style");
        var AC = i.find("tr:eq(0)");
        var T = b.color != undefined ? b.color : null;
        AC.find("input").spectrum("set", T);
        var AB = i.find("tr:eq(1)");
        var l = b.size != undefined ? b.size : 14;
        AB.find("input").val(l);
        var AA = i.find("tr:eq(2)");
        var Aa = b.align != undefined ? b.align : "left";
        AA.find("select").selectpicker("align", Aa)
    }
    var m = p.asyncData != undefined ? p.asyncData : {};
    var AN = $("#right-property-cell-async").find("tr:eq(0)");
    var AZ = m.usable == 1 ? "check" : "uncheck";
    AN.find("input").iCheck(AZ);
    var w = $("#right-property-cell-async").find("tr:eq(1)");
    var k = m.interval != undefined ? m.interval : "";
    w.find("input").val(k);
    var A = m.timeType != undefined ? m.timeType : 0;
    w.find("select").selectpicker("val", A);
    this.cellMenu(AE)
};
AnyExcel.prototype.cellMenu = function (I) {
    var V = I.data("gc");
    var P = V.content;
    var M = new Array();
    var G = function (Y) {
        if (Y.type == "conditionFormat") {
            $("li.tl-condition-format").trigger("click")
        } else {
            if (Y.type == "dataBar") {
                $("li.tl-data-bar").trigger("click")
            } else {
                if (Y.type == "diffBar") {
                    $("li.tl-diff-bar").trigger("click")
                } else {
                    if (Y.type == "dataFilter") {
                        $("li.tl-data-filter").trigger("click")
                    } else {
                        if (Y.type == "cellLinked") {
                            $("li.tl-insert-celllink").trigger("click")
                        } else {
                            if (Y.type == "linkage") {
                                $("li.tl-insert-linkages-all").trigger("click")
                            } else {
                                if (Y.type == "cellImageLinked") {
                                    $("li.tl-insert-image-link").trigger("click")
                                } else {
                                    if (Y.type == "cellFileLinked") {
                                        $("li.tl-insert-file-link").trigger("click")
                                    } else {
                                        if (Y.type == "selectStyle") {
                                            $("li.tl-insert-cellSelect-style").trigger("click")
                                        } else {
                                            if (Y.type == "orderBy") {
                                                $("li.tl-insert-orderby-icon").trigger("click")
                                            } else {
                                                if (Y.type == "cellFold") {
                                                    $("li.tl-tree-expand").trigger("click")
                                                } else {
                                                    if (Y.type == "cellGrid") {
                                                        $("#tab-arg-report").find("li.report-table").show();
                                                        $("#tab-arg-report").find("li.report-table a").tab("show");
                                                        $("#tab-report-table").show();
                                                        var Z = grid.selectedGridCell;
                                                        if (Z != null && Z.content.grid) {
                                                            var X = "td-" + Z.content.grid.tableIdx;
                                                            $("#report-excel-table").children("div").hide();
                                                            $("#report-excel-table").find("div." + X).show()
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    var C = function (X) {
        if (X.type == "conditionFormat") {
            P.conditionFormat = undefined
        } else {
            if (X.type == "dataBar") {
                P.dataBar = undefined
            } else {
                if (X.type == "diffBar") {
                    P.diffBar = undefined
                } else {
                    if (X.type == "dataFilter") {
                        P.dataFilter = undefined
                    } else {
                        if (X.type == "cellLinked") {
                            P.cellLinked = undefined
                        } else {
                            if (X.type == "linkage") {
                                P.linkages = undefined
                            } else {
                                if (X.type == "cellImageLinked") {
                                    P.cellImageLinked = undefined
                                } else {
                                    if (X.type == "cellFileLinked") {
                                        P.cellFileLinked = undefined
                                    } else {
                                        if (X.type == "selectStyle") {
                                            P.cellSelectStyle = undefined
                                        } else {
                                            if (X.type == "orderBy") {
                                                P.orderBy = undefined
                                            } else {
                                                if (X.type == "cellFold") {
                                                    P.cellFold = undefined
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    var K = function (a, Y, X) {
        var Z = {};
        Z.title = a;
        Z.icon = "icon iconfont " + Y + " fa-lg";
        Z.fn = G;
        Z.dfn = C;
        Z.type = X;
        Z.del = true;
        return Z
    };
    var J = P.conditionFormat;
    if (J != undefined && !$.isEmptyObject(J)) {
        M.push(K("条件格式", "icon-icon01", "conditionFormat"))
    }
    var A = P.dataBar;
    if (A != undefined && !$.isEmptyObject(A)) {
        M.push(K("数据条", "icon-barh", "dataBar"))
    }
    var E = P.diffBar;
    if (E != undefined && !$.isEmptyObject(E)) {
        M.push(K("差异图", "icon-bars", "diffBar"))
    }
    var O = P.dataFilter;
    if (O != undefined && !$.isEmptyObject(O)) {
        M.push(K("过滤", "icon-filter", "dataFilter"))
    }
    var H = P.cellLinked;
    if (H != undefined && !$.isEmptyObject(H)) {
        M.push(K("超级链接", "icon-link", "cellLinked"))
    }
    var Q = P.linkages;
    if (Q != undefined && !$.isEmptyObject(Q)) {
        M.push(K("交互设置", "icon-jiaohu", "linkage"))
    }
    var D = P.cellSelectStyle;
    if (D != undefined && !$.isEmptyObject(D)) {
        M.push(K("动态背景色", "icon-bgcolor2", "selectStyle"))
    }
    var W = P.cellImageLinked;
    if (W != undefined && !$.isEmptyObject(W)) {
        M.push(K("图片链接", "icon-image1", "cellImageLinked"))
    }
    var R = P.cellFileLinked;
    if (R != undefined && !$.isEmptyObject(R)) {
        M.push(K("文件附件", "icon-file", "cellFileLinked"))
    }
    var L = P.orderBy;
    if (L != undefined && !$.isEmptyObject(L) && L.dyn != 1) {
        M.push(K("排序图标", "icon-paixu", "orderBy"))
    }
    var S = P.cellFold;
    if (S != undefined && !$.isEmptyObject(S)) {
        M.push(K("折叠图标", "icon-zhedie-jiahao", "cellFold"))
    }
    var B = P.grid;
    if (B != undefined) {
        M.push(K("编辑表格", "icon-table", "cellGrid"))
    }
    if (M.length > 0) {
        var T = anyExcel.getGrid();
        if (anyExcel.getGrid().selectedGridCell == null) {
            return false
        }
        var F = T.tbdiv.offset().left;
        var N = T.tbdiv.offset().top;
        var U = {clientX: I.position().left + I.width() + F, clientY: I.position().top + N};
        basicContext.show(M, U)
    }
};
AnyExcel.prototype.scollSetCellMenu = function () {
    var A = this.getSelectGridCell();
    if (A == null) {
        return
    }
    if (!basicContext.exist()) {
        return
    }
    this.cellMenu($(A.o))
};
AnyExcel.prototype.setRightArgProperty = function (E) {
    var J = $(".tab-report-arg").attr("aria-expanded");
    if (J == "true") {
        var F = $("#right-property-arg-cell");
        F.show();
        var A = F.find("tr:eq(1)");
        var L = F.find("tr:eq(2)");
        var I = F.find("tr:eq(3)");
        A.find("input").val(E.height());
        L.find("input").val(E.width());
        var C = argGrid.selectedGridCell;
        var H = (C != null && C.content.hiddenCondtion != undefined) ? C.content.hiddenCondtion : "";
        I.find("input").val(H)
    }
    var D = function () {
        var O = {};
        $("#right-property-arg-select").find("tr:gt(2)").each(function () {
            var U = $(this).find("td:eq(0)");
            var T = U.find("input").val();
            var S = $(this).find("td:eq(1)");
            var V = S.find("input").val();
            O[T] = V
        });
        var R = argGrid.selectedGridCell;
        if (R == null) {
            return false
        }
        var P = R.content;
        var Q = P.data ? P.data : {};
        Q.dataMap = O;
        P.data = Q
    };
    var M = function () {
        var P = $("#right-property-arg");
        var O = P.find("tr:eq(1)");
        O.find("td:eq(1)").html("");
        var U = P.find("tr:eq(2)");
        U.find("input").val("");
        var T = P.find("tr:eq(3)");
        T.find("select").selectpicker("val", 1);
        var S = P.find("tr:eq(4)");
        S.find("input").val("");
        var R = P.find("tr:eq(5)");
        R.find("input").val("");
        var Q = P.find("tr:eq(9)");
        Q.find("td:eq(0)").find("select").selectpicker("val", 0);
        Q.find("input").val("");
        P.hide();
        P.find("tr:eq(6)").hide();
        P.find("tr:eq(7)").hide();
        P.find("tr:eq(9)").find("input").show();
        P.find("tr:eq(9)").find("input").val("");
        P.find("tr:eq(10)").hide();
        P.find("tr:eq(12)").hide();
        P.find("tr:eq(13)").hide();
        $("#right-property-arg-select").hide();
        $("#right-property-arg-select").find("tr:gt(2)").remove();
        $("#right-property-arg-ds-select").hide();
        $("#right-property-arg-ds-select").find("input").val("");
        $("#right-property-arg-tree").hide();
        $("#right-property-arg-tree").find("input").val("");
        $("#right-property-arg-tree-group").hide();
        $("#right-property-arg-tree-group").find("tr:gt(2)").remove();
        $("#right-property-arg-button-event").hide();
        $("#right-property-arg-button-attr").hide();
        $("#right-property-arg-style").hide();
        $("#right-property-arg-date-range").hide();
        $("#right-property-arg-date-range").find("input[type=text]").val("")
    };
    var B = function (e) {
        var u = $("#right-property-arg");
        u.show();
        var AW = $("#right-property-arg-style");
        AW.show();
        var AY = u.find("tr:eq(2)");
        var h = e["name"] ? e["name"] : "";
        AY.find("input").val(h);
        var AV = u.find("tr:eq(3)");
        var f = e["dataType"] ? e["dataType"] : 1;
        AV.find("select").selectpicker("val", f);
        var AT = u.find("tr:eq(4)");
        var P = e["width"] ? e["width"] : 160;
        AT.find("input").val(P);
        var d = e.widthUnit != undefined ? e.widthUnit : "px";
        AT.find("select").selectpicker("val", d);
        var AR = u.find("tr:eq(5)");
        var Q = e["height"] ? e["height"] : 26;
        AR.find("input").val(Q);
        var AH = e.heightUnit != undefined ? e.heightUnit : "px";
        AR.find("select").selectpicker("val", AH);
        var AL = u.find("tr:eq(9)");
        var AF = e["defaultValueType"] ? e["defaultValueType"] : 0;
        AL.find("td:eq(0)").find("select").selectpicker("val", AF);
        var l = e["defaultValue"] ? e["defaultValue"] : "";
        var n = AL.find("td:eq(1)").children();
        n.hide();
        if (AF == 0 || AF == 1) {
            AL.find("td:eq(1)").find("input").val(l);
            $(n[0]).show();
            if (AF == 1) {
                $(n[1]).show()
            }
        } else {
            $(n[2]).show();
            AL.find("td:eq(1)").find("select").selectpicker("val", l)
        }
        var m = u.find("tr:eq(11)");
        var j = u.find("tr:eq(12)");
        var S = "uncheck";
        if (e.useLike && e.useLike == 1) {
            S = "check";
            j.show();
            var Y = e.likeType != undefined ? e.likeType : 0;
            j.find("select").selectpicker("val", Y)
        }
        m.find("input").iCheck(S);
        var V = u.find("tr:eq(14)");
        var AU = e.triggerQuery != undefined ? e.triggerQuery : 0;
        V.find("input").iCheck(AU == 1 ? "check" : "uncheck");
        var AC = e["editStyle"];
        if (AC) {
            var AZ = u.find("tr:eq(1)");
            if (AC == 1) {
                AZ.find("td:eq(1)").html("编辑框")
            } else {
                if (AC == 2) {
                    var Ag = e["data"] ? e["data"] : {};
                    AZ.find("td:eq(1)").html("下拉框");
                    var AQ = u.find("tr:eq(6)");
                    var AP = u.find("tr:eq(7)");
                    AQ.show();
                    AP.show();
                    var k = "uncheck";
                    if (Ag.multiselect && Ag.multiselect == 1) {
                        k = "check"
                    }
                    AQ.find("input").iCheck(k);
                    var R = AP.find("select");
                    R.empty();
                    var U = argGrid.getSelectComps(e.name);
                    for (var Ac = 0; Ac < U.length; Ac++) {
                        var p = $("<option></option>");
                        p.attr("value", U[Ac]).html(U[Ac]).appendTo(R)
                    }
                    if (e.linkCondName) {
                        var r = e.linkCondName;
                        if (typeof e.linkCondName == "string") {
                            r = e.linkCondName.split(",")
                        }
                        R.selectpicker("val", r)
                    }
                    R.selectpicker("refresh");
                    $("#right-property-arg-select").show();
                    var AD = Ag["dataMap"] ? Ag["dataMap"] : {};
                    var Af = $("#right-property-arg-select").find("tr:eq(2)");
                    for (var o in AD) {
                        var v = Af.clone().show();
                        v.appendTo($("#right-property-arg-select"));
                        v.find("td:eq(0)").find("input").val(o);
                        v.find("td:eq(1)").find("input").val(AD[o]);
                        v.find("input").change(function () {
                            D()
                        })
                    }
                } else {
                    if (AC == 10) {
                        AZ.find("td:eq(1)").html("数据集下拉框");
                        var O = $("#right-property-arg-ds-select");
                        O.show();
                        var Ag = e["data"] ? e["data"] : {};
                        var AQ = u.find("tr:eq(6)");
                        var AP = u.find("tr:eq(7)");
                        var Ab = u.find("tr:eq(13)");
                        AQ.show();
                        AP.show();
                        Ab.show();
                        var k = "uncheck";
                        if (Ag.multiselect && Ag.multiselect == 1) {
                            k = "check"
                        }
                        AQ.find("input").iCheck(k);
                        if (Ag.supportSearch != undefined && Ag.supportSearch == 1) {
                            Ab.find("input").iCheck("check")
                        } else {
                            Ab.find("input").iCheck("uncheck")
                        }
                        var R = AP.find("select");
                        R.empty();
                        var U = argGrid.getSelectComps(e.name);
                        for (var Ac = 0; Ac < U.length; Ac++) {
                            var p = $("<option></option>");
                            p.attr("value", U[Ac]).html(U[Ac]).appendTo(R)
                        }
                        if (e.linkCondName) {
                            var r = e.linkCondName;
                            if (typeof e.linkCondName == "string") {
                                r = e.linkCondName.split(",")
                            }
                            R.selectpicker("val", r)
                        }
                        R.selectpicker("refresh");
                        var W = Ag["conditionSql"] ? Ag["conditionSql"] : {};
                        var AZ = O.find("tr:eq(1)");
                        var AG = anyExcel.getDss();
                        anyExcel.initSelect(AZ, W.dsName, AG);
                        var AY = O.find("tr:eq(2)");
                        if (W.dsName) {
                            var g = anyExcel.getDsColumns(W.dsName);
                            anyExcel.initSelect(AY, W.code, g)
                        } else {
                            anyExcel.initSelect(AY, null, new Array())
                        }
                        var AV = O.find("tr:eq(3)");
                        if (W.dsName) {
                            var g = anyExcel.getDsColumns(W.dsName);
                            anyExcel.initSelect(AV, W.label, g)
                        } else {
                            anyExcel.initSelect(AV, null, new Array())
                        }
                    } else {
                        if (AC == 3) {
                            var AP = u.find("tr:eq(7)");
                            AP.show();
                            AZ.find("td:eq(1)").html("日期控件");
                            var Ae = u.find("tr:eq(10)");
                            Ae.show();
                            var w = e["dateFormat"] ? e["dateFormat"] : "yyyy-MM-dd";
                            Ae.find("select").selectpicker("val", w);
                            var R = AP.find("select");
                            R.empty();
                            var U = argGrid.getSelectComps(e.name);
                            for (var Ac = 0; Ac < U.length; Ac++) {
                                var p = $("<option></option>");
                                p.attr("value", U[Ac]).html(U[Ac]).appendTo(R)
                            }
                            if (e.linkCondName) {
                                var r = e.linkCondName;
                                if (typeof e.linkCondName == "string") {
                                    r = e.linkCondName.split(",")
                                }
                                R.selectpicker("val", r)
                            }
                            R.selectpicker("refresh");
                            var Z = $("#right-property-arg-date-range");
                            Z.show();
                            var AO = Z.find("tr:eq(0)");
                            var AA = e.dateRange != undefined ? e.dateRange : 0;
                            AO.find("input").iCheck(AA == 1 ? "check" : "uncheck");
                            if (AA == 1) {
                                Z.find("tr:gt(0)").show();
                                var AN = Z.find("tr:eq(1)");
                                var AB = e.startName != undefined ? e.startName : "";
                                AN.find("input").val(AB);
                                var AK = Z.find("tr:eq(2)");
                                var AS = e.endName != undefined ? e.endName : "";
                                AK.find("input").val(AS)
                            } else {
                                Z.find("tr:gt(0)").hide()
                            }
                        } else {
                            if (AC == 4) {
                                var Ag = e["data"] ? e["data"] : {};
                                var W = Ag["conditionSql"] ? Ag["conditionSql"] : {};
                                AZ.find("td:eq(1)").html("下拉树型");
                                var AQ = u.find("tr:eq(6)");
                                AQ.show();
                                var k = "uncheck";
                                if (Ag.multiselect && Ag.multiselect == 1) {
                                    k = "check"
                                }
                                AQ.find("input").iCheck(k);
                                var Ad = $("#right-property-arg-tree");
                                Ad.show();
                                var AG = anyExcel.getDss();
                                var Ah = Ag.treeType != undefined ? Ag.treeType : 0;
                                var AI = Ad.find("tr:eq(1)");
                                AI.find("select").selectpicker("val", Ah).trigger("change");
                                var AY = Ad.find("tr:eq(2)");
                                anyExcel.initSelect(AY, W.dsName, AG);
                                var AV = Ad.find("tr:eq(3)");
                                if (W.dsName) {
                                    var g = anyExcel.getDsColumns(W.dsName);
                                    anyExcel.initSelect(AV, W.pcode, g)
                                } else {
                                    anyExcel.initSelect(AV, null, new Array())
                                }
                                var AT = Ad.find("tr:eq(4)");
                                if (W.dsName) {
                                    var g = anyExcel.getDsColumns(W.dsName);
                                    anyExcel.initSelect(AT, W.code, g)
                                } else {
                                    anyExcel.initSelect(AT, null, new Array())
                                }
                                var AR = Ad.find("tr:eq(5)");
                                if (W.dsName) {
                                    var g = anyExcel.getDsColumns(W.dsName);
                                    anyExcel.initSelect(AR, W.queryCode, g)
                                } else {
                                    anyExcel.initSelect(AR, null, new Array())
                                }
                                var AQ = Ad.find("tr:eq(6)");
                                if (W.dsName) {
                                    var g = anyExcel.getDsColumns(W.dsName);
                                    anyExcel.initSelect(AQ, W.label, g)
                                } else {
                                    anyExcel.initSelect(AQ, null, new Array())
                                }
                                if (W.dsName) {
                                    var g = anyExcel.getDsColumns(W.dsName);
                                    var AD = Ag["dataMap"] ? Ag["dataMap"] : {};
                                    var Af = $("#right-property-arg-select").find("tr:eq(2)");
                                    for (var o in AD) {
                                        var Af = $("#right-property-arg-tree-group").find("tr:eq(2)");
                                        var v = Af.clone().show();
                                        v.appendTo($("#right-property-arg-tree-group"));
                                        v.find("select").addClass("selectpicker").selectpicker("refresh");
                                        var T = v.find("td:eq(0)").find("select");
                                        anyExcel.initSelectSelf(T, "", g);
                                        T.selectpicker("val", o);
                                        var AM = v.find("td:eq(1)").find("select");
                                        anyExcel.initSelectSelf(AM, "", g);
                                        AM.selectpicker("val", AD[o]);
                                        v.find("select").bind("change", function () {
                                            anyExcel.setTreeSelectDataMap()
                                        })
                                    }
                                }
                            } else {
                                if (AC == 5 || AC == 6 || AC == 18) {
                                    var t = AC == 5 ? "单选" : "复选框";
                                    AZ.find("td:eq(1)").html(t);
                                    $("#right-property-arg-select").show();
                                    var Ag = e["data"] ? e["data"] : {};
                                    var AD = Ag["dataMap"] ? Ag["dataMap"] : {};
                                    var Af = $("#right-property-arg-select").find("tr:eq(2)");
                                    for (var o in AD) {
                                        var v = Af.clone().show();
                                        v.appendTo($("#right-property-arg-select"));
                                        v.find("td:eq(0)").find("input").val(o);
                                        v.find("td:eq(1)").find("input").val(AD[o]);
                                        v.find("input").change(function () {
                                            D()
                                        })
                                    }
                                } else {
                                    if (AC == 7) {
                                        AZ.find("td:eq(1)").html("密码框")
                                    } else {
                                        if (AC == 16) {
                                            AZ.find("td:eq(1)").html("隐藏域")
                                        } else {
                                            if (AC == 9) {
                                                M();
                                                AW.show();
                                                AZ.find("td:eq(1)").html("按钮");
                                                var Ag = e["data"] ? e["data"] : {};
                                                var X = Ag.datas ? Ag.datas : new Array();
                                                for (var Ac = 0; Ac < X.length; Ac++) {
                                                    var s = X[Ac];
                                                    if (s.type == 0) {
                                                        $("#right-property-arg-button-attr").show();
                                                        var h = e["name"] ? e["name"] : "";
                                                        var Aa = $("#right-property-arg-button-attr");
                                                        var z = Aa.find("tr:eq(1)");
                                                        z.find("input").val(h);
                                                        var P = e.width != undefined ? e.width : "";
                                                        var y = Aa.find("tr:eq(2)");
                                                        y.find("input").val(P);
                                                        var Q = e.height != undefined ? e.height : "";
                                                        var x = Aa.find("tr:eq(3)");
                                                        x.find("input").val(Q)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var q = e.cmpStyle != undefined ? e.cmpStyle : {};
        var c = AW.find("tr:eq(0)");
        var AJ = q.background != undefined ? q.background : null;
        c.find("input.color-select").spectrum("set", AJ);
        var b = AW.find("tr:eq(1)");
        var AE = q.borderColor != undefined ? q.borderColor : null;
        b.find("input.color-select").spectrum("set", AE);
        var a = AW.find("tr:eq(2)");
        var AX = q.iconColor != undefined ? q.iconColor : null;
        a.find("input.color-select").spectrum("set", AX)
    };
    var C = E.data("gc");
    var G = C.mark;
    if (J == "true" || G == 2) {
        var N = $("#right-metis-menu").children("li");
        if (!$(N[5]).hasClass("active")) {
            $(N[5]).children("a").trigger("click")
        }
        M();
        if (G != 2) {
        } else {
            var K = C.content;
            B(K)
        }
    }
};
AnyExcel.prototype.setRightDivProperty = function (F) {
    var O = $("#right-metis-menu").children("li");
    O.hide();
    $(O[3]).show();
    if (!$(O[3]).hasClass("active")) {
        $(O[3]).children("a").trigger("click")
    }
    $(O[8]).show();
    grid.clearCellBorderColor();
    var H = $("#report-excel").scrollLeft();
    var C = $("#report-excel").scrollTop();
    var G = F.data("rd");
    var T = $("#right-property-div").find("tr:eq(1)");
    T.find("input").val(G.name);
    var R = $("#right-property-div").find("tr:eq(2)");
    R.find("input").val(F.width());
    var Q = $("#right-property-div").find("tr:eq(3)");
    Q.find("input").val(F.height());
    var E = F.position();
    var N = $("#right-property-div").find("tr:eq(4)");
    N.find("input").val(Math.round(E.left - 40));
    var L = $("#right-property-div").find("tr:eq(5)");
    L.find("input").val(Math.round(E.top - 18));
    var K = $("#right-property-div").find("tr:eq(6)");
    var B = (G.printerFlag != undefined && G.printerFlag == 1) ? "uncheck" : "check";
    K.find("input").iCheck(B);
    var P = G.content;
    var A = P.asyncData != undefined ? P.asyncData : {};
    var J = $("#right-property-cell-async").find("tr:eq(0)");
    var I = A.usable == 1 ? "check" : "uncheck";
    J.find("input").iCheck(I);
    var S = $("#right-property-cell-async").find("tr:eq(1)");
    var M = A.interval != undefined ? A.interval : "";
    S.find("input").val(M);
    var D = A.timeType != undefined ? A.timeType : 0;
    S.find("select").selectpicker("val", D)
};
AnyExcel.prototype.setRightPanelProperty = function (F) {
    var P = $("#right-metis-menu").children("li");
    P.hide();
    $(P[2]).show();
    if (!$(P[2]).hasClass("active")) {
        $(P[2]).children("a").trigger("click")
    }
    $(P[8]).show();
    grid.clearCellBorderColor();
    var I = $("#report-excel").scrollLeft();
    var C = $("#report-excel").scrollTop();
    var G = F.data("rd");
    var U = $("#right-property-panel").find("tr:eq(1)");
    U.find("input").val(G["name"]);
    var S = $("#right-property-panel").find("tr:eq(2)");
    S.find("input").val(G["title"]);
    var R = $("#right-property-panel").find("tr:eq(3)");
    R.find("input").val(F.width());
    var O = $("#right-property-panel").find("tr:eq(4)");
    O.find("input").val(F.height());
    var E = F.position();
    var M = $("#right-property-panel").find("tr:eq(5)");
    M.find("input").val(Math.round(E.left - 40));
    var L = $("#right-property-panel").find("tr:eq(6)");
    L.find("input").val(Math.round(E.top - 18));
    var K = $("#right-property-div").find("tr:eq(7)");
    var B = (G.printerFlag != undefined && G.printerFlag == 1) ? "uncheck" : "check";
    K.find("input").iCheck(B);
    var Q = reportDiv.content;
    var A = Q.asyncData != undefined ? Q.asyncData : {};
    var J = $("#right-property-cell-async").find("tr:eq(0)");
    var H = A.usable == 1 ? "check" : "uncheck";
    J.find("input").iCheck(H);
    var T = $("#right-property-cell-async").find("tr:eq(1)");
    var N = A.interval != undefined ? A.interval : "";
    T.find("input").val(N);
    var D = A.timeType != undefined ? A.timeType : 0;
    T.find("select").selectpicker("val", D)
};
AnyExcel.prototype.appendCellLogicMap = function (D, G) {
    var B = $("#right-property-cell-logic");
    var F = B.find("tr:eq(2)");
    var E = F.clone();
    var C = E.find("td:eq(0)").find("input");
    var H = E.find("td:eq(1)").find("input");
    if (D != undefined) {
        C.val(D)
    }
    if (G != undefined) {
        H.val(G)
    }
    B.append(E);
    E.show();
    var A = function () {
        var J = anyExcel.getGrid().selectedGridCell;
        if (J == null) {
            return false
        }
        var K = J.content;
        K.logicMap = {};
        var I = B.find("tr:gt(2)");
        I.each(function (M) {
            var L = $(this).find("td:eq(0)").find("input").val();
            var N = $(this).find("td:eq(1)").find("input").val();
            K.logicMap[L] = N
        })
    };
    C.change(function () {
        A()
    });
    H.change(function () {
        A()
    })
};
AnyExcel.prototype.fontColor = function () {
    var B = $("li.tl-font-color").find("div").attr("style");
    var A = "";
    if (B != undefined && B != "") {
        A = $.trim(B.split(";")[0].split(":")[1])
    }
    this.getGrid().fontColor(A)
};
AnyExcel.prototype.fontSize = function (A) {
    this.getGrid().fontSize(A)
};
AnyExcel.prototype.backgroundColor = function () {
    var B = $("li.tl-background-color").find("div").attr("style");
    var A = "";
    if (B != undefined && B != "") {
        A = $.trim(B.split(";")[0].split(":")[1])
    }
    this.getGrid().backgroundColor(A)
};
AnyExcel.prototype.clearAlignStyle = function () {
    var C = $("li.tl-align-left");
    var A = $("li.tl-align-center");
    var B = $("li.tl-align-right");
    C.removeClass("tl-hover");
    A.removeClass("tl-hover");
    B.removeClass("tl-hover")
};
AnyExcel.prototype.clearValignStyle = function () {
    var A = $("li.tl-valign-top");
    var C = $("li.tl-valign-middle");
    var B = $("li.tl-valign-bottom");
    A.removeClass("tl-hover");
    C.removeClass("tl-hover");
    B.removeClass("tl-hover")
};
AnyExcel.prototype.cellContent = function (A) {
    $("table .cellname").val(A)
};
AnyExcel.prototype.setColumn3Type = function (A, B, D) {
    var C = function (E) {
        A.find("a.only-a").unbind("click").show();
        if (E == 0) {
            A.find("i").removeClass("icon-down").addClass("icon-collect");
            A.find("a.only-a").bind("click", columnSelectHandler)
        } else {
            if (E == 1) {
                A.find("i").removeClass("icon-collect").addClass("icon-down");
                A.find("a.only-a").bind("click", cellSelectHandler)
            } else {
                A.find("a.only-a").hide()
            }
        }
    };
    A.find("select").change(function () {
        var E = $(this).val();
        C(E);
        A.find("input[type=text]").val("")
    });
    A.find("input[type=text]").val(B);
    if (B == "") {
        A.find("select").selectpicker("val", D)
    } else {
        if (B.startsWith("=")) {
            if (B.indexOf(".") != -1) {
                A.find("select").selectpicker("val", 0)
            } else {
                A.find("select").selectpicker("val", 1)
            }
        } else {
            A.find("select").selectpicker("val", 2)
        }
    }
    C(A.find("select").val())
};
AnyExcel.prototype.setSelectCellText = function (A) {
    $("#win-gridCell-select").find("input").val("=" + A)
};
AnyExcel.prototype.getDss = function () {
    var B = datasetTree.getNodes();
    var A = new Array();
    if (B != null) {
        for (var C = 0; C < B.length; C++) {
            if (B[C].type == 1) {
                continue
            }
            A.push(B[C].name)
        }
    }
    return A
};
AnyExcel.prototype.getDsColumns = function (F) {
    var B = datasetTree.getNodes();
    var A = new Array();
    if (B != null) {
        for (var E = 0; E < B.length; E++) {
            if (B[E].name == F) {
                var D = B[E].children;
                if (D != null) {
                    for (var C = 0; C < D.length; C++) {
                        A.push(D[C].name)
                    }
                }
            }
        }
    }
    return A
};
AnyExcel.prototype.initComponent = function (D) {
    var E = $(D.o);
    var L = D.content;
    var F = L.width ? L.width : 160;
    var B = L.height ? L.height : 26;
    var C = $("<div></div>").css("overflow", "hidden").width(E.width()).height(E.height());
    var P = $("<div></div>").addClass("sv").width(E.width()).height(E.height()).appendTo(C);
    E.append(C);
    if (L.editStyle == 9) {
        var J = L.data.datas;
        for (var H = 0; H < J.length; H++) {
            var A = J[H];
            var Q = "";
            if (A.type == 20) {
                Q = "查询"
            } else {
                if (A.type == 21) {
                    Q = "重置"
                } else {
                    Q = L.name
                }
            }
            var K = this.createComponent(L.editStyle);
            K.attr("value", Q).appendTo(P)
        }
    } else {
        if (L.editStyle == 5 || L.editStyle == 6 || L.editStyle == 18) {
            var G = L.data != undefined ? L.data : {};
            var M = G.dataMap != undefined ? G.dataMap : {};
            for (var O in M) {
                var I = null;
                if (L.editStyle == 5) {
                    I = "<input type='radio'/>"
                } else {
                    if (L.editStyle == 6 || L.editStyle == 18) {
                        I = "<input type='checkbox'/>"
                    }
                }
                if (I != null) {
                    var N = M[O] != undefined ? M[O] : "";
                    I += "<span>" + N + "</span>"
                }
                P.append(I)
            }
        } else {
            var K = this.createComponent(L.editStyle);
            if (K == undefined) {
                return
            }
            if (L.editStyle != 5 && L.editStyle != 6) {
                K.width(F).height(B)
            }
            K.appendTo(P);
            if (L.editStyle == 2 || L.editStyle == 10) {
                K.addClass("selectpicker").attr("data-style", "btn-select").attr("title", "").attr("data-width", F);
                K.selectpicker("refresh")
            } else {
                if (L.editStyle == 3) {
                    anyExcel.initDate(K)
                }
            }
        }
    }
};
AnyExcel.prototype.createComponent = function (D) {
    if (D == 1) {
        var B = $("<input type='text'>");
        return B
    } else {
        if (D == 2 || D == 10) {
            var A = $("<select></select>");
            return A
        } else {
            if (D == 3) {
                var B = $("<input type='text'>");
                B.addClass("form_time").attr("data-date-format", "yyyy-MM-dd");
                return B
            } else {
                if (D == 4) {
                    var B = $("<input type='text'>");
                    return B
                } else {
                    if (D == 5) {
                        var C = $("<input type='radio'>");
                        return C
                    } else {
                        if (D == 6) {
                            var E = $("<input type='checkbox'>");
                            return E
                        } else {
                            if (D == 7) {
                                var B = $("<input type='password'>");
                                return B
                            } else {
                                if (D == 9) {
                                    var B = $("<input type='button'>");
                                    return B
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
AnyExcel.prototype.initSelect = function (C, D, A) {
    var B = C.find("select");
    this.initSelectSelf(B, D, A)
};
AnyExcel.prototype.initSelectSelf = function (D, E, A) {
    D.empty();
    var C = $("<option></option>").appendTo(D);
    for (var B = 0; B < A.length; B++) {
        var C = $("<option></option>");
        C.attr("value", A[B]).html(A[B]).appendTo(D)
    }
    if (E) {
        D.selectpicker("val", E)
    }
    D.selectpicker("refresh")
};
AnyExcel.prototype.setTreeSelectDataMap = function () {
    var A = {};
    $("#right-property-arg-tree-group").find("tr:gt(2)").each(function () {
        var G = $(this).find("td:eq(0)");
        var F = G.find("select").val();
        var E = $(this).find("td:eq(1)");
        var H = E.find("select").val();
        A[F] = H
    });
    var D = argGrid.selectedGridCell;
    if (D == null) {
        return false
    }
    var B = D.content;
    var C = B.data ? B.data : {};
    C.dataMap = A;
    B.data = C
};
AnyExcel.prototype.initDate = function (A) {
    var G = A.attr("data-date-format");
    if (A.attr("type") == "hidden") {
        return true
    }
    var F = A.attr("icon-color");
    if (F != undefined && F != "") {
        A.next().css("color", F)
    }
    var D = A.attr("range");
    var B = D != undefined && D == "1" ? true : false;
    var G = A.attr("data-date-format");
    var E = "date";
    if (G.indexOf("ss") != -1 || G.indexOf("HH") != -1 || G.indexOf("mm") != -1) {
        if (G.indexOf("dd") != -1) {
            E = "datetime"
        } else {
            E = "time"
        }
    } else {
        if (G.indexOf("dd") != -1) {
            E = "date"
        } else {
            if (G.indexOf("MM") != -1) {
                E = "month"
            } else {
                if (G.indexOf("yyyy") != -1) {
                    E = "year"
                }
            }
        }
    }
    var C = {elem: A[0], format: G, type: E, range: B};
    if (A.attr("tq") != undefined) {
        if (!A.hasClass(".selectLinkage")) {
            A.change(function () {
                report.btnQueryWithParam()
            })
        }
    }
    laydate.render(C);
    A.next().click(function (H) {
        $(this).prev().trigger("focus");
        H.stopPropagation()
    })
};
AnyExcel.prototype.initLeftDatasetTree = function () {
    var G = report.ds;
    if (!G) {
        return
    }
    for (var H in G) {
        var F = G[H];
        var H = F.name;
        var E = datasetTree.addNodes(null, 0, {"id": H, "name": H, "ds": true});
        var A = datasetTree.getNodesByParam("id", H);
        var D = F.columns;
        if (D && D.length > 0) {
            for (var C = 0; C < D.length; C++) {
                var B = F.type == 6 ? D[C].name : D[C];
                datasetTree.addNodes(A[0], {"id": B, "name": B, "pId": H}, true)
            }
        } else {
            $.ajax({
                async: false,
                type: "POST",
                url: PATH + "/rptMgr/query_ds.htm",
                data: {sourceName: F.sourceName, sql: F.sql},
                dataType: "json",
                success: function (K) {
                    var J = K.model;
                    if (J) {
                        F.columns = J;
                        if (J.length > 0) {
                            for (var I = 0; I < J.length; I++) {
                                datasetTree.addNodes(A[0], {"id": J[I], "name": J[I], "pId": H}, true)
                            }
                        }
                    }
                }
            })
        }
    }
};
AnyExcel.prototype.initInsertTable = function (D) {
    var E = $(D.o);
    $("#tab-arg-report").find("li.report-table").show();
    $("#tab-arg-report").find("li.report-table a").tab("show");
    $("#tab-report-table").show();
    $("#report-excel-table").children("div").hide();
    tableIdx++;
    var C = "td-" + tableIdx;
    var B = "<div class=" + C + '><div style="position: relative;"><div class="JCLRgrips"></div><div class="JRWRgrips"></div><table id="' + C + '" cellpadding="0" cellspacing="0" class="tb"></table><div class="tdborders"><div class="selected" style="position: absolute; top: 0px; left: 0px;"><div class="tdborder"></div><div class="tdborder"></div><div class="tdborder"></div><div class="tdborder"></div><div class="tdborder area" style="display:none;"></div></div><div class="canselected" style="position: absolute; top: 0px; left: 0px;"><div class="tdborder"></div><div class="tdborder"></div><div class="tdborder"></div><div class="tdborder"></div></div><div class="cellselected" style="position: absolute; top: 0px; left: 0px;"><div class="tdborder-dashed" style="display:none;pointer-events: none;"></div></div><div class="celllines" style="position: absolute; top: 0px; left: 0px;"></div></div><div class="tdinput" style="display:none;"><textarea style="overflow-y: hidden;overflow-x: hidden;word-wrap:normal;"></textarea></div><div class="div-coor"></div></div></div>';
    $("#report-excel-table").append(B);
    var A = $("#" + C).grid({id: C, arg: false, rowNum: 6, colNum: 6});
    A.tableIdx = tableIdx;
    D.mark = 7;
    A.parent = D;
    D.content.grid = A
};
AnyExcel.prototype.initCellPanel = function (E) {
    var B = E.content.cellPanel;
    var H = $(E.o);
    if (B.mark == 3) {
        var A = B.chartCell;
        var D = A.chart;
        var G = $("#win-chart").find("img");
        G.each(function () {
            if (parseInt($(this).attr("type")) == A.chartType) {
                var J = $("<img>", {src: $(this).attr("big")});
                J.css("width", "100%").css("height", "100%");
                var I = D.width != undefined ? D.width : 400;
                var K = D.height != undefined ? D.height : 300;
                divCoor.appendCellPanel(H.width(), H.height(), J, H);
                J.load(function () {
                })
            }
        })
    } else {
        if (B.mark == 6) {
            var F = B.subReport;
            var C = $("<i class='icon iconfont icon-report fa-lg' style='font-size:16px'></i>");
            divCoor.appendCellPanel(400, 330, C, H);
            grid.setFirstGridCellWidth(E, 400);
            grid.setFirstGridCellHeight(E, 300)
        }
    }
};
AnyExcel.prototype.initReportStyle = function (A) {
    if (A.tgType == 0) {
        $("#report-table").css("background", "url(" + A.tgBackground + ") no-repeat").css("background-position", "40px 19px")
    } else {
        if (A.tgType == 1) {
            $("#report-table").css("background", "url(" + A.tgBackground + ") no-repeat").css("background-size", "cover")
        } else {
            $("#report-table").css("background", "url(" + A.tgBackground + ") repeat")
        }
    }
};
AnyExcel.prototype.clearLeftDatasetTree = function () {
    if (datasetTree != null) {
        var B = datasetTree.transformToArray(datasetTree.getNodes());
        for (var C = 0, A = B.length; C < A; C++) {
            if (B[C].id == "_var" || B[C].pId == "_var") {
                continue
            }
            datasetTree.removeNode(B[C])
        }
    }
};
AnyExcel.prototype.addDatafilter = function (D, B) {
    var O = function () {
        if (B.find("tr").length > 2) {
            var R = B.find("tr:last");
            var Q = R.find("td:eq(0)");
            var P = Q.find("input").val();
            return P
        } else {
            var S = anyExcel.getGrid().selectedGridCell;
            if (S == null) {
                return ""
            }
            return S.getDsColumn()
        }
    };
    var D = D ? D : {};
    var H = B.find("tr:eq(1)").clone().show();
    var K = H.find("td:eq(0)");
    var I = D.column != undefined ? D.column : O();
    K.find("input").val(I);
    K.find("a").bind("click", columnSelectHandler);
    B.append(H);
    H.find("select").addClass("selectpicker").selectpicker("refresh");
    anyExcel.initDate(H.find("input.form_time"));
    var J = H.find("td:eq(1)");
    var G = D.symbol != undefined ? D.symbol : 0;
    J.find("select").selectpicker("val", G);
    var F = H.find("td:eq(2)");
    var E = H.find("td:eq(3)");
    F.find("select").change(function () {
        var P = parseInt($(this).val());
        E.children().hide();
        E.find("input").val("");
        if (P >= 1 && P <= 4) {
            E.children("input").show()
        } else {
            if (P == 5) {
                E.children("div").show()
            } else {
                if (P == 6) {
                    E.children("input").show();
                    E.children("a").show();
                    E.children("a").find("i").removeClass("icon-ichanshu24px").addClass("icon-collect");
                    E.children("a").unbind("click").bind("click", columnSelectHandler)
                } else {
                    if (P == 9) {
                        E.children("input").show();
                        E.children("a").show();
                        E.children("a").find("i").removeClass("icon-collect").addClass("icon-ichanshu24px");
                        E.children("a").unbind("click").bind("click", fxInputSelectHandler)
                    } else {
                        if (P == 8) {
                            E.children("span").show();
                            var S = E.children("span").find("select");
                            var T = argGrid.getArgNames();
                            for (var R = 0; R < T.length; R++) {
                                var Q = $("<option></option>");
                                Q.attr("value", T[R]).html(T[R]).appendTo(S)
                            }
                            S.selectpicker("refresh")
                        }
                    }
                }
            }
        }
    });
    var L = D.type != undefined ? D.type : 1;
    F.find("select").selectpicker("val", L);
    F.find("select").trigger("change");
    var N = D.value != undefined ? D.value : "";
    if (L == 5) {
        E.children("div").find("input").val(N)
    } else {
        if (L == 8) {
            E.children("span").find("select").selectpicker("val", N)
        } else {
            E.children("input").val(N)
        }
    }
    var M = B.find("tr").length;
    var C = H.find("td:eq(4)");
    C.find("input[type=radio]").attr("name", "logicTypeFilter" + M).iCheck({radioClass: "iradio_minimal",});
    if (D.logic == 1) {
        C.find("input[type=radio]:eq(1)").iCheck("check")
    } else {
        C.find("input[type=radio]:eq(0)").iCheck("check")
    }
    var A = H.find("td:eq(5)");
    A.find("a").click(function () {
        $(this).parent().parent().remove()
    })
};
AnyExcel.prototype.setDatafilter = function (B, A) {
    var C = {};
    var D = new Array();
    A.find("tr:gt(1)").each(function () {
        var J = {};
        var I = $(this).find("td:eq(0)");
        J.column = I.find("input").val();
        var H = $(this).find("td:eq(1)");
        J.symbol = H.find("select").val();
        var G = $(this).find("td:eq(2)");
        J.type = G.find("select").val();
        var F = $(this).find("td:eq(3)");
        if (J.type == 5) {
            J.value = F.children("div").find("input").val()
        } else {
            if (J.type == 8) {
                J.value = F.children("span").find("select").val()
            } else {
                J.value = F.children("input").val()
            }
        }
        var E = $(this).find("td:eq(4)");
        if (E.find("input[type=radio]:checked").length > 0) {
            J.logic = E.find("input[type=radio]:checked").val()
        }
        D.push(J)
    });
    C.conditions = D;
    B.dataFilter = C
};
AnyExcel.prototype.addLogicCondition = function (E, B) {
    var A = function (Q, R) {
        Q.find("select").change(function () {
            var S = $(this).val();
            Q.find("a.only-a").show().unbind("click");
            if (S == 0) {
                Q.find("i").removeClass("icon-down").addClass("icon-collect");
                Q.find("a.only-a").bind("click", columnSelectHandler)
            } else {
                if (S == 1) {
                    Q.find("i").removeClass("icon-collect").addClass("icon-down");
                    Q.find("a.only-a").bind("click", cellSelectHandler)
                } else {
                    Q.find("a.only-a").hide()
                }
            }
            Q.find("input").val("").trigger("change")
        });
        if (R == "") {
            Q.find("select").selectpicker("val", 0)
        } else {
            if (R.startsWith("=")) {
                if (R.indexOf(".") != -1) {
                    Q.find("select").selectpicker("val", 0)
                } else {
                    Q.find("select").selectpicker("val", 1)
                }
            }
        }
        Q.find("select").trigger("change")
    };
    var E = E ? E : {};
    var M = B.find("tr:eq(1)");
    var I = M.clone().show();
    B.append(I);
    var K = I.find("td:eq(0)");
    K.find("select").addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 75).attr("data-container", "body").selectpicker("refresh");
    A(K, "");
    var J = I.find("td:eq(1)");
    J.find("select").addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 90).attr("data-container", "body").selectpicker("refresh");
    var H = I.find("td:eq(2)");
    H.find("select").addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 90).attr("data-container", "body").selectpicker("refresh");
    var G = I.find("td:eq(3)");
    G.find("select").addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 110).attr("data-container", "body").selectpicker("refresh");
    var O = B.find("tr").length;
    var D = I.find("td:eq(4)");
    D.find("input[type=radio]").attr("name", "logicType" + O).iCheck({radioClass: "iradio_minimal",});
    D.find("input[type=radio]:eq(0)").iCheck("check");
    D.children("div").hide();
    var L = I.prev();
    if (L.is(":visible")) {
        L.find("td:eq(4)").children("div").show()
    }
    var P = I.find("input.form_time");
    anyExcel.initDate(P);
    if (E) {
        if (E["column"]) {
            var F = K.find("input");
            A(K, E["column"]);
            F.val(E["column"])
        }
        if (E["symbol"]) {
            var J = I.find("td:eq(1)").find("select");
            J.selectpicker("val", E["symbol"])
        }
        if (E["type"]) {
            var H = I.find("td:eq(2)").find("select");
            H.selectpicker("val", E["type"]);
            var C = H.parents("td").next().children();
            C.hide();
            if (E["type"] == "6") {
                $(C[0]).show();
                $(C[1]).show()
            } else {
                if (E["type"] == "10") {
                    $(C[2]).show()
                } else {
                    if (E["type"] == "5") {
                        $(C[3]).show()
                    } else {
                        $(C[0]).show()
                    }
                }
            }
        }
        if (E["value"]) {
            var G = I.find("td:eq(3)");
            if (E["type"] == "10") {
                G.find("select").selectpicker("val", E["value"])
            } else {
                G.find("input").val(E["value"])
            }
        }
        if (E.logic) {
            var N = (E.logic == 1) ? "check" : "uncheck";
            D.find("input[type=radio]:eq(1)").iCheck(N)
        }
    }
    I.find("a.column-select").bind("click", columnSelectHandler);
    I.find("select[name=dataType]").change(function () {
        var R = $(this).val();
        var Q = $(this).parents("td").next().children();
        Q.hide();
        if (R == "6") {
            $(Q[0]).show();
            $(Q[1]).show()
        } else {
            if (R == "10") {
                $(Q[2]).show()
            } else {
                if (R == "5") {
                    $(Q[3]).show()
                } else {
                    $(Q[0]).show()
                }
            }
        }
    })
};
AnyExcel.prototype.setLogicCondition = function (C, B) {
    var D = new Array();
    var A = B.find("tr:gt(1)");
    if (A.length == 0) {
        return
    }
    A.each(function (I) {
        var L = {};
        var K = $(this).find("td:eq(0)").find("input");
        L["column"] = K.val();
        var J = $(this).find("td:eq(1)").find("select");
        L["symbol"] = J.val();
        var H = $(this).find("td:eq(2)").find("select");
        L["type"] = H.val();
        var G = $(this).find("td:eq(3)");
        if (L["type"] == "10") {
            L["value"] = G.find("select").val()
        } else {
            L["value"] = G.find("input").val()
        }
        var F = $(this).find("td:eq(4)");
        if (F.find("input[type=radio]:checked").length > 0) {
            L.logic = F.find("input[type=radio]:checked").val()
        }
        D.push(L)
    });
    var E = {};
    E.conditions = D;
    C.logicCondition = E
};
AnyExcel.prototype.frOnContextmenu = function (H) {
    var E = $(H.currentTarget);
    var C = E.data("gc");
    var A = C.colNum;
    var G = report.reportView ? report.reportView : {};
    var M = G.fixedCell ? G.fixedCell : {};
    var N = G.hiddenCell ? G.hiddenCell : {};
    var K = "冻结列";
    var F = "icon iconfont icon-liedongjie- icon-size-12";
    var D = "隐藏列";
    var L = "icon iconfont icon-hidden icon-size-12";
    if (M.columns && Utils.containColumn(A, M.columns)) {
        K = "取消冻结";
        F = "icon iconfont icon-delete icon-size-12"
    }
    if (N.cols && Utils.containColumn(A, N.cols)) {
        D = "取消隐藏列";
        L = "icon iconfont icon-delete icon-size-12"
    }
    var J = function () {
        if (K == "取消冻结") {
            E.find("i.icon-liedongjie-").remove();
            Utils.setColumn(A, M.columns)
        } else {
            if (M.columns) {
                M.columns.push(A)
            } else {
                var O = new Array();
                O.push(A);
                M.columns = O
            }
            G.fixedCell = M;
            report.reportView = G;
            E.find("div").append("<i class='icon iconfont icon-liedongjie- icon-size-12'></i>")
        }
    };
    var B = function () {
        if (D == "取消隐藏列") {
            E.find("i.icon-hidden").remove();
            Utils.setColumn(A, N.cols)
        } else {
            if (N.cols) {
                N.cols.push(A)
            } else {
                var O = new Array();
                O.push(A);
                N.cols = O
            }
            G.hiddenCell = N;
            report.reportView = G;
            E.find("div").append("<i class='icon iconfont icon-hidden icon-size-12'></i>")
        }
    };
    var I = [{title: K, icon: F, fn: J}, {title: D, icon: L, fn: B}];
    basicContext.show(I, H.originalEvent, true)
};
AnyExcel.prototype.fcOnContextmenu = function (V) {
    var H = $(V.currentTarget);
    var Y = H.data("gc");
    var W = Y.rowNum;
    var G = report.reportView ? report.reportView : {};
    var B = G.fixedCell ? G.fixedCell : {};
    var N = G.hiddenCell ? G.hiddenCell : {};
    var P = G.headerCell ? G.headerCell : {};
    var L = G.tailCell ? G.tailCell : {};
    var I = G.repeatCell ? G.repeatCell : {};
    var Z = "冻结行";
    var X = "icon iconfont icon-dongjiexing icon-size-12";
    var E = "隐藏行";
    var C = "icon iconfont icon-hidden icon-size-12";
    var Q = "设置为表头";
    var S = "icon iconfont icon-header icon-size-12";
    var K = "设置为表尾";
    var O = "icon iconfont icon-T icon-size-12";
    var R = "删除重复项";
    var A = "icon iconfont icon-zhongfujilu icon-size-12";
    if (B.rows && Utils.containRow(W, B.rows)) {
        Z = "取消冻结";
        X = "icon iconfont icon-delete icon-size-12"
    }
    if (N.rows && Utils.containRow(W, N.rows)) {
        E = "取消隐藏行";
        C = "icon iconfont icon-delete icon-size-12"
    }
    if (P.rows && Utils.containRow(W, P.rows)) {
        Q = "取消表头";
        S = "icon iconfont icon-delete icon-size-12"
    }
    if (L.rows && Utils.containRow(W, L.rows)) {
        K = "取消表尾";
        O = "icon iconfont icon-delete icon-size-12"
    }
    if (I.rows && Utils.containRow(W, I.rows)) {
        R = "取消删除重复项";
        C = "icon iconfont icon-delete icon-size-12"
    }
    var F = function () {
        if (Z == "取消冻结") {
            H.find("i.icon-dongjiexing").remove();
            Utils.setRow(W, B.rows)
        } else {
            if (B.rows) {
                B.rows.push(W)
            } else {
                var a = new Array();
                a.push(W);
                B.rows = a
            }
            G.fixedCell = B;
            report.reportView = G;
            H.find("div").append("<i class='icon iconfont icon-dongjiexing icon-size-12'></i>")
        }
    };
    var J = function () {
        if (E == "取消隐藏行") {
            H.find("i.icon-hidden").remove();
            Utils.setRow(W, N.rows)
        } else {
            if (N.rows) {
                N.rows.push(W)
            } else {
                var a = new Array();
                a.push(W);
                N.rows = a
            }
            G.hiddenCell = N;
            report.reportView = G;
            H.find("div").append("<i class='icon iconfont icon-hidden icon-size-12'></i>")
        }
    };
    var U = function () {
        if (Q == "取消表头") {
            H.find("i.icon-header").remove();
            Utils.setRow(W, P.rows)
        } else {
            if (P.rows) {
                P.rows.push(W)
            } else {
                var a = new Array();
                a.push(W);
                P.rows = a
            }
            G.headerCell = P;
            report.reportView = G;
            H.find("div").append("<i class='icon iconfont icon-header icon-size-12'></i>")
        }
    };
    var D = function () {
        if (K == "取消表尾") {
            H.find("i.icon-T").remove();
            Utils.setRow(W, L.rows)
        } else {
            if (L.rows) {
                L.rows.push(W)
            } else {
                var a = new Array();
                a.push(W);
                L.rows = a
            }
            G.tailCell = L;
            report.reportView = G;
            H.find("div").append("<i class='icon iconfont icon-T icon-size-12'></i>")
        }
    };
    var T = function () {
        if (R == "取消删除重复项") {
            H.find("i.icon-zhongfujilu").remove();
            Utils.setRow(W, I.rows)
        } else {
            if (I.rows) {
                I.rows.push(W)
            } else {
                var a = new Array();
                a.push(W);
                I.rows = a
            }
            G.repeatCell = I;
            report.reportView = G;
            H.find("div").append("<i class='icon iconfont icon-zhongfujilu icon-size-12'></i>")
        }
    };
    var M = [{title: Z, icon: X, fn: F}, {title: E, icon: C, fn: J}, {title: Q, icon: S, fn: U}, {
        title: K,
        icon: O,
        fn: D
    }, {title: R, icon: A, fn: T}];
    basicContext.show(M, V.originalEvent, true)
};
AnyExcel.prototype.setColumnWithArg = function (E, D) {
    E.find("select:eq(0)").change(function () {
        var F = $(this).closest("td");
        A(F, $(this));
        F.find("input").val("").trigger("change")
    });
    var A = function (K, F) {
        var J = K.children("span");
        $(J[1]).hide();
        $(J[2]).hide();
        var L = F.val();
        K.find("a.only-a").show().unbind("click");
        if (L == 0) {
            $(J[1]).show();
            K.find("i").removeClass("icon-down").addClass("icon-collect");
            K.find("a.only-a").bind("click", columnSelectHandler)
        } else {
            if (L == 1) {
                $(J[1]).show();
                K.find("i").removeClass("icon-collect").addClass("icon-down");
                K.find("a.only-a").bind("click", cellSelectHandler)
            } else {
                if (L == 3) {
                    $(J[2]).show();
                    var I = K.find("select:eq(1)");
                    I.empty();
                    var M = argGrid.getArgNames();
                    for (var H = 0; H < M.length; H++) {
                        var G = $("<option></option>");
                        G.attr("value", M[H]).html(M[H]).appendTo(I)
                    }
                    I.selectpicker("refresh")
                } else {
                    $(J[1]).show();
                    K.find("a.only-a").hide()
                }
            }
        }
    };
    if (D != undefined && D != "") {
        var B = E.find("select:eq(0)");
        var C = 0;
        if (D.startsWith("=")) {
            if (D.indexOf(".") != -1) {
                C = 0
            } else {
                C = 1
            }
        } else {
            if (D.startsWith("$")) {
                C = 3
            } else {
                C = 2
            }
        }
        B.selectpicker("val", C);
        A(E, B);
        if (C == 3) {
            E.find("select:eq(1)").selectpicker("val", D)
        } else {
            E.find("input").val(D)
        }
    } else {
        E.find("select").trigger("change")
    }
};
AnyExcel.prototype.getSelectGridCell = function () {
    var A = this.getGrid().selectedGridCell;
    if (A == null) {
        return null
    }
    return A
};
AnyExcel.prototype.getGrid = function () {
    var A = $(".tab-report-arg").attr("aria-expanded");
    var C = $(".tab-report-list").attr("aria-expanded");
    if (A == "true") {
        return argGrid
    } else {
        if (C == "true") {
            return grid
        } else {
            var B = grid.selectedGridCell;
            if (B != null && B.mark == 7) {
                return B.content.grid
            }
        }
    }
    return grid
};
AnyExcel.prototype.getSelectArgOrGridCell = function () {
    return this.getGrid().selectedGridCell
};
var Validate = {
    validation: function (B) {
        var A = true;
        B.find("input").each(function () {
            var E = $(this).attr("check-type");
            if (E == "required") {
                var D = $(this).val();
                if (D == "") {
                    A = false;
                    var C = $(this).attr("required-message");
                    C = C != "" ? C : "不能为空";
                    layer.alert(C);
                    return false
                }
            }
        });
        return A
    }
};
var Utils = {
    getString: function (A) {
        if (A == undefined || A == null) {
            return ""
        }
        return A
    }, containRow: function (B, A) {
        if (A == null) {
            return false
        }
        return A.indexOf(B) != -1
    }, containColumn: function (A, B) {
        if (B == null) {
            return false
        }
        return B.indexOf(A) != -1
    }, setRow: function (B, A) {
        if (Utils.containRow(B, A)) {
            A.splice(A.indexOf(B), 1)
        } else {
            A.push(B)
        }
    }, setColumn: function (A, B) {
        if (Utils.containColumn(A, B)) {
            B.splice(B.indexOf(A), 1)
        } else {
            B.push(A)
        }
    }, getRowsString: function (C) {
        var A = "";
        for (var B = 0; B < C.length; B++) {
            A += (C[B] - 1);
            if (B < C.length - 1) {
                A += ","
            }
        }
        return A
    }, getColumnsString: function (C) {
        var B = "";
        for (var A = 0; A < C.length; A++) {
            B += (C[A] - 1);
            if (A < C.length - 1) {
                B += ","
            }
        }
        return B
    }, getChartTypeName: function (A) {
        if (A == Constant.COLUMN) {
            return "column"
        } else {
            if (A == Constant.COLUMN_DIFF) {
                return "columndiff"
            } else {
                if (A == Constant.STACKED_COLUMN || A == Constant.STACKED_COLUMN_3D) {
                    return "stackedColumn"
                } else {
                    if (A == Constant.LINE || A == Constant.LINE_TIME) {
                        return "line"
                    } else {
                        if (A == Constant.STACKED_LINE) {
                            return "stackedLine"
                        } else {
                            if (A == Constant.PIE) {
                                return "pie"
                            } else {
                                if (A == Constant.ROSE) {
                                    return "rose"
                                } else {
                                    if (A == Constant.DONUT) {
                                        return "donut"
                                    } else {
                                        if (A == Constant.BAR || A == Constant.BAR_3D) {
                                            return "bar"
                                        } else {
                                            if (A == Constant.STACKED_BAR || A == Constant.STACKED_BAR_3D) {
                                                return "stackedBar"
                                            } else {
                                                if (A == Constant.AREA || A == Constant.AREA_TIME) {
                                                    return "area"
                                                } else {
                                                    if (A == Constant.STACKED_AREA) {
                                                        return "stackedArea"
                                                    } else {
                                                        if (A == Constant.PERCENT_DONUT) {
                                                            return "percentdonut"
                                                        } else {
                                                            if (A == Constant.PERCENT_BAR) {
                                                                return "percentbar"
                                                            } else {
                                                                if (A == Constant.SCATTER) {
                                                                    return "scatter"
                                                                } else {
                                                                    if (A == Constant.SCATTERXY) {
                                                                        return "scatterxy"
                                                                    } else {
                                                                        if (A == Constant.FUNNEL || A == Constant.FUNNEL_3D || A == Constant.FUNNEL_UP || A == Constant.FUNNEL_UP_3D) {
                                                                            return "funnel"
                                                                        } else {
                                                                            if (A == Constant.RADAR) {
                                                                                return "radar"
                                                                            } else {
                                                                                if (A == Constant.RADAR_AREA) {
                                                                                    return "radarArea"
                                                                                } else {
                                                                                    if (A == Constant.GAUGE) {
                                                                                        return "gauge"
                                                                                    } else {
                                                                                        if (A == Constant.MAP) {
                                                                                            return "map"
                                                                                        } else {
                                                                                            if (A == Constant.WORLD_MAP) {
                                                                                                return "worldmap"
                                                                                            } else {
                                                                                                if (A == Constant.STYLE_MAP) {
                                                                                                    return "styleMap"
                                                                                                } else {
                                                                                                    if (A == Constant.BMAP) {
                                                                                                        return "bmap"
                                                                                                    } else {
                                                                                                        if (A == Constant.COLUMN_LINE) {
                                                                                                            return "columnLine"
                                                                                                        } else {
                                                                                                            if (A == Constant.STACKED_COLUMN_LINE) {
                                                                                                                return "stackedColumnLine"
                                                                                                            } else {
                                                                                                                if (A == Constant.GANTT) {
                                                                                                                    return "gantt"
                                                                                                                } else {
                                                                                                                    if (A == Constant.WORD_CLOUD) {
                                                                                                                        return "wordCloud"
                                                                                                                    } else {
                                                                                                                        if (A == Constant.TREE_MAP) {
                                                                                                                            return "treeMap"
                                                                                                                        } else {
                                                                                                                            if (A == Constant.TREE) {
                                                                                                                                return "tree"
                                                                                                                            } else {
                                                                                                                                if (A == Constant.SUNBURST || A == Constant.SUNBURST_DONUT) {
                                                                                                                                    return "sunburst"
                                                                                                                                } else {
                                                                                                                                    if (A == Constant.MULTI) {
                                                                                                                                        return "multi"
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return ""
    }, isChart3D: function (A) {
        return A == Constant.COLUMN_3D || A == Constant.STACKED_COLUMN_3D || A == Constant.BAR_3D || A == Constant.STACKED_BAR_3D || A == Constant.BUBBLE_3D || A == Constant.FUNNEL_3D || A == Constant.FUNNEL_UP_3D || A == Constant.LEFT_RIGHT_YAXIS_COLUMNLINE_3D
    }, isXAxisTimeType: function (A) {
        return A == Constant.LINE_TIME || A == Constant.AREA_TIME
    }, isXAxisNumberType: function (A) {
        return A == Constant.SCATTER || A == Constant.SCATTERXY || A == Constant.BAR || A == Constant.BAR_3D || A == Constant.STACKED_BAR || A == Constant.STACKED_BAR_3D || A == Constant.GANTT
    }, isYAxisNumberType: function (A) {
        return A == Constant.SCATTER || A == Constant.SCATTERXY || A == Constant.COLUMN || A == Constant.COLUMN_3D || A == Constant.STACKED_COLUMN || A == Constant.STACKED_COLUMN_3D || A == Constant.LINE || A == Constant.LINE_TIME || A == Constant.AREA || A == Constant.AREA_TIME || A == Constant.STACKED_AREA || A == Constant.LEFT_YAXIS_COLUMNLINE || A == Constant.LEFT_RIGHT_YAXIS_COLUMNLINE || A == Constant.LEFT_RIGHT_YAXIS_COLUMNLINE_3D || A == Constant.MULTI
    }, isBubble: function (A) {
        return A == Constant.BUBBLE || A == Constant.BUBBLE_3D
    }, isCombination: function (A) {
        return A == Constant.LEFT_YAXIS_COLUMNLINE || A == Constant.LEFT_RIGHT_YAXIS_COLUMNLINE || A == Constant.LEFT_RIGHT_YAXIS_COLUMNLINE_3D
    }, isYAxisCategory: function (A) {
        return A == Constant.BAR || A == Constant.BAR_3D || A == Constant.STACKED_BAR || A == Constant.STACKED_BAR_3D || A == Constant.PERCENT_BAR || A == Constant.GANTT
    }, isPieHalf: function (A) {
        return A == Constant.PIE_HALF
    }, isDonut: function (A) {
        return A == Constant.DONUT
    }, isRightYAxisNumberType: function (A) {
        return A == Constant.LEFT_RIGHT_YAXIS_COLUMNLINE || A == Constant.LEFT_RIGHT_YAXIS_COLUMNLINE_3D
    }, isNotPie: function (A) {
        return A != Constant.PIE && A != Constant.PIE_HALF && A != Constant.DONUT
    }, isNotGauge: function (A) {
        return A != Constant.GAUGE
    }, getChartIdx: function (A) {
        if (A == "column" || A == "stackedColumn" || A == "columndiff") {
            return 0
        }
        if (A == "line" || A == "stackedLine") {
            return 1
        }
        if (A == "pie" || A == "donut" || A == "rose") {
            return 2
        }
        if (A == "bar" || A == "stackedBar") {
            return 3
        }
        if (A == "area" || A == "stackedArea") {
            return 4
        }
        if (A == "percentdonut" || A == "percentbar") {
            return 5
        }
        if (A == "scatter" || A == "scatterxy") {
            return 6
        }
        if (A == "funnel") {
            return 7
        }
        if (A == "radar") {
            return 8
        }
        if (A == "gauge") {
            return 9
        }
        if (A == "map" || A == "worldmap" || A == "styleMap") {
            return 10
        }
        if (A == "bmap") {
            return 11
        }
        if (A == "columnLine" || A == "multi") {
            return 12
        }
        if (A == "gantt") {
            return 13
        }
        if (A == "wordCloud") {
            return 14
        }
        if (A == "sunburst") {
            return 15
        }
        if (A == "tree" || A == "treeMap") {
            return 16
        }
    }
};
var cellSelectedFlag = false;
var formIdx = -1;
var cellSelectHandler = function (B) {
    var A = $(this).prev();
    var C = $(this).prev().val();
    $("#win-gridCell-select").find("input").val(C);
    layer.style(formIdx, {"display": "none"});
    cellSelectedFlag = true;
    layer.open({
        type: 1,
        title: "选择单元格",
        offset: "40px",
        zIndex: 1025,
        shadeClose: true,
        shade: false,
        area: ["300px", "130px"],
        content: $("#win-gridCell-select"),
        btn: ["确定", "取消"],
        yes: function (D) {
            var E = $("#win-gridCell-select").find("input").val();
            if (A.attr("cellType") == "1") {
                if (E.startsWith("=")) {
                    E = E.substr(1)
                }
            } else {
                if (A.attr("cellType") == "2") {
                    E = A.val() + (E.startsWith("=") ? E.substr(1) : E)
                }
            }
            A.val(E).trigger("change");
            layer.close(D)
        },
        end: function () {
            cellSelectedFlag = false;
            $("#win-gridCell-select").find("input").val("");
            anyExcel.getGrid().clearSelectBorderColor();
            layer.style(formIdx, {"display": "block"})
        }
    })
};
var treeSetting = {data: {simpleData: {enable: true}}};
var dscolumnTree = null;
var columnSelectHandler = function (B) {
    var A = $(this).prev();
    layer.open({
        type: 1,
        title: "选择数据列",
        offset: "40px",
        zIndex: 1025,
        shadeClose: true,
        shade: false,
        area: ["400px", "430px"],
        content: $("#win-dscolumn-select"),
        btn: ["确定", "取消"],
        yes: function (D) {
            if (dscolumnTree != null) {
                var G = dscolumnTree.getSelectedNodes();
                if (G.length > 0) {
                    var F = G[0];
                    var C = F.getParentNode();
                    if (A.attr("cellType") == "2") {
                        var E = C.name + "." + F.name;
                        A.val(A.val() + E).trigger("change")
                    } else {
                        A.val("=" + C.name + "." + F.name).trigger("change")
                    }
                }
            }
            layer.close(D)
        },
        success: function () {
            var C = new Array();
            var D = datasetTree.getNodes();
            for (var F = 0; F < D.length; F++) {
                var E = D[F];
                if (E.type == 1) {
                    continue
                }
                C.push(E)
            }
            if (dscolumnTree != null) {
                dscolumnTree.destroy()
            }
            dscolumnTree = $.fn.zTree.init($("#win-dscolumn-select-tree"), treeSetting, C)
        }
    })
};
var fxInputSelectHandler = function (C) {
    var B = $(this);
    var A = $(this).prev();
    if (A.val() != null) {
        $(this).data("fx", A.val())
    }
    fxHandler(B)
};
var fxSelectHandler = function (B) {
    var A = $(this);
    fxHandler(A)
};
var fxHandler = function (A) {
    formIdx = layer.open({
        type: 1,
        title: "函数",
        zIndex: 1025,
        shadeClose: true,
        shade: false,
        area: ["780px", "460px"],
        content: $("#win-fx"),
        btn: ["确定", "取消"],
        success: function () {
            var D = false;
            var C = false;
            var E = A.data("fx");
            if (E != undefined && E.startWith("=")) {
                var B = E.indexOf("(");
                if (B == -1) {
                    D = false
                } else {
                    D = true;
                    E = E.substring(1, E.indexOf("(")).toUpperCase()
                }
            }
            if (D) {
                $("#win-fx-forumula").find("li").each(function () {
                    if ($(this).text() == E) {
                        C = true;
                        var F = $(this).attr("ptype");
                        $("#win-fx-type").find("li[type=" + F + "]").trigger("click");
                        $(this).trigger("click");
                        $("#win-fx-forumula-demo").val(A.data("fx").substring(1))
                    }
                })
            }
            if (!C) {
                $("#win-fx-forumula-demo").val("");
                $("#win-fx-type").find("li:eq(0)").trigger("click")
            }
            $("#win-fx-forumula-demo").show()
        },
        yes: function (B) {
            if (A.attr("type") == "1") {
                A.prev().val("=" + $("#win-fx-forumula-demo").val());
                A.prev().trigger("change")
            } else {
                var D = anyExcel.getSelectGridCell();
                if (D != null) {
                    var E = $("#win-fx-forumula-demo").val();
                    D.setText("=" + E);
                    D.setCellMark("=" + E)
                } else {
                    if (divCoor.selectedTextDiv() != null) {
                        var C = divCoor.selectedTextDiv();
                        divCoor.setTextDivContent(C, "=" + $("#win-fx-forumula-demo").val())
                    }
                }
            }
            layer.close(B)
        }
    })
};
var alertError = function (B, A) {
    layer.open({
        type: 1,
        title: "错误信息",
        zIndex: 1025,
        area: ["580px", "400px"],
        content: $("#win-error"),
        btn: ["确定"],
        yes: function (C) {
            layer.close(C)
        },
        success: function () {
            $("#win-error").find("span").html(B);
            $("#win-error").find("p").html(A)
        }
    })
};
var datasetTree = null;
var datasetShareTree = null;
$(function () {
    var AB = new RptXml();
    var a = $("#win-data-set-sql");
    var Z = $("#win-data-set-produces");
    a.find("input[type=radio]").iCheck({radioClass: "iradio_minimal",});
    $("#win-data-set-type").find("div.dataset-restful").iCheck({radioClass: "iradio_minimal",});
    var AH = function (AV, AW, AY) {
        var AX = AY.find("tr:eq(1)").clone().show();
        AY.append(AX);
        AX.find("td:eq(0)").html(AV);
        var AU = new Date();
        AX.find("td:eq(1)").html(AU.format("yyyy-MM-dd HH:mm:ss"));
        AX.find("td:eq(2)").attr("filePath", AW);
        AX.find("td:eq(2)").find("a").click(function () {
            var AZ = $(this);
            var Aa = AZ.parent("td").attr("filePath");
            layer.confirm("您确定要删除该文件吗?", {icon: 3, shift: -1, title: "提示"}, function (Ab) {
                layer.close(Ab);
                $.ajax({
                    type: "POST",
                    url: PATH + "/rptMgr/delete_file.htm",
                    data: {filePath: Aa},
                    dataType: "json",
                    success: function (Ac) {
                        AZ.parent().parent().remove()
                    },
                    error: function (Ac) {
                        layer.alert("文件删除失败")
                    }
                })
            })
        })
    };
    var x = new UpFile(PATH + "/rptMgr/upload.htm", "file-excel-uploader", {}, function () {
    }, function (AV, AW) {
        var AU = $("#win-data-set-type").find("div.file-excel").find("table:eq(1)");
        AH(AV.name, AW._raw, AU)
    });
    x.init();
    var AC = new UpFile(PATH + "/rptMgr/upload.htm", "file-json-uploader", {}, function () {
    }, function (AV, AW) {
        var AU = $("#win-data-set-type").find("div.file-json").find("table:eq(1)");
        AH(AV.name, AW._raw, AU)
    });
    AC.init();
    var h = new UpFile(PATH + "/rptMgr/upload.htm", "file-xml-uploader", {}, function () {
    }, function (AV, AW) {
        var AU = $("#win-data-set-type").find("div.file-xml").find("table:eq(1)");
        AH(AV.name, AW._raw, AU)
    });
    h.init();
    $("#file-excel-uploader").find("a:eq(1)").click(function () {
        var AW = $("#win-data-set-type").find("div.file-excel").find("table:eq(1)");
        var Aa = AW.find("tr:eq(2)");
        if (Aa.length == 0) {
            layer.alert("请先上传数据文件");
            return false
        }
        var AZ = $("#win-data-set-type").find("div.file-excel").find("table:eq(0)");
        var AU = AZ.find("tr:eq(1)");
        var AV = AU.find("input").val();
        var AX = Aa.find("td:eq(2)").attr("filePath");
        if (!AX) {
            layer.alert("请先上传数据文件");
            return false
        }
        var AY = layer.load(2, {shade: [0.5, "#fff"]});
        $.ajax({
            type: "POST",
            url: PATH + "/rptMgr/query_file_data.htm",
            data: {filePath: AX, type: 2, startRow: AV},
            dataType: "json",
            success: function (Ac) {
                layer.close(AY);
                if (!Ac.success) {
                    alertError("运行错误", Ac.errorMsg);
                    return false
                }
                var Ab = Ac.model;
                E(Ab)
            },
            error: function (Ab) {
                layer.close(AY);
                layer.alert("数据集不正确请检查文件格式是否正确")
            }
        });
        return false
    });
    $("#file-json-uploader").find("a:eq(1)").click(function () {
        var AU = $("#win-data-set-type").find("div.file-json").find("table:eq(1)");
        var AX = AU.find("tr:eq(2)");
        if (AX.length == 0) {
            layer.alert("请先上传数据文件");
            return false
        }
        var AV = AX.find("td:eq(2)").attr("filePath");
        if (!AV) {
            layer.alert("请先上传数据文件");
            return false
        }
        var AW = layer.load(2, {shade: [0.5, "#fff"]});
        $.ajax({
            type: "POST",
            url: PATH + "/rptMgr/query_file_data.htm",
            data: {filePath: AV, type: 3, startRow: 0},
            dataType: "json",
            success: function (AZ) {
                layer.close(AW);
                if (!AZ.success) {
                    alertError("运行错误", AZ.errorMsg);
                    return false
                }
                var AY = AZ.model;
                E(AY)
            },
            error: function (AY) {
                layer.close(AW);
                layer.alert("数据集不正确请检查文件格式是否正确")
            }
        });
        return false
    });
    $("#file-xml-uploader").find("a:eq(1)").click(function () {
        var AU = $("#win-data-set-type").find("div.file-xml").find("table:eq(1)");
        var AX = AU.find("tr:eq(2)");
        if (AX.length == 0) {
            layer.alert("请先上传数据文件");
            return false
        }
        var AV = AX.find("td:eq(2)").attr("filePath");
        if (!AV) {
            layer.alert("请先上传数据文件");
            return false
        }
        var AW = layer.load(2, {shade: [0.5, "#fff"]});
        $.ajax({
            type: "POST",
            url: PATH + "/rptMgr/query_file_data.htm",
            data: {filePath: AV, type: 4, startRow: 0},
            dataType: "json",
            success: function (AZ) {
                layer.close(AW);
                if (!AZ.success) {
                    alertError("运行错误", AZ.errorMsg);
                    return false
                }
                var AY = AZ.model;
                E(AY)
            },
            error: function (AY) {
                layer.close(AW);
                layer.alert("数据集不正确请检查文件格式是否正确")
            }
        });
        return false
    });
    var E = function (AV) {
        var AW = AV.columns;
        var AU = AV.datas;
        layer.open({
            type: 1,
            title: "运行结果",
            zIndex: 1025,
            shadeClose: true,
            area: ["680px", "400px"],
            content: $("#win-sqlset-query"),
            btn: ["确定", "取消"],
            yes: function (AX) {
                layer.close(AX)
            },
            success: function () {
                var AX = $("#win-sqlset-query").find("table");
                AX.empty();
                var Aa = "<tr class='tbheader'>";
                if (AW) {
                    for (var AZ = 0; AZ < AW.length; AZ++) {
                        Aa += "<td>" + AW[AZ] + "</td>"
                    }
                }
                Aa += "</tr>";
                if (AU) {
                    for (var AZ = 0; AZ < AU.length; AZ++) {
                        var Ab = AU[AZ];
                        Aa += "<tr>";
                        for (var AY = 0; AY < Ab.length; AY++) {
                            Aa += "<td>" + Ab[AY] + "</td>"
                        }
                        Aa += "</tr>"
                    }
                }
                AX.append(Aa)
            }
        })
    };
    var t = $("#win-data-set").find("tr:eq(0)");
    var f = $("#win-data-set").find("ul.left-menu-ul");
    f.find("li").click(function () {
        f.find("li").removeClass("tl-hover");
        $(this).addClass("tl-hover");
        a.hide();
        Z.hide();
        $("#table-tree").parent().hide();
        $("#produces-tree").parent().hide();
        var AV = $(this).attr("type");
        if (AV == "0") {
            a.show();
            $("#table-tree").parent().show()
        } else {
            var AU = Z.find("tr:eq(0)");
            AU.find("select").trigger("change");
            Z.show();
            $("#produces-tree").parent().show()
        }
    });
    var t = a.find("tr:eq(1)");
    t.find("a").click(function () {
        if (!Validate.validation($("#win-data-set-sql"))) {
            return false
        }
        var Ak = a.find("tr:eq(0)");
        var AV = Ak.find("select").val();
        var Aj = a.find("tr:eq(2)");
        var AW = parseInt(Aj.find("input[type='radio']:checked").val());
        var Ag = c.getValue();
        var AU = R();
        var Al = new Array();
        var Ai = new Array();
        var Ah = new Array();
        var AZ = new Array();
        var Am = new Array();
        for (var Af = 0; Af < AU.length; Af++) {
            var AX = AU[Af];
            var Aa = AX.name != undefined ? AX.name : "";
            Al.push(Aa);
            var Ae = AX.dataType != undefined ? AX.dataType : 1;
            Ai.push(Ae);
            var Ac = AX.dateFormat != undefined ? AX.dateFormat : "";
            Ah.push(Ac);
            var Ab = AX.defaultValueType != undefined ? AX.defaultValueType : 0;
            AZ.push(Ab);
            var Ad = AX.defaultValue != undefined ? AX.defaultValue : "";
            Am.push(Ad)
        }
        var AY = layer.load(2, {shade: [0.5, "#fff"]});
        $.ajax({
            type: "POST",
            url:"./php/runningsql.php",
            data: {
                sourceName: AV,
                sql: Ag,
                parser: AW,
                argName: Al,
                argType: Ai,
                argDateFormat: Ah,
                argDefaultValueType: AZ,
                argDefaultValue: Am
            },
            dataType: "json",
            success: function (An) {
                layer.close(AY);
                if (!An.success) {
                    alertError("sql运行错误", An.errorMsg);
                    return false
                }
                var Ao = An.model;
                E(Ao)
            },
            error: function (An) {
                layer.close(AY);
                layer.alert("数据集不正确请检查数据源与SQL语句是否正确")
            }
        })
    });
    var AF = {data: {simpleData: {enable: true}}, callback: {onClick: AR}};
    var AO = {data: {simpleData: {enable: true}}, callback: {onClick: Q}};

    function AR(AV, AX, AW) {
        if (!AW.isParent) {
            var AU = AW.name;
            var AY = "select * from " + AU;
            c.setValue(AY)
        }
    }

    function Q(AW, AY, AX) {
        if (!AX.isParent) {
            var AV = AX.name;
            var AU = Z.find("tr:eq(2)").find("textarea");
            AU.val(AV)
        }
    }

    var w = null;
    var AI = function (AU) {
        $.ajax({
            type: "POST",
            url:"./php/querydbnames.php",
            data: {sourceName: AU},
            dataType: "json",
            success: function (AV) {
                if (w != null) {
                    w.destroy()
                }
                w = $.fn.zTree.init($("#table-tree"), AF, AV)
            },
            error: function (AV) {
                if (w != null) {
                    w.destroy()
                }
            }
        })
    };
    var d = null;
    var g = function (AU) {
        $.ajax({
            type: "POST",
            url: PATH + "/rptMgr/query_procedures.htm",
            data: {sourceName: AU},
            dataType: "json",
            success: function (AV) {
                if (d != null) {
                    d.destroy()
                }
                d = $.fn.zTree.init($("#produces-tree"), AO, AV)
            },
            error: function (AV) {
                if (d != null) {
                    d.destroy()
                }
            }
        })
    };
    var y = function () {
        var AU = a.find("tr:eq(1)");
        AU.find("input").val("");
        c.setValue("");
        var AV = a.find("tr:eq(3)");
        AV.find("input").val("");
        O()
    };
    var b = function () {
        var AU = Z.find("tr:eq(1)");
        AU.find("input").val("");
        var AV = Z.find("tr:eq(2)").find("textarea");
        AV.val("");
        var AW = Z.find("tr:eq(3)");
        AW.find("input").val("");
        G()
    };
    var z = function () {
        var AX = $("#win-data-set-type").find("div.file-excel").find("table:eq(0)");
        var AV = AX.find("tr:eq(0)");
        AV.find("input").val("");
        var AU = AX.find("tr:eq(1)");
        AU.find("input").val(2);
        var AW = $("#win-data-set-type").find("div.file-excel").find("table:eq(1)");
        AW.find("tr:gt(1)").remove()
    };
    var AP = function () {
        var AV = $("#win-data-set-type").find("div.file-json").find("table:eq(0)");
        var AU = AV.find("tr:eq(0)");
        AU.find("input").val("");
        var AW = $("#win-data-set-type").find("div.file-json").find("table:eq(1)");
        AW.find("tr:gt(1)").remove()
    };
    var p = function () {
        var AW = $("#win-data-set-type").find("div.file-xml").find("table:eq(0)");
        var AV = AW.find("tr:eq(0)");
        AV.find("input").val("");
        var AU = $("#win-data-set-type").find("div.file-xml").find("table:eq(1)");
        AU.find("tr:gt(1)").remove()
    };
    var S = function () {
        var AW = $("#win-data-set-type").find("div.dataset-restful").find("table:eq(0)");
        var AV = AW.find("tr:eq(0)");
        AV.find("input").val("");
        var AU = AW.find("tr:eq(1)");
        AU.find("input").val("");
        var Aa = AW.find("tr:eq(2)");
        Aa.find("input[value=0]").iCheck("check");
        var AZ = AW.find("tr:eq(3)");
        AZ.find("input[value=0]").iCheck("check");
        var AY = AW.find("tr:eq(4)");
        AY.find("input").val(1200000);
        var AX = AW.find("tr:eq(5)");
        AX.find("input").val(1200000)
    };
    var AT = function () {
        var AW = $("#win-data-set-type").find("div.dataset-java").find("table:eq(0)");
        var AV = AW.find("tr:eq(0)");
        AV.find("input").val("");
        var AU = AW.find("tr:eq(1)");
        AU.find("input").val("")
    };
    var M = function () {
        var AW = $("#win-data-set-type").find("div.dataset-definition").find("table:eq(0)");
        var AV = AW.find("tr:eq(0)");
        AV.find("input").val("");
        C = null;
        var AU = $("#win-data-set-type").find("div.dataset-definition").find("table:eq(1)");
        AU.find("tr").remove()
    };
    var AM = function (AX) {
        var AV = a.find("tr:eq(0)");
        AV.find("select").selectpicker("val", AX.sourceName);
        AV.find("select").trigger("change");
        var AU = a.find("tr:eq(1)");
        AU.find("input").val(AX.name);
        var AZ = a.find("tr:eq(2)");
        var AY = AX.parser ? AX.parser : 0;
        AZ.find("input[value=" + AY + "]").iCheck("check");
        c.setValue(AX.sql);
        var AW = a.find("tr:eq(4)");
        AW.find("input").val(AX.pageSize);
        AE(AX)
    };
    var A = function (AX) {
        var AW = Z.find("tr:eq(0)");
        AW.find("select").selectpicker("val", AX.sourceName);
        AW.find("select").trigger("change");
        var AU = Z.find("tr:eq(1)");
        AU.find("input").val(AX.name);
        var AV = Z.find("tr:eq(2)").find("textarea");
        AV.val(AX.sql);
        N(AX)
    };
    var K = function (AY, Ac, AW) {
        var AV = AY.name != undefined ? AY.name : "";
        var Ab = Ac.find("tr:eq(0)");
        Ab.find("input").val(AV);
        var Aa = Ac.find("tr:eq(1)");
        if (Aa.length > 0) {
            var Ae = AY.startRow != undefined ? AY.startRow : 2;
            Aa.find("input").val(Ae)
        }
        var AU = AY.files != undefined ? AY.files : new Array();
        for (var AZ = 0; AZ < AU.length; AZ++) {
            var Ad = AU[AZ];
            var AX = AW.find("tr:eq(1)").clone().show();
            AW.append(AX);
            AX.find("td:eq(0)").html(Ad.name);
            AX.find("td:eq(1)").html(Ad.fileTime);
            AX.find("td:eq(2)").attr("filePath", Ad.filePath);
            AX.find("td:eq(2)").find("a").click(function () {
                var Af = $(this);
                var Ag = Af.parent("td").attr("filePath");
                layer.confirm("您确定要删除该文件吗?", {icon: 3, shift: -1, title: "提示"}, function (Ah) {
                    layer.close(Ah);
                    $.ajax({
                        type: "POST",
                        url: PATH + "/rptMgr/delete_file.htm",
                        data: {filePath: Ag},
                        dataType: "json",
                        success: function (Ai) {
                            Af.parent().parent().remove()
                        },
                        error: function (Ai) {
                            layer.alert("文件删除失败")
                        }
                    })
                })
            })
        }
    };
    var Y = function (Ad) {
        var AX = $("#win-data-set-type").find("div.dataset-restful").find("table:eq(0)");
        var AU = Ad.name != undefined ? Ad.name : "";
        var Af = AX.find("tr:eq(0)");
        Af.find("input").val(AU);
        var AV = Ad.url != undefined ? Ad.url : "";
        var Ae = AX.find("tr:eq(1)");
        Ae.find("input").val(AV);
        var Ag = Ad.reqMethod != undefined ? Ad.reqMethod : 0;
        var Ac = AX.find("tr:eq(2)");
        Ac.find("input[value=" + Ag + "]").iCheck("check");
        var AY = Ad.returnMethod != undefined ? Ad.returnMethod : 0;
        var Ab = AX.find("tr:eq(3)");
        Ab.find("input[value=" + AY + "]").iCheck("check");
        var AW = Ad.readTimeout != undefined ? Ad.readTimeout : 1200000;
        var Aa = AX.find("tr:eq(4)");
        Aa.find("input").val(AW);
        var Ah = Ad.connectTimeout != undefined ? Ad.connectTimeout : 1200000;
        var AZ = AX.find("tr:eq(5)");
        AZ.find("input").val(Ah)
    };
    var T = function (AZ) {
        var AW = $("#win-data-set-type").find("div.dataset-java").find("table:eq(0)");
        var AX = AZ.name != undefined ? AZ.name : "";
        var AV = AW.find("tr:eq(0)");
        AV.find("input").val(AX);
        var AY = AZ.className != undefined ? AZ.className : "";
        var AU = AW.find("tr:eq(1)");
        AU.find("input").val(AY)
    };
    var AS = function (AX) {
        var AV = AX.name != undefined ? AX.name : "";
        var Ad = $("#win-data-set-type").find("div.dataset-definition").find("table:eq(0)");
        var AZ = Ad.find("tr:eq(0)");
        AZ.find("input").val(AV);
        var AU = $("#win-data-set-type").find("div.dataset-definition").find("table:eq(1)");
        C = AX.columns;
        if (C == undefined || C == null) {
            return
        }
        var Ac = "<tr class='tbheader'><td align='center'>序号</td>";
        for (var AY = 0; AY < C.length; AY++) {
            Ac += "<td>" + C[AY].name + "</td>"
        }
        Ac += "<td></td></tr>";
        AU.empty().append(Ac);
        var Aa = AX.datas;
        if (Aa != undefined) {
            for (var AY = 0; AY < Aa.length; AY++) {
                var Ab = "<tr><td>" + AU.find("tr").length + "</td>";
                for (var AW = 0; AW < Aa[AY].length; AW++) {
                    Ab += "<td><input type='text' style='width:80px;' value='" + Aa[AY][AW] + "'/></td>"
                }
                Ab += "<td><a href='javascript:void(0)' class='only-a'><i class='icon iconfont icon-delete red fa-lg'  style='font-size:14px'></i></a></td></tr>";
                AU.append(Ab);
                AU.find("tr:last").find("td:last").find("a").click(function () {
                    $(this).parent().parent().remove();
                    AU.find("tr:gt(0)").each(function (Ae) {
                        $(this).find("td:eq(0)").empty().html(Ae + 1)
                    })
                })
            }
        }
    };
    var o = function (AY) {
        var Ah = false;
        var Ap = a.find("tr:eq(0)");
        var AV = Ap.find("select").val();
        var Ao = a.find("tr:eq(1)");
        var Aa = Ao.find("input").val();
        var An = a.find("tr:eq(2)");
        var AW = parseInt(An.find("input[type='radio']:checked").val());
        var Ai = c.getValue();
        var Ak = a.find("tr:eq(4)");
        var Al = Ak.find("input").val();
        var AU = R();
        var Aq = new Array();
        var Am = new Array();
        var Aj = new Array();
        var AZ = new Array();
        var Ar = new Array();
        for (var Ag = 0; Ag < AU.length; Ag++) {
            var AX = AU[Ag];
            var Ab = AX.name != undefined ? AX.name : "";
            Aq.push(Ab);
            var Af = AX.dataType != undefined ? AX.dataType : 1;
            Am.push(Af);
            var Ad = AX.dateFormat != undefined ? AX.dateFormat : "";
            Aj.push(Ad);
            var Ac = AX.defaultValueType != undefined ? AX.defaultValueType : 0;
            AZ.push(Ac);
            var Ae = AX.defaultValue != undefined ? AX.defaultValue : "";
            Ar.push(Ae)
        }
        $.ajax({
            type: "POST",
            url: "./php/queryds.php",
            async: false,
            data: {
                sourceName: AV,
                sql: Ai,
                parser: AW,
                argName: Aq,
                argType: Am,
                argDateFormat: Aj,
                argDefaultValueType: AZ,
                argDefaultValue: Ar
            },
            dataType: "json",
            success: function (A5) {
                var At = A5.code;
                if (At == 304) {
                    alertError("数据集不正确请检查数据源与SQL语句是否正确!", A5.errorMsg);
                    return false
                }
                if (At == 305) {
                    var Ax = "数据列[ " + A5.errorMsg + ' ]不能包含"("请使用别名!';
                    alertError(Ax, A5.errorMsg);
                    return false
                }
                if (At == 306) {
                    var Aw = "数据列[ " + A5.errorMsg + ' ]不能包含")"请使用别名!';
                    alertError(Aw, A5.errorMsg);
                    return false
                }
                var A1 = $(".tab-source-share").attr("aria-expanded");
                var A3 = A1 == "true";
                var A2 = A3 ? datasetShareTree : datasetTree;
                var Av = A5.model;
                if (A2 != null) {
                    var A4 = A2.addNodes(null, 0, {"id": Aa, "name": Aa, "ds": true});
                    var A0 = A2.getNodesByParam("id", Aa);
                    if (A0.length > 0) {
                        for (var Az = 0; Az < Av.length; Az++) {
                            A2.addNodes(A0[0], {"id": Av[Az], "name": Av[Az], "pId": Aa})
                        }
                    }
                    var Ay = {};
                    Ay.name = Aa;
                    Ay.sourceName = AV;
                    Ay.sql = Ai;
                    Ay.type = 0;
                    Ay.parser = AW;
                    Ay.pageSize = Al;
                    Ay.columns = Av;
                    Ay.args = AU;
                    if (A3) {
                        $.ajax({
                            type: "POST",
                           // url: PATH + "/rptMgr/add_share_dataset.htm",
                            data: {dsName: Aa, dsContent: AB.stringifyDataSet(Ay)},
                            dataType: "text",
                            success: function (A6) {
                            },
                            error: function () {
                                layer.alert("新增共享数据集失败!")
                            }
                        });
                        var Au = report.shareDs ? report.shareDs : {};
                        Au[Aa] = Ay;
                        report.shareDs = Au
                    } else {
                        var As = report.ds ? report.ds : {};
                        As[Aa] = Ay;
                        report.ds = As
                    }
                }
                Ah = true;
                layer.close(AY)
            },
            error: function (As) {
                layer.alert("数据集不正确请检查数据源与SQL语句是否正确")
            }
        });
        return Ah
    };
    var j = function (Ad) {
        var Af = false;
        var Ac = Z.find("tr:eq(0)");
        var AW = Ac.find("select").val();
        var Ab = Z.find("tr:eq(1)");
        var AV = Ab.find("input").val();
        var Ah = Z.find("tr:eq(2)").find("textarea");
        var Aj = Ah.val();
        var Ae = X();
        var Ag = new Array();
        var Ai = new Array();
        var AX = new Array();
        var AY = new Array();
        for (var Aa = 0; Aa < Ae.length; Aa++) {
            Ag.push(Ae[Aa].dataType);
            Ai.push(Ae[Aa].modelType);
            var AU = Ae[Aa].dateFormat != undefined ? Ae[Aa].dateFormat : "";
            AX.push(AU);
            var AZ = Ae[Aa].dsDefaultValue != undefined ? Ae[Aa].dsDefaultValue : "";
            AY.push(AZ)
        }
        $.ajax({
            type: "POST",
            url: PATH + "/rptMgr/query_procedure_columns.htm",
            async: false,
            data: {sourceName: AW, sql: Aj, dataType: Ag, modelType: Ai, dateFormat: AX, dsDefaultValue: AY},
            dataType: "json",
            success: function (Ap) {
                var Ar = Ap.code;
                if (Ar == 304) {
                    alertError("数据集不正确请检查存储过程是否正确!", Ap.errorMsg);
                    return false
                }
                var Ao = Ap.model;
                if (Ao.length == 0) {
                    alertError("不存在数据列,请设置参数默认值,便于查询到数据生成数据集!", Ap.errorMsg);
                    return false
                }
                var An = datasetTree.addNodes(null, 0, {"id": AV, "name": AV, "ds": true});
                var Ak = datasetTree.getNodesByParam("id", AV);
                if (Ak.length > 0) {
                    for (var Am = 0; Am < Ao.length; Am++) {
                        datasetTree.addNodes(Ak[0], {"id": Ao[Am], "name": Ao[Am], "pId": AV})
                    }
                }
                var Al = {};
                Al.name = AV;
                Al.sourceName = AW;
                Al.sql = Aj;
                Al.type = 1;
                Al.columns = Ao;
                Al.args = Ae;
                var Aq = report.ds ? report.ds : {};
                Aq[AV] = Al;
                report.ds = Aq;
                Af = true;
                layer.close(Ad)
            },
            error: function (Ak) {
                layer.alert("数据集不正确请检查存储过程是否正确")
            }
        });
        return Af
    };
    var q = function (Ab, Ac, Aa, AY) {
        var Ad = false;
        var AX = Aa.find("tr:eq(0)");
        var AV = AX.find("input").val();
        var AW = Aa.find("tr:eq(1)");
        var Ag = 2;
        if (AW.length > 0) {
            Ag = AW.find("input").val()
        }
        var AU = new Array();
        AY.find("tr:gt(1)").each(function () {
            var Ai = $(this).find("td:eq(0)").html();
            var Ak = $(this).find("td:eq(1)").html();
            var Aj = $(this).find("td:eq(2)").attr("filePath");
            if (Aj != undefined) {
                var Ah = {filePath: Aj, fileTime: Ak, name: Ai};
                AU.push(Ah)
            }
        });
        if (AU.length == 0) {
            return false
        }
        var AZ = $(".tab-source-share").attr("aria-expanded");
        var Af = AZ == "true";
        var Ae = Af ? datasetShareTree : datasetTree;
        $.ajax({
            type: "POST",
            url: PATH + "/rptMgr/query_ds_columns.htm",
            async: false,
            data: {filePath: AU[0].filePath, type: Ac, startRow: Ag != "" ? Ag : 2},
            dataType: "json",
            success: function (Ap) {
                var Ai = Ap.code;
                if (Ai == 304) {
                    alertError("数据集不正确请检查文件格式是否正确!", Ap.errorMsg);
                    return false
                }
                var Aj = Ap.model;
                var Ao = Ae.addNodes(null, 0, {"id": AV, "name": AV, "ds": true});
                var An = Ae.getNodesByParam("id", AV);
                if (An.length > 0) {
                    for (var Al = 0; Al < Aj.length; Al++) {
                        Ae.addNodes(An[0], {"id": Aj[Al], "name": Aj[Al], "pId": AV})
                    }
                }
                var Am = {};
                Am.name = AV;
                Am.files = AU;
                Am.startRow = Ag;
                Am.type = Ac;
                Am.columns = Aj;
                if (Af) {
                    $.ajax({
                        type: "POST",
                      //  url: PATH + "/rptMgr/add_share_dataset.htm",
                        data: {dsName: AV, dsContent: AB.stringifyDataSet(Am)},
                        dataType: "text",
                        success: function (Aq) {
                        },
                        error: function () {
                            layer.alert("新增共享数据集失败!")
                        }
                    });
                    var Ak = report.shareDs ? report.shareDs : {};
                    Ak[AV] = Am;
                    report.shareDs = Ak
                } else {
                    var Ah = report.ds ? report.ds : {};
                    Ah[AV] = Am;
                    report.ds = Ah
                }
                Ad = true;
                layer.close(Ab)
            },
            error: function (Ah) {
                layer.alert("数据集不正确请检查存储过程是否正确")
            }
        });
        return Ad
    };
    var r = function (AW) {
        var Ae = false;
        var Af = $("#win-data-set-type").find("div.dataset-restful").find("table:eq(0)");
        var Al = Af.find("tr:eq(0)");
        var AX = Al.find("input").val();
        var Ak = Af.find("tr:eq(1)");
        var AV = Ak.find("input").val();
        var Aj = Af.find("tr:eq(2)");
        var AY = parseInt(Aj.find("input[type='radio']:checked").val());
        var Ai = Af.find("tr:eq(3)");
        var AZ = parseInt(Ai.find("input[type='radio']:checked").val());
        var Ah = Af.find("tr:eq(4)");
        var Ab = Ah.find("input").val();
        var Ag = Af.find("tr:eq(5)");
        var Ad = Ag.find("input").val();
        var Aa = $(".tab-source-share").attr("aria-expanded");
        var AU = Aa == "true";
        var Ac = AU ? datasetShareTree : datasetTree;
        $.ajax({
            type: "POST",
            url: PATH + "/rptMgr/query_ds_columns.htm",
            async: false,
            data: {url: AV, reqMethod: AY, type: 5, returnMethod: AZ},
            dataType: "json",
            success: function (Au) {
                var An = Au.code;
                if (An == 304) {
                    alertError("数据集不正确请检查文件格式是否正确!", Au.errorMsg);
                    return false
                }
                var Ao = Au.model;
                var At = Ac.addNodes(null, 0, {"id": AX, "name": AX, "ds": true});
                var As = Ac.getNodesByParam("id", AX);
                if (As.length > 0) {
                    for (var Aq = 0; Aq < Ao.length; Aq++) {
                        Ac.addNodes(As[0], {"id": Ao[Aq], "name": Ao[Aq], "pId": AX})
                    }
                }
                var Ar = {};
                Ar.name = AX;
                Ar.url = AV;
                Ar.reqMethod = AY;
                Ar.returnMethod = AZ;
                Ar.type = 5;
                Ar.columns = Ao;
                Ar.readTimeout = Ab;
                Ar.connectTimeout = Ad;
                if (AU) {
                    $.ajax({
                        type: "POST",
                        //url: PATH + "/rptMgr/add_share_dataset.htm",
                        data: {dsName: AX, dsContent: AB.stringifyDataSet(Ar)},
                        dataType: "text",
                        success: function (Av) {
                        },
                        error: function () {
                            layer.alert("新增共享数据集失败!")
                        }
                    });
                    var Ap = report.shareDs ? report.shareDs : {};
                    Ap[AX] = Ar;
                    report.shareDs = Ap
                } else {
                    var Am = report.ds ? report.ds : {};
                    Am[AX] = Ar;
                    report.ds = Am
                }
                Ae = true;
                layer.close(AW)
            },
            error: function (Am) {
                layer.alert("数据集不正确请检查存储过程是否正确")
            }
        });
        return Ae
    };
    var V = function (AY) {
        var Ab = false;
        var AU = $("#win-data-set-type").find("div.dataset-java").find("table:eq(0)");
        var AX = AU.find("tr:eq(0)");
        var AV = AX.find("input").val();
        var AW = AU.find("tr:eq(1)");
        var Aa = AW.find("input").val();
        var AZ = $(".tab-source-share").attr("aria-expanded");
        var Ad = AZ == "true";
        var Ac = Ad ? datasetShareTree : datasetTree;
        $.ajax({
            type: "POST",
            url: PATH + "/rptMgr/query_ds_columns.htm",
            async: false,
            data: {className: Aa, type: 7},
            dataType: "json",
            success: function (Am) {
                var Af = Am.code;
                if (Af == 304) {
                    alertError("数据集不正确请检查文件格式是否正确!", Am.errorMsg);
                    return false
                }
                var Ag = Am.model;
                var Al = Ac.addNodes(null, 0, {"id": AV, "name": AV, "ds": true});
                var Ak = Ac.getNodesByParam("id", AV);
                if (Ak.length > 0) {
                    for (var Ai = 0; Ai < Ag.length; Ai++) {
                        Ac.addNodes(Ak[0], {"id": Ag[Ai], "name": Ag[Ai], "pId": AV})
                    }
                }
                var Aj = {};
                Aj.name = AV;
                Aj.className = Aa;
                Aj.type = 7;
                Aj.columns = Ag;
                if (Ad) {
                    $.ajax({
                        type: "POST",
                      //  url: PATH + "/rptMgr/add_share_dataset.htm",
                        data: {dsName: AV, dsContent: AB.stringifyDataSet(Aj)},
                        dataType: "text",
                        success: function (An) {
                        },
                        error: function () {
                            layer.alert("新增共享数据集失败!")
                        }
                    });
                    var Ah = report.shareDs ? report.shareDs : {};
                    Ah[AV] = Aj;
                    report.shareDs = Ah
                } else {
                    var Ae = report.ds ? report.ds : {};
                    Ae[AV] = Aj;
                    report.ds = Ae
                }
                Ab = true;
                layer.close(AY)
            },
            error: function (Ae) {
                layer.alert("数据集不正确请检查存储过程是否正确")
            }
        });
        return Ab
    };
    var D = function (Ad) {
        var Ai = $("#win-data-set-type").find("div.dataset-definition").find("table:eq(0)");
        var Ac = Ai.find("tr:eq(0)");
        var AV = Ac.find("input").val();
        var AU = $("#win-data-set-type").find("div.dataset-definition").find("table:eq(1)");
        var Ae = $(".tab-source-share").attr("aria-expanded");
        var Ag = Ae == "true";
        var Af = Ag ? datasetShareTree : datasetTree;
        var Ab = new Array();
        AU.find("tr:gt(0)").each(function () {
            var Al = new Array();
            var Ak = $(this).children("td");
            for (var Aj = 1; Aj < Ak.length - 1; Aj++) {
                var Am = $(Ak[Aj]).find("input").val();
                Al.push(Am)
            }
            Ab.push(Al)
        });
        if (C != null) {
            var Ah = Af.addNodes(null, 0, {"id": AV, "name": AV, "ds": true});
            var Aa = Af.getNodesByParam("id", AV);
            if (Aa.length > 0) {
                for (var AZ = 0; AZ < C.length; AZ++) {
                    Af.addNodes(Aa[0], {"id": C[AZ].name, "name": C[AZ].name, "pId": AV})
                }
            }
        }
        var AY = {};
        AY.name = AV;
        AY.type = 6;
        AY.columns = C;
        AY.datas = Ab;
        if (Ag) {
            $.ajax({
                type: "POST",
               // url: PATH + "/rptMgr/add_share_dataset.htm",
                data: {dsName: AV, dsContent: AB.stringifyDataSet(AY)},
                dataType: "text",
                success: function (Aj) {
                },
                error: function () {
                    layer.alert("新增共享数据集失败!")
                }
            });
            var AX = report.shareDs ? report.shareDs : {};
            AX[AV] = AY;
            report.shareDs = AX
        } else {
            var AW = report.ds ? report.ds : {};
            AW[AV] = AY;
            report.ds = AW
        }
        layer.close(Ad);
        return true
    };
    var l = $(window).width();
    var s = $(window).height();
    var v = Math.min(860, l - 10);
    var AA = Math.min(520, s - 10);
    $("li.tl-dataset-add").click(function () {
        layer.open({
            type: 1,
            title: "数据集",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: [v + "px", AA + "px"],
            content: $("#win-data-set-type"),
            btn: ["确定", "取消", "返回"],
            yes: function (AY) {
                var Ad = $("#win-data-set-type").find("div.dataType").find("li.at");
                var Aa = false;
                if (Ad.length > 0) {
                    var AZ = Ad.attr("dataType");
                    if (AZ == "0") {
                        if (Validate.validation($("#win-data-set-sql"))) {
                            Aa = o(AY)
                        }
                    } else {
                        if (AZ == "1") {
                            if (Validate.validation($("#win-data-set-produces"))) {
                                Aa = j(AY)
                            }
                        } else {
                            if (AZ == "2") {
                                if (Validate.validation($("#win-data-set-type").find("div.file-excel"))) {
                                    var AW = $("#win-data-set-type").find("div.file-excel").find("table:eq(0)");
                                    var AV = $("#win-data-set-type").find("div.file-excel").find("table:eq(1)");
                                    Aa = q(AY, 2, AW, AV)
                                }
                            } else {
                                if (AZ == "3") {
                                    if (Validate.validation($("#win-data-set-type").find("div.file-json"))) {
                                        var Ac = $("#win-data-set-type").find("div.file-json").find("table:eq(0)");
                                        var AU = $("#win-data-set-type").find("div.file-json").find("table:eq(1)");
                                        Aa = q(AY, 3, Ac, AU)
                                    }
                                } else {
                                    if (AZ == "4") {
                                        if (Validate.validation($("#win-data-set-type").find("div.file-xml"))) {
                                            var AX = $("#win-data-set-type").find("div.file-xml").find("table:eq(0)");
                                            var Ab = $("#win-data-set-type").find("div.file-xml").find("table:eq(1)");
                                            Aa = q(AY, 4, AX, Ab)
                                        }
                                    } else {
                                        if (AZ == "5") {
                                            if (Validate.validation($("#win-data-set-type").find("div.dataset-restful"))) {
                                                Aa = r(AY)
                                            }
                                        } else {
                                            if (AZ == "6") {
                                                if (Validate.validation($("#win-data-set-type").find("div.dataset-definition"))) {
                                                    Aa = D(AY)
                                                }
                                            } else {
                                                if (AZ == "7") {
                                                    if (Validate.validation($("#win-data-set-type").find("div.dataset-java"))) {
                                                        Aa = V(AY)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (Aa) {
                    layer.close(AY)
                }
            },
            btn3: function () {
                var AU = $("#win-data-set-type").parent().parent();
                AU.find("div.layui-layer-btn").find("a:eq(0)").hide();
                AU.find("div.layui-layer-btn").find("a:eq(2)").hide();
                $("#win-data-set-type").children("div").hide();
                $("#win-data-set-type").children(":eq(0)").show();
                return false
            },
            success: function () {
                var AU = $("#win-data-set-type").parent().parent();
                AU.find("div.layui-layer-btn").find("a:eq(0)").hide();
                AU.find("div.layui-layer-btn").find("a:eq(2)").hide();
                $("#win-data-set-type").children("div").hide();
                $("#win-data-set-type").children(":eq(0)").show()
            }
        })
    });
    $("#win-data-set-type").find("div.dataType").find("li").click(function () {
        var AW = $(this).attr("dataType");
        $("#win-data-set-type").find("div.dataType").find("li").removeClass("at");
        $("#win-data-set-type").find("div.dataType").hide();
        var AX = $("#win-data-set-type").parent().parent();
        AX.find("div.layui-layer-btn").find("a").show();
        $(this).addClass("at");
        if (AW == "0") {
            $("#win-data-set-type").find("div.sql-query").show();
            y();
            var AU = a.find("tr:eq(0)");
            var AV = AU.find("select").val();
            AI(AV);
            c.refresh()
        } else {
            if (AW == "1") {
                $("#win-data-set-type").find("div.sql-produce").show();
                b();
                var AU = Z.find("tr:eq(0)");
                var AV = AU.find("select").val();
                g(AV)
            } else {
                if (AW == "2") {
                    z();
                    $("#win-data-set-type").find("div.file-excel").show()
                } else {
                    if (AW == "3") {
                        AP();
                        $("#win-data-set-type").find("div.file-json").show()
                    } else {
                        if (AW == "4") {
                            p();
                            $("#win-data-set-type").find("div.file-xml").show()
                        } else {
                            if (AW == "5") {
                                S();
                                $("#win-data-set-type").find("div.dataset-restful").show()
                            } else {
                                if (AW == "6") {
                                    M();
                                    $("#win-data-set-type").find("div.dataset-definition").show()
                                } else {
                                    if (AW == "7") {
                                        AT();
                                        $("#win-data-set-type").find("div.dataset-java").show()
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    var u = a.find("tr:eq(0)");
    u.find("select").change(function () {
        AI($(this).val())
    });
    Z.find("tr:eq(0)").find("select").change(function () {
        g($(this).val())
    });
    var W = {
        curTarget: null, curTmpTarget: null, dragTree2Dom: function (AV, AU) {
            return !AU[0].isParent
        }, prevTree: function (AV, AU, AW) {
            return !AW.isParent && AW.parentTId == AU[0].parentTId
        }, nextTree: function (AV, AU, AW) {
            return !AW.isParent && AW.parentTId == AU[0].parentTId
        }, innerTree: function (AV, AU, AW) {
            return AW != null && AW.isParent && AW.tId == AU[0].parentTId
        }, dragMove: function (AY, AW, AV) {
            var AX = null, AU = "dom_" + AV[0].pId;
            if (AY.target.id == AU) {
                AX = $(AY.target)
            } else {
                AX = $(AY.target).parent("#" + AU);
                if (!AX.get(0)) {
                    AX = null
                }
            }
            $(".domBtnDiv .active").removeClass("active");
            if (AX) {
                AX.addClass("active")
            }
        }, dropTree2Dom: function (Ab, AY, AX, Ac, Ah) {
            var AZ = $(".tab-report-arg").attr("aria-expanded");
            if (AZ == "true") {
                return false
            }
            var AV = AX[0].name;
            var AU = AX[0].getParentNode().name;
            var Ae = $("#left-column-value-type").find("input[type=radio]:checked").val();
            var Ad = "=" + AU + "." + AV;
            if (Ae == "2") {
                Ad = "=group(" + (AU + "." + AV) + ")"
            } else {
                if (Ae == "3") {
                    Ad = "=sum(" + (AU + "." + AV) + ")"
                } else {
                    if (Ae == "4") {
                        Ad = "=avg(" + (AU + "." + AV) + ")"
                    } else {
                        if (Ae == "5") {
                            Ad = "=max(" + (AU + "." + AV) + ")"
                        } else {
                            if (Ae == "6") {
                                Ad = "=min(" + (AU + "." + AV) + ")"
                            }
                        }
                    }
                }
            }
            var Aa = $(Ab.target);
            if (Aa.is("span")) {
                var AW = Aa.parent().parent().parent();
                if (AW.is("td")) {
                    AW.empty();
                    var Af = AW.data("gc");
                    var Ag = AX[0].type == 1 ? AV : Ad;
                    Af.acceptDsColumn(Ag)
                }
            }
            if (Aa.parent().parent().is("td")) {
                var AW = Aa.parent().parent();
                AW.empty();
                var Af = AW.data("gc");
                var Ag = AX[0].type == 1 ? AV : Ad;
                Af.acceptDsColumn(Ag)
            } else {
                if (Aa.is("td")) {
                    var Af = Aa.data("gc");
                    var Ag = AX[0].type == 1 ? AV : Ad;
                    Af.acceptDsColumn(Ag)
                }
            }
        }
    };
    var e = {
        edit: {
            enable: true,
            showRemoveBtn: n,
            showRenameBtn: AN,
            renameTitle: "更新数据集",
            removeTitle: "删除数据集",
            drag: {prev: W.prevTree, next: W.nextTree, inner: W.innerTree}
        },
        data: {simpleData: {enable: true}},
        callback: {
            beforeDrag: W.dragTree2Dom,
            onDrop: W.dropTree2Dom,
            onDragMove: W.dragMove,
            beforeEditName: AQ,
            beforeRemove: AL
        },
        view: {selectedMulti: false}
    };

    function AQ(AY, AX) {
        var AU = $(".tab-source-share").attr("aria-expanded");
        var AW = AU == "true";
        var AZ = AX.name;
        var AV;
        layer.open({
            type: 1,
            title: "数据集",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: [v + "px", AA + "px"],
            content: $("#win-data-set-type"),
            btn: ["确定", "取消"],
            yes: function (Ag) {
                var Ai = AW ? datasetShareTree : datasetTree;
                var Al = Ai.getNodesByParam("id", AZ);
                if (AW) {
                    $.ajax({
                        type: "POST",
                       // url: PATH + "/rptMgr/del_share_dataset.htm",
                        data: {dsName: AZ},
                        dataType: "text",
                        success: function (Am) {
                        },
                        error: function () {
                            layer.alert("数据集更新失败!")
                        }
                    });
                    var Ad = report.shareDs ? report.shareDs : {};
                    Ad[AZ] = undefined
                } else {
                    var Ab = report.ds ? report.ds : {};
                    Ab[AZ] = undefined
                }
                var Ah = false;
                if (AV == 0) {
                    if (Validate.validation($("#win-data-set-sql"))) {
                        Ah = o(Ag)
                    }
                } else {
                    if (AV == 1) {
                        if (Validate.validation($("#win-data-set-produces"))) {
                            Ah = j(Ag)
                        }
                    } else {
                        if (AV == 2) {
                            if (Validate.validation($("#win-data-set-type").find("div.file-excel"))) {
                                var Ae = $("#win-data-set-type").find("div.file-excel").find("table:eq(0)");
                                var Ac = $("#win-data-set-type").find("div.file-excel").find("table:eq(1)");
                                Ah = q(Ag, 2, Ae, Ac)
                            }
                        } else {
                            if (AV == 3) {
                                if (Validate.validation($("#win-data-set-type").find("div.file-json"))) {
                                    var Ak = $("#win-data-set-type").find("div.file-json").find("table:eq(0)");
                                    var Aa = $("#win-data-set-type").find("div.file-json").find("table:eq(1)");
                                    Ah = q(Ag, 3, Ak, Aa)
                                }
                            } else {
                                if (AV == 4) {
                                    if (Validate.validation($("#win-data-set-type").find("div.file-xml"))) {
                                        var Af = $("#win-data-set-type").find("div.file-xml").find("table:eq(0)");
                                        var Aj = $("#win-data-set-type").find("div.file-xml").find("table:eq(1)");
                                        Ah = q(Ag, 4, Af, Aj)
                                    }
                                } else {
                                    if (AV == 5) {
                                        if (Validate.validation($("#win-data-set-type").find("div.dataset-restful"))) {
                                            Ah = r(Ag)
                                        }
                                    } else {
                                        if (AV == 6) {
                                            if (Validate.validation($("#win-data-set-type").find("div.dataset-definition"))) {
                                                Ah = D(Ag)
                                            }
                                        } else {
                                            if (AV == 7) {
                                                if (Validate.validation($("#win-data-set-type").find("div.dataset-java"))) {
                                                    Ah = V(Ag)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (Ah) {
                    if (Al.length > 0) {
                        Ai.removeNode(Al[0])
                    }
                    layer.close(Ag)
                }
            },
            success: function () {
                var Af = AW ? report.shareDs : report.ds;
                if (Af != undefined) {
                    var Ah = Af[AZ];
                    if (Ah) {
                        AV = Ah.type;
                        $("#win-data-set-type").children("div").hide();
                        if (Ah.type == 0) {
                            $("#win-data-set-type").find("div.sql-query").show();
                            y();
                            AM(Ah)
                        } else {
                            if (Ah.type == 1) {
                                $("#win-data-set-type").find("div.sql-produce").show();
                                b();
                                A(Ah)
                            } else {
                                if (Ah.type == 2) {
                                    $("#win-data-set-type").find("div.file-excel").show();
                                    var Ag = $("#win-data-set-type").find("div.file-excel").find("table:eq(0)");
                                    var Ab = $("#win-data-set-type").find("div.file-excel").find("table:eq(1)");
                                    z();
                                    K(Ah, Ag, Ab)
                                } else {
                                    if (Ah.type == 3) {
                                        $("#win-data-set-type").find("div.file-json").show();
                                        AP();
                                        var Ac = $("#win-data-set-type").find("div.file-json").find("table:eq(0)");
                                        var Aa = $("#win-data-set-type").find("div.file-json").find("table:eq(1)");
                                        K(Ah, Ac, Aa)
                                    } else {
                                        if (Ah.type == 4) {
                                            $("#win-data-set-type").find("div.file-xml").show();
                                            p();
                                            var Ad = $("#win-data-set-type").find("div.file-xml").find("table:eq(0)");
                                            var Ae = $("#win-data-set-type").find("div.file-xml").find("table:eq(1)");
                                            K(Ah, Ad, Ae)
                                        } else {
                                            if (Ah.type == 5) {
                                                $("#win-data-set-type").find("div.dataset-restful").show();
                                                Y(Ah)
                                            } else {
                                                if (Ah.type == 6) {
                                                    $("#win-data-set-type").find("div.dataset-definition").show();
                                                    AS(Ah)
                                                } else {
                                                    if (Ah.type == 7) {
                                                        $("#win-data-set-type").find("div.dataset-java").show();
                                                        T(Ah)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return false
    }

    function AL(AZ, AY) {
        var AV = $(".tab-source-share").attr("aria-expanded");
        var AW = AV == "true";
        var Aa = AY.name;
        if (AW) {
            $.ajax({
                type: "POST",
              //  url: PATH + "/rptMgr/del_share_dataset.htm",
                data: {dsName: Aa},
                dataType: "text",
                success: function (Ab) {
                },
                error: function () {
                    layer.alert("数据集删除失败!")
                }
            });
            var AU = report.shareDs ? report.shareDs : {};
            AU[Aa] = undefined
        } else {
            var AX = report.ds ? report.ds : {};
            AX[Aa] = undefined
        }
    }

    function n(AV, AU) {
        return AU.ds != undefined
    }

    function AN(AV, AU) {
        return AU.ds != undefined
    }

    var I = [{id: "_var", pId: 0, name: "内置变量", type: 1}, {
        id: "_userId",
        pId: "_var",
        name: "${_userId}",
        type: 1
    }, {id: "_userName", pId: "_var", name: "${_userName}", type: 1}, {
        id: "_personName",
        pId: "_var",
        name: "${_personName}",
        type: 1
    }, {id: "_orgId", pId: "_var", name: "${_orgId}", type: 1}, {
        id: "_orgName",
        pId: "_var",
        name: "${_orgName}",
        type: 1
    }, {id: "_userPhone", pId: "_var", name: "${_userPhone}", type: 1}, {
        id: "_userEmail",
        pId: "_var",
        name: "${_userEmail}",
        type: 1
    }];
    datasetTree = $.fn.zTree.init($("#dataset-tree"), e, I);
    $("li.tl-dataset-share-add").click(function () {
        $("li.tl-dataset-add").trigger("click")
    });
    $.ajax({
        //type: "POST", url: PATH + "/rptMgr/query_share_dataset.htm", dataType: "json", success: function (Ab) {
        //    var AU = {};
        //    var AZ = new Array();
        //    for (var AY = 0; AY < Ab.length; AY++) {
        //        var Ac = Ab[AY];
        //        var Aa = {id: Ac.dsName, name: Ac.dsName, ds: true};
        //        AZ.push(Aa);
        //        var AX = AB.parseShareDataSet(Ac.dsContent);
        //        AU[Ac.dsName] = AX;
        //        var AV = AX.columns;
        //        for (var AW = 0; AW < AV.length; AW++) {
        //            if (AX.type == 6) {
        //                Aa = {id: AV[AW].name, name: AV[AW].name, pId: Ac.dsName};
        //                AZ.push(Aa)
        //            } else {
        //                Aa = {id: AV[AW], name: AV[AW], pId: Ac.dsName};
        //                AZ.push(Aa)
        //            }
        //        }
        //    }
        //    report.shareDs = AU;
        //    datasetShareTree = $.fn.zTree.init($("#dataset-share-tree"), e, AZ)
        //}
    });
    var H = {data: {simpleData: {enable: true}}};
    var AG = null;
    var AK = function (AY) {
        if (!AY) {
            return
        }
        var Aa = AY.name;
        var AX = datasetTree.addNodes(null, 0, {"id": Aa, "name": Aa, "ds": true});
        var AU = datasetTree.getNodesByParam("id", Aa);
        var AW = AY.columns;
        if (AW && AW.length > 0) {
            for (var AV = 0; AV < AW.length; AV++) {
                if (AY.type == 6) {
                    datasetTree.addNodes(AU[0], {"id": AW[AV].name, "name": AW[AV].name, "pId": Aa})
                } else {
                    datasetTree.addNodes(AU[0], {"id": AW[AV], "name": AW[AV], "pId": Aa})
                }
            }
        }
        var AZ = report.ds ? report.ds : {};
        AZ[Aa] = AY;
        report.ds = AZ
    };
    $("li.tl-dataset-add-from-share").click(function () {
        layer.open({
            type: 1,
            title: "引用共享数据集",
            zIndex: 1025,
            shadeClose: true,
            area: ["480px", "400px"],
            content: $("#win-dataset-from-share"),
            btn: ["确定", "取消"],
            yes: function (AW) {
                if (AG != null) {
                    var AV = AG.getSelectedNodes();
                    if (AV.length > 0) {
                        var AX = AV[0];
                        var AU = report.shareDs;
                        if (AU) {
                            AK(AU[AX.name])
                        }
                    }
                }
                layer.close(AW)
            },
            success: function () {
                var AU = report.shareDs;
                if (AU) {
                    var AZ = new Array();
                    for (var Aa in AU) {
                        var AX = AU[Aa];
                        var AY = {id: Aa, name: Aa, ds: true};
                        AZ.push(AY);
                        var AW = AX.columns;
                        if (AW && AW.length > 0) {
                            for (var AV = 0; AV < AW.length; AV++) {
                                if (AX.type == 6) {
                                    AY = {id: AW[AV].name, name: AW[AV].name, pId: Aa}
                                } else {
                                    AY = {id: AW[AV], name: AW[AV], pId: Aa}
                                }
                                AZ.push(AY)
                            }
                        }
                    }
                    AG = $.fn.zTree.init($("#win-dataset-from-share-tree"), H, AZ)
                }
            }
        })
    });
    var B = Z.find("ul.top-menu");
    var F = Z.find("table");
    B.find("li").click(function () {
        var AY = F.find("tr:eq(1)").clone();
        AY.find("select").addClass("selectpicker").selectpicker("refresh");
        AY.show();
        var AZ = AY.find("td:eq(0)");
        AZ.html(F.find("tr").length - 1);
        F.append(AY);
        var AX = AY.find("td:eq(2)");
        AX.find("select:eq(0)").change(function () {
            var Ac = $(this).parent().parent();
            var Ab = parseInt($(this).val());
            if (Ab == 5) {
                Ac.next().show()
            } else {
                Ac.next().hide()
            }
        });
        var AV = AY.find("td:eq(3)");
        var AW = AV.find("select");
        var Aa = argGrid.getSelectComps();
        U(AW, Aa);
        var AU = AY.find("td:eq(6)");
        AU.find("a").click(function () {
            $(this).parent().parent().remove();
            m()
        })
    });
    var m = function () {
        F.find("tr:gt(0)").each(function (AU) {
            var AV = $(this).find("td:eq(0)");
            AV.html(AU)
        })
    };
    var G = function () {
        F.find("tr:gt(1)").remove()
    };
    var N = function (Ae) {
        if (!Ae) {
            return
        }
        var Ag = Ae.args;
        if (Ag) {
            for (var Af = 0; Af < Ag.length; Af++) {
                var Aj = Ag[Af];
                var Ab = F.find("tr:eq(1)").clone();
                Ab.find("select").addClass("selectpicker").selectpicker("refresh");
                Ab.show();
                var Ah = Ab.find("td:eq(0)");
                Ah.html(F.find("tr").length - 1);
                var Ac = Ab.find("td:eq(1)");
                var AU = Aj.name != undefined ? Aj.name : "";
                Ac.find("input").val(AU);
                var Aa = Ab.find("td:eq(2)");
                var Ai = Aa.find("select:eq(0)");
                Ai.change(function () {
                    var Al = $(this).parent().parent();
                    var Ak = parseInt($(this).val());
                    if (Ak == 5) {
                        Al.next().show()
                    } else {
                        Al.next().hide()
                    }
                });
                if (Aj.dataType != undefined) {
                    Ai.selectpicker("val", Aj.dataType);
                    Ai.trigger("change")
                }
                if (Aj.dateFormat != undefined) {
                    Aa.find("select:eq(1)").selectpicker("val", Aj.dateFormat)
                }
                var AZ = Ab.find("td:eq(3)");
                var AY = argGrid.getSelectComps();
                U(AZ.find("select"), AY);
                if (Aj.value) {
                    AZ.find("select").selectpicker("val", Aj.value)
                }
                var AX = Ab.find("td:eq(4)");
                var Ad = Aj.dsDefaultValue != undefined ? Aj.dsDefaultValue : "";
                AX.find("input").val(Ad);
                var AW = Ab.find("td:eq(5)");
                if (Aj.modelType) {
                    AW.find("select").selectpicker("val", Aj.modelType)
                }
                F.append(Ab);
                var AV = Ab.find("td:eq(6)");
                AV.find("a").click(function () {
                    $(this).parent().parent().remove();
                    m()
                })
            }
        }
    };
    var U = function (AX, AY) {
        AX.empty();
        for (var AW = 0; AW < AY.length; AW++) {
            var AU = AY[AW];
            var AV = $("<option></option>").attr("value", AU).html(AU);
            AX.append(AV)
        }
        AX.selectpicker("refresh")
    };
    var X = function () {
        var AU = new Array();
        F.find("tr:gt(1)").each(function () {
            var AV = {};
            var Aa = $(this).find("td:eq(1)");
            AV.name = Aa.find("input").val();
            var AZ = $(this).find("td:eq(2)");
            AV.dataType = AZ.find("select:eq(0)").val();
            if (AV.dataType == 5) {
                AV.dateFormat = AZ.find("select:eq(1)").val()
            }
            var AY = $(this).find("td:eq(3)");
            AV.value = AY.find("select").val();
            var AX = $(this).find("td:eq(4)");
            AV.dsDefaultValue = AX.find("input").val();
            var AW = $(this).find("td:eq(5)");
            AV.modelType = AW.find("select").val();
            AU.push(AV)
        });
        return AU
    };
    var J = a.find("table");
    var AJ = J.parent().prev().find("a").click(function () {
        AD()
    });
    var AE = function (AX) {
        O();
        if (!AX) {
            return
        }
        var AV = AX.args;
        if (AV != undefined && AV.length > 0) {
            for (var AW = 0; AW < AV.length; AW++) {
                var AU = AV[AW];
                AD(AU)
            }
        }
    };
    var AD = function (AW) {
        var AW = AW ? AW : {};
        var AX = J.find("tr:eq(1)").clone().show();
        AX.find("select").addClass("selectpicker").selectpicker("refresh");
        var Ad = AX.find("td:eq(0)");
        if (AW.name != undefined) {
            Ad.find("input").val(AW.name)
        }
        var AY = AX.find("td:eq(1)");
        var Ac = AY.find("select:eq(0)");
        Ac.change(function () {
            var Ae = parseInt($(this).val());
            if (Ae == 5) {
                $(AY.children("span")[1]).show()
            } else {
                $(AY.children("span")[1]).hide()
            }
        });
        if (AW.dataType != undefined) {
            Ac.selectpicker("val", AW.dataType);
            Ac.trigger("change")
        }
        var Ab = AY.find("select:eq(1)");
        if (AW.dateFormat != undefined) {
            Ab.selectpicker("val", AW.dateFormat)
        }
        var AV = AX.find("td:eq(2)");
        var Aa = $(AV.children("span")[0]);
        var AZ = $(AV.children("span")[1]);
        Aa.find("select").change(function () {
            var Ae = $(this).val();
            if (Ae == "0") {
                AZ.children("input").show();
                AZ.children("a").hide();
                AZ.children("span").hide()
            } else {
                if (Ae == "1") {
                    AZ.children("input").show();
                    AZ.children("a").show();
                    AZ.children("span").hide()
                } else {
                    AZ.children("input").hide();
                    AZ.children("a").hide();
                    AZ.children("span").show()
                }
            }
        });
        AZ.children("a").bind("click", fxInputSelectHandler);
        if (AW.defaultValueType != undefined) {
            Aa.find("select").selectpicker("val", AW.defaultValueType)
        }
        Aa.find("select").trigger("change");
        if (AW.defaultValueType == 0 || AW.defaultValueType == 1) {
            if (AW.defaultValue != undefined) {
                AZ.children("input").val(AW.defaultValue)
            }
        } else {
            AZ.find("select").selectpicker("val", AW.defaultValue)
        }
        var AU = AX.find("td:eq(3)");
        AU.find("a").click(function () {
            $(this).parent().parent().remove()
        });
        J.append(AX)
    };
    var R = function () {
        var AU = new Array();
        J.find("tr:gt(1)").each(function () {
            var AW = {};
            var Ac = $(this).find("td:eq(0)");
            AW.name = Ac.find("input").val();
            var AX = $(this).find("td:eq(1)");
            var Ab = AX.find("select:eq(0)");
            AW.dataType = parseInt(Ab.val());
            if (AW.dataType == 5) {
                var Aa = AX.find("select:eq(1)");
                AW.dateFormat = Aa.val()
            }
            var AV = $(this).find("td:eq(2)");
            var AZ = $(AV.children("span")[0]);
            var AY = $(AV.children("span")[1]);
            var Ad = parseInt(AZ.find("select").val());
            AW.defaultValueType = Ad;
            if (Ad == 0 || Ad == 1) {
                AW.defaultValue = AY.children("input").val()
            } else {
                AW.defaultValue = AY.find("select").val()
            }
            AU.push(AW)
        });
        return AU
    };
    var O = function () {
        J.find("tr:gt(1)").remove()
    };
    var c = CodeMirror.fromTextArea(document.getElementById("win-data-set-sql-sql"), {
        mode: "text/x-sql",
        theme: "neat",
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true
    });
    var C = null;
    var k = $("#win-data-set-type").find("div.dataset-definition").find("table:eq(1)");
    $("#win-data-set-type").find("div.dataset-definition").find("a:eq(0)").click(function () {
        layer.open({
            type: 1,
            title: "设计数据列",
            zIndex: 1025,
            shadeClose: true,
            area: ["680px", "400px"],
            content: $("#win-dataset-definition"),
            btn: ["确定", "取消"],
            yes: function (AW) {
                C = L();
                var AZ = k.find("tr:first").find("td").length;
                if (C.length > 0) {
                    if (AZ > 0) {
                        var AU = k.find("tr:first");
                        for (var AX = 0; AX < C.length; AX++) {
                            if (AX < AZ - 2) {
                                AU.find("td:eq(" + (AX + 1) + ")").html(C[AX].name)
                            } else {
                                var AY = AU.find("td:last");
                                $("<td>" + C[AX].name + "</td>").insertBefore(AY);
                                k.find("tr:gt(0)").each(function () {
                                    AY = $(this).find("td:last");
                                    $("<td><input type='text' style='width:80px;'/></td>").insertBefore(AY)
                                })
                            }
                        }
                        if ((AZ - 2) > C.length) {
                            for (var AX = C.length; AX < AZ - 2; AX++) {
                                k.find("tr").each(function () {
                                    $(this).find("td:eq(" + (C.length + 1) + ")").remove()
                                })
                            }
                        }
                    } else {
                        var AV = "<tr class='tbheader'><td align='center'>序号</td>";
                        for (var AX = 0; AX < C.length; AX++) {
                            AV += "<td>" + C[AX].name + "</td>"
                        }
                        AV += "<td></td></tr>";
                        k.append(AV)
                    }
                }
                layer.close(AW)
            },
            success: function () {
                var AU = $("#win-dataset-definition").find("table");
                AU.find("tr:gt(1)").remove();
                if (C != null) {
                    for (var AV = 0; AV < C.length; AV++) {
                        P(C[AV])
                    }
                }
            }
        })
    });
    $("#win-data-set-type").find("div.dataset-definition").find("a:eq(1)").click(function () {
        if (C == null || C.length == 0) {
            layer.alert("请先添加数据列");
            return false
        }
        var AU = "<tr><td>" + k.find("tr").length + "</td>";
        for (var AV = 0; AV < C.length; AV++) {
            AU += "<td><input type='text' style='width:80px;'/></td>"
        }
        AU += "<td><a href='javascript:void(0)' class='only-a'><i class='icon iconfont icon-delete red fa-lg'  style='font-size:14px'></i></a></td></tr>";
        k.append(AU);
        k.find("tr:last").find("td:last").find("a").click(function () {
            $(this).parent().parent().remove();
            k.find("tr:gt(0)").each(function (AW) {
                $(this).find("td:eq(0)").empty().html(AW + 1)
            })
        })
    });
    var i = $("#win-dataset-definition").find("ul.top-menu");
    i.find("a").click(function () {
        P({})
    });
    var P = function (AY) {
        var AU = $("#win-dataset-definition").find("table");
        var AY = AY ? AY : {};
        var AZ = AU.find("tr:eq(1)").clone().show();
        AZ.find("select").addClass("selectpicker").selectpicker("refresh");
        var Ab = AZ.find("td:eq(0)");
        Ab.html(AU.find("tr").length - 1);
        var AX = AZ.find("td:eq(1)");
        if (AY.name != undefined) {
            AX.find("input").val(AY.name)
        }
        var AW = AZ.find("td:eq(2)");
        var Ac = AW.find("select:eq(0)");
        Ac.change(function () {
            var Ad = parseInt($(this).val());
            if (Ad == 5) {
                $(AW.children("span")[1]).show()
            } else {
                $(AW.children("span")[1]).hide()
            }
        });
        if (AY.type != undefined) {
            Ac.selectpicker("val", AY.type);
            Ac.trigger("change")
        }
        var Aa = AW.find("select:eq(1)");
        if (AY.dateFormat != undefined) {
            Aa.selectpicker("val", AY.dateFormat)
        }
        var AV = AZ.find("td:eq(3)");
        AV.find("a").click(function () {
            $(this).parent().parent().remove();
            AU.find("tr:gt(1)").each(function (Ad) {
                $(this).find("td:eq(0)").empty().html(Ad + 1)
            })
        });
        AU.append(AZ)
    };
    var L = function () {
        var AU = $("#win-dataset-definition").find("table");
        var AV = new Array();
        AU.find("tr:gt(1)").each(function () {
            var AY = {};
            var Aa = $(this).find("td:eq(1)");
            AY.name = Aa.find("input").val().toUpperCase();
            var AX = $(this).find("td:eq(2)");
            var AW = AX.find("select:eq(0)");
            AY.type = parseInt(AW.val());
            if (AY.type == 5) {
                var AZ = AX.find("select:eq(1)");
                AY.dateFormat = AZ.val()
            }
            AV.push(AY)
        });
        return AV
    }
});
$(function () {
    $("td.fr").on("contextmenu", function (A) {
        anyExcel.frOnContextmenu(A)
    });
    $("td.fc").on("contextmenu", function (A) {
        anyExcel.fcOnContextmenu(A)
    })
});
$(function () {
    $("#right-property-arg").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    var Z = function (AC, AB) {
        var AE = anyExcel.getSelectArgOrGridCell();
        if (AE == null) {
            return false
        }
        var AF = $(AE.o);
        var AD = AE.content;
        switch (AD.editStyle) {
            case 1:
            case 3:
            case 4:
            case 7:
            case 16:
            case 9:
                AF.find("div").find("input").css("width", AC + AB);
                break;
            case 2:
            case 10:
                AF.find("div").find("select").css("width", AC + AB);
                AF.find("div").find("select").attr("data-width", AC + AB);
                AF.find("div").find("select").selectpicker("refresh");
                AF.find("div.bootstrap-select").css("width", AC + AB);
                break
        }
    };
    var a = function (AB, AD) {
        var AE = anyExcel.getSelectArgOrGridCell();
        if (AE == null) {
            return false
        }
        var AF = $(AE.o);
        var AC = AE.content;
        switch (AC.editStyle) {
            case 1:
            case 3:
            case 4:
            case 7:
            case 16:
            case 9:
                AF.find("div").find("input").css("height", AB + "px");
                break
        }
    };
    var V = $("#right-property-arg");
    var n = V.find("tr:eq(2)");
    n.find("input").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.name = $(this).val()
    });
    var m = V.find("tr:eq(3)");
    m.find("select").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.dataType = $(this).val()
    });
    var j = V.find("tr:eq(4)");
    j.find("input").change(function () {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AC = AD.content;
        AC.width = parseInt($(this).val());
        var AB = $(this).parent().find("select").val();
        Z(AC.width, AB)
    });
    j.find("select").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.widthUnit = $(this).val()
    });
    var h = V.find("tr:eq(5)");
    h.find("input").change(function () {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AC = AD.content;
        AC.height = parseInt($(this).val());
        var AB = $(this).parent().find("select").val();
        a(AC.height, AB)
    });
    h.find("select").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.height = $(this).val()
    });
    var M = function (AB) {
        var AE = anyExcel.getSelectArgOrGridCell();
        if (AE == null) {
            return false
        }
        var AC = AE.content;
        var AD = AC.data ? AC.data : {};
        if (AB) {
            AD.multiselect = 1
        } else {
            AD.multiselect = 0
        }
        AC.data = AD
    };
    var g = V.find("tr:eq(6)");
    g.find("input").on("ifChecked", function (AB) {
        M(true)
    }).on("ifUnchecked", function (AB) {
        M(false)
    });
    var f = V.find("tr:eq(7)");
    f.find("select").selectpicker({iconBase: "icon iconfont", tickIcon: "icon-check red"});
    f.find("select").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.linkCondName = $(this).val()
    });
    var c = V.find("tr:eq(9)");
    c.find("td:eq(0)").find("select").change(function () {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AC = AD.content;
        AC.defaultValueType = parseInt($(this).val());
        var AB = c.find("td:eq(1)").children();
        AB.hide();
        if (AC.defaultValueType == 0) {
            $(AB[0]).show()
        } else {
            if (AC.defaultValueType == 1) {
                $(AB[0]).show();
                $(AB[1]).show()
            } else {
                $(AB[2]).show();
                c.find("td:eq(1)").find("select").selectpicker("refresh")
            }
        }
    });
    c.find("td:eq(1)").find("input").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.defaultValue = $(this).val()
    });
    c.find("td:eq(1)").find("select").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.defaultValue = $(this).val()
    });
    var u = V.find("tr:eq(10)");
    u.find("select").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.dateFormat = $(this).val()
    });
    var P = V.find("tr:eq(11)");
    var N = V.find("tr:eq(12)");
    P.find("input").on("ifChecked", function (AC) {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AB = AD.content;
        AB.useLike = 1;
        N.show()
    }).on("ifUnchecked", function (AC) {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AB = AD.content;
        AB.useLike = 0;
        N.hide()
    });
    N.find("select").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.likeType = parseInt($(this).val())
    });
    var K = function (AB) {
        var AE = anyExcel.getSelectArgOrGridCell();
        if (AE == null) {
            return false
        }
        var AC = AE.content;
        var AD = AC.data ? AC.data : {};
        if (AB) {
            AD.supportSearch = 1
        } else {
            AD.supportSearch = 0
        }
        AC.data = AD
    };
    var Q = V.find("tr:eq(13)");
    Q.find("input").on("ifChecked", function (AB) {
        K(true)
    }).on("ifUnchecked", function (AB) {
        K(false)
    });
    var r = function (AB) {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AC = AD.content;
        if (AB) {
            AC.triggerQuery = 1
        } else {
            AC.triggerQuery = 0
        }
    };
    var D = V.find("tr:eq(14)");
    D.find("input").on("ifChecked", function (AB) {
        r(true)
    }).on("ifUnchecked", function (AB) {
        r(false)
    });
    var U = function () {
        var AB = {};
        $("#right-property-arg-select").find("tr:gt(2)").each(function () {
            var AH = $(this).find("td:eq(0)");
            var AG = AH.find("input").val();
            var AF = $(this).find("td:eq(1)");
            var AI = AF.find("input").val();
            AB[AG] = AI
        });
        var AE = anyExcel.getSelectArgOrGridCell();
        if (AE == null) {
            return false
        }
        var AC = AE.content;
        var AD = AC.data ? AC.data : {};
        AD.dataMap = AB;
        AC.data = AD;
        if (AC.editStyle != 2) {
            C(AE, AB)
        }
    };
    var C = function (AG, AC) {
        if (!AC) {
            return
        }
        var AF = AG.content;
        var AH = $(AG.o);
        AH.find("div.sv").empty();
        for (var AE in AC) {
            var AB = null;
            if (AF.editStyle == 5) {
                AB = "<input type='radio'/>"
            } else {
                if (AF.editStyle == 6 || AF.editStyle == 18) {
                    AB = "<input type='checkbox'/>"
                }
            }
            if (AB != null) {
                var AD = AC[AE] != undefined ? AC[AE] : "";
                AB += "<span>" + AD + "</span>"
            }
            AH.find("div.sv").append(AB)
        }
    };
    var F = $("#right-property-arg-select").find("tr:eq(0)");
    var B = F.find("a");
    $(B[0]).click(function () {
        var AC = $("#right-property-arg-select").find("tr:eq(2)");
        var AB = AC.clone().show();
        AB.appendTo($("#right-property-arg-select"));
        AB.find("input").bind("change", function () {
            U()
        })
    });
    $(B[1]).click(function () {
        var AB = $("#right-property-arg-select");
        var AC = AB.find("tr:last");
        if (AC.is(":visible")) {
            AC.remove();
            U()
        }
    });
    var I = function (AD, AF) {
        var AG = anyExcel.getSelectArgOrGridCell();
        if (AG == null) {
            return false
        }
        var AC = AG.content;
        var AE = AC.data ? AC.data : {};
        var AB = AE.conditionSql ? AE.conditionSql : {};
        AB[AD] = AF;
        AE.conditionSql = AB;
        AC.data = AE
    };
    var T = $("#right-property-arg-ds-select").find("tr:eq(1)");
    var S = $("#right-property-arg-ds-select").find("tr:eq(2)");
    var R = $("#right-property-arg-ds-select").find("tr:eq(3)");
    T.find("select").change(function () {
        I("dsName", $(this).val());
        var AB = anyExcel.getDsColumns($(this).val());
        anyExcel.initSelect(S, "", AB);
        anyExcel.initSelect(R, "", AB);
        S.find("select").trigger("change");
        R.find("select").trigger("change")
    });
    S.find("select").change(function () {
        I("code", $(this).val())
    });
    R.find("select").change(function () {
        I("label", $(this).val())
    });
    var k = function (AB) {
        var AE = anyExcel.getSelectArgOrGridCell();
        if (AE == null) {
            return false
        }
        var AC = AE.content;
        var AD = AC.data ? AC.data : {};
        AD.treeType = AB;
        AC.data = AD
    };
    var o = function () {
        var AE = anyExcel.getSelectArgOrGridCell();
        if (AE == null) {
            return false
        }
        var AC = AE.content;
        var AD = AC.data ? AC.data : {};
        var AB = AD.conditionSql ? AD.conditionSql : {};
        return AB.dsName
    };
    var t = $("#right-property-arg-tree");
    var O = $("#right-property-arg-tree-group");
    var A = t.find("tr:eq(1)");
    var AA = t.find("tr:eq(2)");
    var z = t.find("tr:eq(3)");
    var y = t.find("tr:eq(4)");
    var x = t.find("tr:eq(5)");
    var v = t.find("tr:eq(6)");
    A.find("select").change(function () {
        var AB = $(this).val();
        if (AB == 0) {
            z.show();
            y.show();
            x.show();
            v.show();
            O.hide()
        } else {
            z.hide();
            y.hide();
            x.hide();
            v.hide();
            O.show()
        }
        k(AB)
    });
    AA.find("select").change(function () {
        I("dsName", $(this).val());
        var AB = anyExcel.getDsColumns($(this).val());
        anyExcel.initSelect(z, "", AB);
        anyExcel.initSelect(y, "", AB);
        anyExcel.initSelect(x, "", AB);
        anyExcel.initSelect(v, "", AB);
        z.find("select").trigger("change");
        y.find("select").trigger("change");
        x.find("select").trigger("change");
        v.find("select").trigger("change");
        $("#right-property-arg-tree-group").find("tr:gt(2)").each(function () {
            var AC = $(this).find("td:eq(0)").find("select");
            anyExcel.initSelectSelf(AC, "", AB);
            var AD = $(this).find("td:eq(1)").find("select");
            anyExcel.initSelectSelf(AD, "", AB)
        })
    });
    z.find("select").change(function () {
        I("pcode", $(this).val())
    });
    y.find("select").change(function () {
        I("code", $(this).val())
    });
    x.find("select").change(function () {
        I("queryCode", $(this).val())
    });
    v.find("select").change(function () {
        I("label", $(this).val())
    });
    var i = $("#right-property-arg-tree-group").find("tr:eq(0)");
    var w = i.find("a");
    $(w[0]).click(function () {
        var AF = $("#right-property-arg-tree-group").find("tr:eq(2)");
        var AC = AF.clone().show();
        AC.appendTo($("#right-property-arg-tree-group"));
        AC.find("select").addClass("selectpicker").selectpicker("refresh");
        var AG = o();
        if (AG != undefined) {
            var AB = anyExcel.getDsColumns(AG);
            var AD = AC.find("td:eq(0)").find("select");
            anyExcel.initSelectSelf(AD, "", AB);
            var AE = AC.find("td:eq(1)").find("select");
            anyExcel.initSelectSelf(AE, "", AB)
        }
        AC.find("select").bind("change", function () {
            anyExcel.setTreeSelectDataMap()
        })
    });
    $(w[1]).click(function () {
        var AB = $("#right-property-arg-tree-group");
        var AC = AB.find("tr:last");
        if (AC.is(":visible")) {
            AC.remove();
            anyExcel.setTreeSelectDataMap()
        }
    });
    var s = $("#right-property-arg-cell").find("tr:eq(1)");
    var q = $("#right-property-arg-cell").find("tr:eq(2)");
    var L = $("#right-property-arg-cell").find("tr:eq(3)");
    s.find("input").change(function () {
        var AB = parseInt($(this).val());
        if (!isNaN(AB)) {
            anyExcel.getGrid().setGridCellHeight(AB)
        }
    });
    q.find("input").change(function () {
        var AB = parseInt($(this).val());
        if (!isNaN(AB)) {
            anyExcel.getGrid().setGridCellWidth(AB)
        }
    });
    L.find("input").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.hiddenCondtion = $(this).val()
    });
    var p = $("#right-property-arg-button-attr");
    var Y = p.find("tr:eq(1)");
    Y.find("input").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.name = $(this).val();
        var AD = $(AC.o);
        AD.find("input").val(AB.name)
    });
    var X = p.find("tr:eq(2)");
    X.find("input").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.width = $(this).val();
        var AD = $(AC.o);
        AD.find("input").width(AB.width)
    });
    var W = p.find("tr:eq(3)");
    W.find("input").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.height = $(this).val();
        var AD = $(AC.o);
        AD.find("input").height(AB.height)
    });
    var l = $("#right-property-arg-style");
    var J = l.find("tr:eq(0)");
    J.find("input.color-select").change(function () {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AC = AD.content;
        var AB = AC.cmpStyle != undefined ? AC.cmpStyle : {};
        if ($(this).spectrum("get") != null) {
            AB.background = $(this).spectrum("get").toHex(false)
        } else {
            AB.background = undefined
        }
        AC.cmpStyle = AB
    });
    var H = l.find("tr:eq(1)");
    H.find("input.color-select").change(function () {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AC = AD.content;
        var AB = AC.cmpStyle != undefined ? AC.cmpStyle : {};
        if ($(this).spectrum("get") != null) {
            AB.borderColor = $(this).spectrum("get").toHex(false)
        } else {
            AB.borderColor = undefined
        }
        AC.cmpStyle = AB
    });
    var G = l.find("tr:eq(2)");
    G.find("input.color-select").change(function () {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AC = AD.content;
        var AB = AC.cmpStyle != undefined ? AC.cmpStyle : {};
        if ($(this).spectrum("get") != null) {
            AB.iconColor = $(this).spectrum("get").toHex(false)
        } else {
            AB.iconColor = undefined
        }
        AC.cmpStyle = AB
    });
    var E = $("#right-property-arg-date-range");
    E.find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    var e = E.find("tr:eq(0)");
    e.find("input").on("ifChecked", function (AE) {
        var AF = anyExcel.getSelectArgOrGridCell();
        if (AF == null) {
            return false
        }
        var AD = AF.content;
        AD.dateRange = 1;
        E.find("tr:gt(0)").show();
        if (AD.name != undefined) {
            var AC = E.find("tr:eq(1)");
            AC.find("input").val(AD.name + "Start").trigger("change");
            var AB = E.find("tr:eq(2)");
            AB.find("input").val(AD.name + "End").trigger("change")
        }
    }).on("ifUnchecked", function (AC) {
        var AD = anyExcel.getSelectArgOrGridCell();
        if (AD == null) {
            return false
        }
        var AB = AD.content;
        AB.dateRange = 0;
        E.find("tr:gt(0)").hide()
    });
    var d = E.find("tr:eq(1)");
    d.find("input").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.startName = $(this).val()
    });
    var b = E.find("tr:eq(2)");
    b.find("input").change(function () {
        var AC = anyExcel.getSelectArgOrGridCell();
        if (AC == null) {
            return false
        }
        var AB = AC.content;
        AB.endName = $(this).val()
    })
});
$(function () {
    $("#right-property-cell-barcode").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    var c = $("#right-property-cell").find("tr:eq(8)");
    c.find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    var b = $("#right-property-cell").find("tr:eq(9)");
    b.find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    var g = $("#right-property-cell").find("tr:eq(10)");
    g.find("a").bind("click", cellSelectHandler);
    var a = $("#right-property-cell-async").find("tr:eq(0)");
    a.find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    var Q = function () {
        return anyExcel.getSelectGridCell()
    };
    $("#right-property-cell-ctype").change(function () {
        var l = $(this).val();
        var k = Q();
        if (k == null) {
            return false
        }
        var m = k.content;
        m.contentType = l;
        $("#right-property-cell-html").hide();
        $("#right-property-cell-logic").hide();
        k.logicMap = undefined;
        $("#right-property-cell-barcode").hide();
        k.content.barCode = undefined;
        if (l == 2) {
            $("#right-property-cell-html").show();
            $("#right-property-cell-html textarea").val(Utils.getString(m.expression))
        } else {
            if (l == 3) {
                var j = $("#right-property-cell-logic");
                j.find("tr:gt(2)").remove();
                $("#right-property-cell-logic").show()
            } else {
                if (l == 5) {
                    F();
                    k.content.getOrCreateBarCode();
                    $("#right-property-cell-barcode").show()
                }
            }
        }
    });
    $("#right-property-cell-disType").change(function () {
        var k = Q();
        if (k == null) {
            return false
        }
        var j = parseInt($(this).val());
        k.setDisType(j);
        k.content.disType = j
    });
    $("#right-property-cell-joinType").change(function () {
        var j = Q();
        if (j == null) {
            return false
        }
        j.content.joinType = $(this).val()
    });
    $("#right-property-cell-treeType").change(function () {
        var j = Q();
        if (j == null) {
            return false
        }
        j.content.treeType = $(this).val()
    });
    $("#right-property-cell-orderBy").change(function () {
        var k = Q();
        if (k == null) {
            return false
        }
        var j = $(this).val();
        var l = {};
        if (j != "") {
            l.type = parseInt(j);
            l.dyn = 1
        } else {
            k.content.orderBy = undefined
        }
        if (!$.isEmptyObject(l)) {
            k.content.orderBy = l
        }
    });
    $("#right-property-cell-html textarea").change(function () {
        var j = Q();
        if (j == null) {
            return false
        }
        var k = j.content;
        if (k.contentType == 2) {
            k.expression = $(this).val()
        }
    });
    $("#right-property-cell-logic-add").click(function () {
        anyExcel.appendCellLogicMap()
    });
    $("#right-property-cell-logic-del").click(function () {
        var k = $("#right-property-cell-logic");
        var l = k.find("tr:last");
        if (l.is(":visible")) {
            l.remove();
            var m = Q();
            if (m == null) {
                return false
            }
            var n = m.content;
            n.logicMap = {};
            var j = k.find("tr:gt(2)");
            j.each(function (p) {
                var o = $(this).find("td:eq(0)").find("input").val();
                var q = $(this).find("td:eq(1)").find("input").val();
                n.logicMap[o] = q
            })
        }
    });
    var F = function () {
        var m = $("#right-property-cell-barcode");
        var l = m.find("tr:eq(0)");
        l.find("select").selectpicker("val", "Code 128");
        var n = m.find("tr:eq(1)");
        n.find("input").iCheck("uncheck");
        var k = m.find("tr:eq(2)");
        k.find("input").val("50");
        var j = m.find("tr:eq(3)");
        j.find("input").val("200")
    };
    var O = $("#right-property-cell-barcode");
    var Z = O.find("tr:eq(0)");
    Z.find("select").change(function () {
        var j = Q();
        if (j == null) {
            return false
        }
        var k = j.content.getOrCreateBarCode();
        k["type"] = $(this).val()
    });
    var T = O.find("tr:eq(1)");
    T.find("input").on("ifChanged", function (k) {
        var j = Q();
        if (j == null) {
            return false
        }
        var l = j.content.getOrCreateBarCode();
        l["textEnabled"] = $(this).is(":checked") ? 1 : 0
    });
    var Y = O.find("tr:eq(2)");
    Y.find("input").change(function () {
        var j = Q();
        if (j == null) {
            return false
        }
        var k = j.content.getOrCreateBarCode();
        k["height"] = $(this).val()
    });
    var C = O.find("tr:eq(3)");
    C.find("input").change(function () {
        var j = Q();
        if (j == null) {
            return false
        }
        var k = j.content.getOrCreateBarCode();
        k["width"] = $(this).val()
    });
    var R = $("#right-property-cell").find("tr:eq(6)");
    var P = $("#right-property-cell").find("tr:eq(7)");
    R.find("input").change(function () {
        var j = parseInt($(this).val());
        if (!isNaN(j)) {
            anyExcel.getGrid().setGridCellHeight(j)
        }
    });
    P.find("input").change(function () {
        var j = parseInt($(this).val());
        if (!isNaN(j)) {
            anyExcel.getGrid().setGridCellWidth(j)
        }
    });
    c.find("input").on("ifChanged", function (k) {
        var j = Q();
        if (j == null) {
            return false
        }
        j.content.printerFlag = $(this).is(":checked") ? 0 : 1
    });
    b.find("input").on("ifChanged", function (k) {
        var j = Q();
        if (j == null) {
            return false
        }
        j.content.fileOutFlag = $(this).is(":checked") ? 0 : 1
    });
    g.find("input").change(function () {
        var j = Q();
        if (j == null) {
            return false
        }
        j.content.upperCell = $(this).val()
    });
    var X = $("#right-property-cell").find("tr:eq(11)");
    X.find("input").change(function () {
        var k = Q();
        if (k == null) {
            return false
        }
        var j = $(this).val() != "" ? $(this).val() : undefined;
        k.content.paddingLeft = j
    });
    var A = $("#right-property-cell").find("tr:eq(12)");
    A.find("input").change(function () {
        var k = Q();
        if (k == null) {
            return false
        }
        var j = $(this).val() != "" ? $(this).val() : undefined;
        k.content.paddingTop = j
    });
    var V = $("#right-property-cell").find("tr:eq(13)");
    V.find("input").change(function () {
        var j = Q();
        if (j == null) {
            return false
        }
        var k = $(this).val() != "" ? $(this).val() : undefined;
        j.content.paddingRight = k
    });
    var B = $("#right-property-cell").find("tr:eq(14)");
    B.find("input").change(function () {
        var k = Q();
        if (k == null) {
            return false
        }
        var j = $(this).val() != "" ? $(this).val() : undefined;
        k.content.paddingBottom = j
    });
    var i = $("#right-property-table");
    i.find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    var N = i.find("tr:eq(1)");
    N.find("input").on("ifChanged", function (l) {
        var k = anyExcel.getGrid().selectedGridCell;
        if (k == null) {
            return false
        }
        var m = k.content;
        var j = 6;
        N.find("input").each(function () {
            var n = parseInt($(this).val());
            if ($(this).is(":checked")) {
                j = j | (1 << n)
            } else {
                j = (~(1 << n)) & j
            }
        });
        m.relative = j
    });
    var M = i.find("tr:eq(2)");
    M.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.tableBackground = $(this).val()
    });
    var L = i.find("tr:eq(3)");
    L.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.tableOpacity = $(this).val()
    });
    var J = i.find("tr:eq(4)");
    i.find("tr:gt(4)").hide();
    J.find("input").on("ifChanged", function (k) {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        var l = j.content;
        if ($(this).is(":checked")) {
            i.find("tr:gt(4)").show();
            l.userPanel = 1
        } else {
            l.userPanel = 0;
            i.find("tr:gt(4)").hide()
        }
    });
    var I = i.find("tr:eq(5)");
    I.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.title = $(this).val()
    });
    var H = i.find("tr:eq(6)");
    H.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.titleColor = $(this).val()
    });
    H.find("li:eq(1)").click(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        if ($(this).hasClass("tl-hover")) {
            $(this).removeClass("tl-hover");
            j.content.titleFontWeight = ""
        } else {
            $(this).addClass("tl-hover");
            j.content.titleFontWeight = "bold"
        }
    });
    H.find("li:eq(2)").click(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        if ($(this).hasClass("tl-hover")) {
            $(this).removeClass("tl-hover");
            j.content.titleFontStyle = ""
        } else {
            $(this).addClass("tl-hover");
            j.content.titleFontStyle = "italic"
        }
    });
    H.find("select").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.titleFontSize = $(this).val()
    });
    var G = i.find("tr:eq(7)");
    G.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.titleHeight = $(this).val()
    });
    var E = i.find("tr:eq(8)");
    E.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.panelBorderColor = $(this).val()
    });
    var D = i.find("tr:eq(9)");
    D.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.panelBorderWidth = $(this).val()
    });
    var h = i.find("tr:eq(10)");
    h.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.panelBorderRadius = $(this).val()
    });
    var f = i.find("tr:eq(11)");
    f.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.titleBottomBorderWidth = $(this).val()
    });
    var d = i.find("tr:eq(12)");
    d.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        j.content.panelBackground = $(this).val()
    });
    var K = $("#right-property-icon-style");
    var W = K.find("tr:eq(0)");
    W.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        var k = j.content.iconStyle;
        if (k != undefined) {
            k.color = $(this).val()
        }
    });
    var U = K.find("tr:eq(1)");
    U.find("input").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        var k = j.content.iconStyle;
        if (k != undefined) {
            k.size = $(this).val()
        }
    });
    var S = K.find("tr:eq(2)");
    S.find("select").change(function () {
        var j = anyExcel.getGrid().selectedGridCell;
        if (j == null) {
            return false
        }
        var k = j.content.iconStyle;
        if (k != undefined) {
            k.align = $(this).val();
            j.changeIconPos(k.align == "right")
        }
    });
    a.find("input").on("ifChanged", function (n) {
        var m = anyExcel.getGrid().selectedGridCell;
        var k = null;
        if (m != null) {
            k = m.content
        } else {
            if (divCoor.currentBox != null) {
                var j = divCoor.currentBox.data("rd");
                k = j.content
            }
        }
        if (k == null) {
            return false
        }
        if ($(this).is(":checked")) {
            var l = k.asyncData != undefined ? k.asyncData : {};
            l.usable = 1;
            k.asyncData = l
        } else {
            k.asyncData = undefined
        }
    });
    var e = $("#right-property-cell-async").find("tr:eq(1)");
    e.find("input").change(function () {
        var m = anyExcel.getGrid().selectedGridCell;
        var k = null;
        if (m != null) {
            k = m.content
        } else {
            if (divCoor.currentBox != null) {
                var j = divCoor.currentBox.data("rd");
                k = j.content
            }
        }
        if (k == null) {
            return false
        }
        var l = k.asyncData != undefined ? k.asyncData : {};
        l.interval = $(this).val();
        k.asyncData = l
    });
    e.find("select").change(function () {
        var m = anyExcel.getGrid().selectedGridCell;
        var k = null;
        if (m != null) {
            k = m.content
        } else {
            if (divCoor.currentBox != null) {
                var j = divCoor.currentBox.data("rd");
                k = j.content
            }
        }
        if (k == null) {
            return false
        }
        var l = k.asyncData != undefined ? k.asyncData : {};
        l.timeType = $(this).val();
        k.asyncData = l
    })
});
$(function () {
    var B = new Array();
    var H = null;
    $("li.tl-condition-format").click(function () {
        var J = anyExcel.getGrid().selectedGridCell;
        if (J == null) {
            return false
        }
        formIdx = layer.open({
            type: 1,
            title: "条件格式",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["800px", "500px"],
            content: $("#win-condition-format"),
            btn: ["确定", "取消"],
            yes: function (K) {
                var L = {};
                L["cformats"] = B;
                J.content["conditionFormat"] = L;
                layer.close(K)
            },
            end: function () {
                $("#win-condition-format-content").hide()
            },
            success: function () {
                D();
                B = new Array();
                $("#win-condition-format-formats").find("li").remove();
                if (J.content.conditionFormat) {
                    var L = J.content.conditionFormat.cformats;
                    if (L) {
                        for (var K = 0; K < L.length; K++) {
                            I(L[K])
                        }
                    }
                }
            }
        })
    });
    var D = function () {
        var J = $("#win-condition-format-content-table");
        J.find("tr:gt(1)").remove();
        $("#win-condition-format-content-style").find("li").removeClass("tl-hover");
        $("#win-condition-format-formats").find("li").removeClass("tl-hover");
        $("#win-condition-format-content-desc").find("input").val("");
        $("#win-condition-format-font-color").spectrum("set", "#000000");
        $("#win-condition-format-font-background").spectrum("set", "#ffffff");
        $("#win-condition-format-icon").find("img").remove()
    };
    var I = function (M) {
        var L = $("<li></li>");
        var N = $("<a href='javascript:void(0)'></a>");
        var O = $("#win-condition-format-formats").find("li");
        var K = O.length;
        var J = M.name ? M.name : "格式规则" + K;
        N.html(J).appendTo(L);
        L.attr("idx", K).appendTo($("#win-condition-format-formats"));
        L.click(function () {
            D();
            $(this).addClass("tl-hover");
            var P = parseInt($(this).attr("idx"));
            H = B[P];
            $("#win-condition-format-content").show();
            H.name = J;
            $("#win-condition-format-font-color").on("hide.spectrum", function (V, W) {
                H["fontColor"] = W
            });
            if (H["fontColor"]) {
                $("#win-condition-format-font-color").spectrum("set", H["fontColor"])
            }
            if (H["isBold"]) {
                $("#win-condition-format-font-bold").addClass("tl-hover")
            }
            if (H["isItalic"]) {
                $("#win-condition-format-font-italic").addClass("tl-hover")
            }
            if (H["isUnderline"]) {
                $("#win-condition-format-font-underline").addClass("tl-hover")
            }
            if (H["desc"]) {
                $("#win-condition-format-content-desc").find("input").val(H["desc"])
            }
            $("#win-condition-format-font-background").on("hide.spectrum", function (V, W) {
                H["background"] = W
            });
            if (H["background"]) {
                $("#win-condition-format-font-background").spectrum("set", H["background"])
            }
            if (H.styleImages) {
                var U = H.styleImages;
                if (U.length > 0) {
                    var R = U[0];
                    var Q = $("<img>", {src: R.filePath});
                    $("#win-condition-format-icon").find("span").append(Q);
                    E.val(R.filePath)
                }
            }
            var T = H["contents"];
            if (T) {
                for (var S = 0; S < T.length; S++) {
                    F(T[S])
                }
            }
        });
        B.push(M)
    };
    $("#win-condition-format-add").click(function () {
        I({})
    });
    $("#win-condition-format-del").click(function () {
        var J = false;
        $("#win-condition-format-formats").find("li").each(function (L) {
            if ($(this).hasClass("tl-hover")) {
                J = true;
                $(this).remove();
                B.splice(L, 1);
                $("#win-condition-format-content").hide()
            }
            if (J) {
                var K = parseInt($(this).attr("idx"));
                $(this).attr("idx", K - 1)
            }
        })
    });
    $("#win-condition-format-font-bold").click(function () {
        if ($(this).hasClass("tl-hover")) {
            $(this).removeClass("tl-hover");
            H["isBold"] = false
        } else {
            $(this).addClass("tl-hover");
            H["isBold"] = true
        }
    });
    $("#win-condition-format-font-italic").click(function () {
        if ($(this).hasClass("tl-hover")) {
            $(this).removeClass("tl-hover");
            H["isItalic"] = false
        } else {
            $(this).addClass("tl-hover");
            H["isItalic"] = true
        }
    });
    $("#win-condition-format-font-underline").click(function () {
        if ($(this).hasClass("tl-hover")) {
            $(this).removeClass("tl-hover");
            H["isUnderline"] = false
        } else {
            $(this).addClass("tl-hover");
            H["isUnderline"] = true
        }
    });
    $("#win-condition-format-content-desc").find("input").change(function () {
        H["desc"] = $(this).val()
    });
    var G = function () {
        var K = $("#win-condition-format-content-table");
        var L = new Array();
        var J = K.find("tr:gt(1)");
        J.each(function (P) {
            var S = {};
            var R = $(this).find("td:eq(0)").find("input");
            S["column"] = R.val();
            var Q = $(this).find("td:eq(1)").find("select");
            S["symbol"] = Q.val();
            var O = $(this).find("td:eq(2)").find("select");
            S["type"] = O.val();
            var N = $(this).find("td:eq(3)");
            if (S["type"] == "10") {
                S["value"] = N.find("select").val()
            } else {
                S["value"] = N.find("input").val()
            }
            var M = $(this).find("td:eq(4)");
            if (M.find("input[type=radio]:checked").length > 0) {
                S.logic = M.find("input[type=radio]:checked").val()
            }
            L.push(S)
        });
        H["contents"] = L
    };
    var A = function (J, K) {
        J.find("select").change(function () {
            var L = $(this).val();
            J.find("a.only-a").show().unbind("click");
            if (L == 0) {
                J.find("i").removeClass("icon-down").addClass("icon-collect");
                J.find("a.only-a").bind("click", columnSelectHandler)
            } else {
                if (L == 1) {
                    J.find("i").removeClass("icon-collect").addClass("icon-down");
                    J.find("a.only-a").bind("click", cellSelectHandler)
                } else {
                    J.find("a.only-a").hide()
                }
            }
            J.find("input").val("").trigger("change")
        });
        if (K == "") {
            J.find("select").selectpicker("val", 0)
        } else {
            if (K.startsWith("=")) {
                if (K.indexOf(".") != -1) {
                    J.find("select").selectpicker("val", 0)
                } else {
                    J.find("select").selectpicker("val", 1)
                }
            }
        }
        J.find("select").trigger("change")
    };
    var F = function (N) {
        var J = $("#win-condition-format-content-table");
        var U = J.find("tr:eq(1)");
        var Q = U.clone().show();
        J.append(Q);
        var S = Q.find("td:eq(0)");
        S.find("select").addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 75).attr("data-container", "body").selectpicker("refresh");
        A(S, "");
        var R = Q.find("td:eq(1)");
        R.find("select").addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 90).attr("data-container", "body").selectpicker("refresh");
        var P = Q.find("td:eq(2)");
        P.find("select").addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 90).attr("data-container", "body").selectpicker("refresh");
        var O = Q.find("td:eq(3)");
        O.find("select").addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 110).attr("data-container", "body").selectpicker("refresh");
        var W = J.find("tr").length;
        var L = Q.find("td:eq(4)");
        L.find("input[type=radio]").attr("name", "logicType" + W).iCheck({radioClass: "iradio_minimal",});
        L.find("input[type=radio]:eq(0)").iCheck("check");
        L.children("div").hide();
        var T = Q.prev();
        if (T.is(":visible")) {
            T.find("td:eq(4)").children("div").show()
        }
        var X = Q.find("input.form_time");
        anyExcel.initDate(X);
        if (N) {
            if (N["column"]) {
                var M = S.find("input");
                A(S, N["column"]);
                M.val(N["column"])
            }
            if (N["symbol"]) {
                var R = Q.find("td:eq(1)").find("select");
                R.selectpicker("val", N["symbol"])
            }
            if (N["type"]) {
                var P = Q.find("td:eq(2)").find("select");
                P.selectpicker("val", N["type"]);
                var K = P.parents("td").next().children();
                K.hide();
                if (N["type"] == "6") {
                    $(K[0]).show();
                    $(K[1]).show()
                } else {
                    if (N["type"] == "10") {
                        $(K[2]).show()
                    } else {
                        if (N["type"] == "5") {
                            $(K[3]).show()
                        } else {
                            $(K[0]).show()
                        }
                    }
                }
            }
            if (N["value"]) {
                var O = Q.find("td:eq(3)");
                if (N["type"] == "10") {
                    O.find("select").selectpicker("val", N["value"])
                } else {
                    O.find("input").val(N["value"])
                }
            }
            if (N.logic) {
                var V = (N.logic == 1) ? "check" : "uncheck";
                L.find("input[type=radio]:eq(1)").iCheck(V)
            }
        }
        Q.find("a.column-select").bind("click", columnSelectHandler);
        Q.find("select[name=dataType]").change(function () {
            var Z = $(this).val();
            var Y = $(this).parents("td").next().children();
            Y.hide();
            if (Z == "6") {
                $(Y[0]).show();
                $(Y[1]).show()
            } else {
                if (Z == "10") {
                    $(Y[2]).show()
                } else {
                    if (Z == "5") {
                        $(Y[3]).show()
                    } else {
                        $(Y[0]).show()
                    }
                }
            }
        });
        Q.find("input").change(function () {
            G()
        });
        Q.find("select").change(function () {
            G()
        })
    };
    $("#win-condition-format-content-add").click(function () {
        F()
    });
    $("#win-condition-format-content-del").click(function () {
        var J = $("#win-condition-format-content-table");
        var L = J.find("tr:last");
        if (L.is(":visible")) {
            var K = L.prev();
            if (K.is(":visible")) {
                K.find("td:eq(4)").children("div").hide()
            }
            L.remove();
            G()
        }
    });
    var E = $("#win-condition-format-img").find(".input-image");
    $("#win-condition-format-img").find("img").click(function () {
        E.parent().children("img").remove();
        var J = $(this).attr("src");
        upload.clearFilePreview(E);
        C(J)
    });
    var C = function (L) {
        var J = E.height();
        var M = E.width();
        var K = new Array();
        if (L != "") {
            K.push(L)
        }
        upload.initFilePreview(E, K, M, J)
    };
    $("#win-condition-format-icon").click(function () {
        layer.open({
            type: 1,
            title: "图标设置",
            zIndex: 1025,
            shadeClose: true,
            area: ["520px", "400px"],
            content: $("#win-condition-format-img"),
            btn: ["确定", "取消"],
            yes: function (K) {
                var M = new Array();
                var L = $("#win-condition-format-img").find(".file-preview-frame").find("img");
                if (L.length > 0) {
                    var J = {};
                    J.remote = E.attr("type") == "0";
                    J.filePath = $(L[0]).attr("src");
                    M.push(J);
                    H.styleImages = M;
                    $("#win-condition-format-icon").find("span").empty().append($(L[0]).clone().width(20).height(20))
                } else {
                    H.styleImages = undefined;
                    $("#win-condition-format-icon").find("span").empty()
                }
                layer.close(K)
            },
            success: function () {
                upload.clearFilePreview(E);
                if (H.styleImages != undefined && H.styleImages.length > 0) {
                    var J = H.styleImages[0];
                    if (J.filePath != undefined) {
                        C(J.filePath)
                    } else {
                        C("")
                    }
                } else {
                    C("")
                }
            }
        })
    })
});
$(function () {
    $("#win-data-bar").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal",});
    var A = function () {
        var J = $("#win-data-bar").find("tr:eq(1)");
        J.find("input").iCheck("check");
        var H = $("#win-data-bar").find("tr:eq(3)");
        var B = H.find("td:eq(0)").find("select");
        B.selectpicker("val", 0);
        var K = H.find("td:eq(1)").find("select");
        K.selectpicker("val", 0);
        $("#win-data-bar-min").hide();
        $("#win-data-bar-max").hide();
        var F = $("#win-data-bar").find("tr:eq(4)");
        var I = F.find("td:eq(0)");
        var G = F.find("td:eq(1)");
        I.find("input").val("");
        G.find("input").val("");
        var E = $("#win-data-bar").find("tr:eq(6)");
        E.find(".color-select").spectrum("set", "#00CCFF");
        var D = $("#win-data-bar").find("tr:eq(7)");
        D.find("input").val("");
        var C = $("#win-data-bar").find("tr:eq(8)");
        C.find("input").val("")
    };
    $("li.tl-data-bar").click(function () {
        var B = anyExcel.getGrid().selectedGridCell;
        if (B == null) {
            return false
        }
        formIdx = layer.open({
            type: 1,
            title: "数据条",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["480px", "360px"],
            content: $("#win-data-bar"),
            btn: ["确定", "取消"],
            yes: function (K) {
                var E = {};
                var J = $("#win-data-bar").find("tr:eq(1)");
                E["onlyBar"] = J.find("input").is(":checked");
                var G = $("#win-data-bar").find("tr:eq(4)");
                var I = G.find("td:eq(0)");
                var H = G.find("td:eq(1)");
                E["min"] = I.find("input").val();
                E["max"] = H.find("input").val();
                var F = $("#win-data-bar").find("tr:eq(6)");
                E["backgroundColor"] = F.find(".color-select").spectrum("get");
                var D = $("#win-data-bar").find("tr:eq(7)");
                E["height"] = D.find("input").val();
                var C = $("#win-data-bar").find("tr:eq(8)");
                E["maxWidth"] = C.find("input").val();
                B.content["dataBar"] = E;
                layer.close(K)
            },
            success: function () {
                A();
                var F = B.content["dataBar"];
                if (F) {
                    var L = $("#win-data-bar").find("tr:eq(1)");
                    if (F["onlyBar"] != undefined && !F["onlyBar"]) {
                        L.find("input").iCheck("uncheck")
                    }
                    var J = $("#win-data-bar").find("tr:eq(3)");
                    var C = J.find("td:eq(0)").find("select");
                    var M = J.find("td:eq(1)").find("select");
                    var H = $("#win-data-bar").find("tr:eq(4)");
                    var K = H.find("td:eq(0)");
                    var I = H.find("td:eq(1)");
                    if (F["min"]) {
                        if (F["min"].startsWith("=")) {
                            if (F["min"].indexOf(".") != -1) {
                                C.selectpicker("val", 2)
                            } else {
                                C.selectpicker("val", 1)
                            }
                            C.trigger("change")
                        }
                        K.find("input").val(F["min"])
                    }
                    if (F["max"]) {
                        if (F["max"].startsWith("=")) {
                            if (F["max"].indexOf(".") != -1) {
                                M.selectpicker("val", 2)
                            } else {
                                M.selectpicker("val", 1)
                            }
                            M.trigger("change")
                        }
                        I.find("input").val(F["max"])
                    }
                    if (F["backgroundColor"]) {
                        var G = $("#win-data-bar").find("tr:eq(6)");
                        G.find(".color-select").spectrum("set", F["backgroundColor"])
                    }
                    if (F["height"]) {
                        var E = $("#win-data-bar").find("tr:eq(7)");
                        E.find("input").val(F["height"])
                    }
                    if (F["maxWidth"]) {
                        var D = $("#win-data-bar").find("tr:eq(8)");
                        D.find("input").val(F["maxWidth"])
                    }
                }
            }
        })
    });
    $("#win-data-bar-min-type").change(function () {
        var B = $(this).val();
        var D = $("#win-data-bar").find("tr:eq(4)");
        var C = D.find("td:eq(0)");
        C.find("input").val("");
        if (B == 0) {
            $("#win-data-bar-min").hide()
        } else {
            $("#win-data-bar-min").show();
            $("#win-data-bar-min").unbind("click");
            if (B == 1) {
                $("#win-data-bar-min").find("i").removeClass("icon-collect").addClass("icon-down");
                $("#win-data-bar-min").bind("click", cellSelectHandler)
            } else {
                if (B == 2) {
                    $("#win-data-bar-min").find("i").removeClass("icon-down").addClass("icon-collect");
                    $("#win-data-bar-min").bind("click", columnSelectHandler)
                }
            }
        }
    });
    $("#win-data-bar-max-type").change(function () {
        var C = $(this).val();
        var D = $("#win-data-bar").find("tr:eq(4)");
        var B = D.find("td:eq(1)");
        B.find("input").val("");
        if (C == 0) {
            $("#win-data-bar-max").hide()
        } else {
            $("#win-data-bar-max").show();
            $("#win-data-bar-max").unbind("click");
            if (C == 1) {
                $("#win-data-bar-max").find("i").removeClass("icon-collect").addClass("icon-down");
                $("#win-data-bar-max").bind("click", cellSelectHandler)
            } else {
                if (C == 2) {
                    $("#win-data-bar-max").find("i").removeClass("icon-down").addClass("icon-collect");
                    $("#win-data-bar-max").bind("click", columnSelectHandler)
                }
            }
        }
    })
});
$(function () {
    $("#win-diff-bar").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal",});
    var A = function () {
        var B = $("#win-diff-bar").find("tr:eq(1)");
        B.find("input").iCheck("check");
        var G = $("#win-diff-bar").find("tr:eq(2)");
        var F = G.find("select");
        F.selectpicker("val", 0);
        G.find("input").val("");
        $("#win-diff-bar-value").bind("click", cellSelectHandler);
        var E = $("#win-diff-bar").find("tr:eq(3)");
        E.find("input").val("");
        var D = $("#win-diff-bar").find("tr:eq(5)");
        D.find("input").val("");
        var C = $("#win-diff-bar").find("tr:eq(6)");
        C.find("input").val("")
    };
    $("li.tl-diff-bar").click(function () {
        var B = anyExcel.getGrid().selectedGridCell;
        if (B == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        formIdx = layer.open({
            type: 1,
            title: "差异图",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["480px", "380px"],
            content: $("#win-diff-bar"),
            btn: ["确定", "取消"],
            yes: function (D) {
                var G = {};
                var C = $("#win-diff-bar").find("tr:eq(1)");
                G["onlyBar"] = C.find("input").is(":checked");
                var I = $("#win-diff-bar").find("tr:eq(2)");
                G["columnValue"] = I.find("input").val();
                var H = $("#win-diff-bar").find("tr:eq(3)");
                G["midValue"] = H.find("input").val();
                var F = $("#win-diff-bar").find("tr:eq(5)");
                G["height"] = F.find("input").val();
                var E = $("#win-diff-bar").find("tr:eq(6)");
                G["maxWidth"] = E.find("input").val();
                B.content["diffBar"] = G;
                layer.close(D)
            },
            success: function () {
                A();
                var F = B.content["diffBar"];
                if (F) {
                    var C = $("#win-diff-bar").find("tr:eq(1)");
                    if (F["onlyBar"] != undefined && !F["onlyBar"]) {
                        C.find("input").iCheck("uncheck")
                    }
                    if (F["columnValue"]) {
                        var I = $("#win-diff-bar").find("tr:eq(2)");
                        var H = I.find("select");
                        if (F["columnValue"].startsWith("=")) {
                            if (F["columnValue"].indexOf(".") != -1) {
                                H.selectpicker("val", 1)
                            } else {
                                H.selectpicker("val", 0)
                            }
                            H.trigger("change")
                        }
                        I.find("input").val(F["columnValue"])
                    }
                    if (F["midValue"]) {
                        var G = $("#win-diff-bar").find("tr:eq(3)");
                        G.find("input").val(F["midValue"])
                    }
                    if (F["height"]) {
                        var E = $("#win-diff-bar").find("tr:eq(5)");
                        E.find("input").val(F["height"])
                    }
                    if (F["maxWidth"]) {
                        var D = $("#win-diff-bar").find("tr:eq(6)");
                        D.find("input").val(F["maxWidth"])
                    }
                }
            }
        })
    });
    $("#win-diff-bar-value-type").change(function () {
        var B = $(this).val();
        $("#win-diff-bar-value").unbind("click");
        if (B == 0) {
            $("#win-diff-bar-value").find("i").removeClass("icon-collect").addClass("icon-down");
            $("#win-diff-bar-value").bind("click", cellSelectHandler)
        } else {
            $("#win-diff-bar-value").find("i").removeClass("icon-down").addClass("icon-collect");
            $("#win-diff-bar-value").bind("click", columnSelectHandler)
        }
    })
});
$(function () {
    var H = $("#win-insert-celllink").find("table.tb");
    var D = $("#win-insert-celllink").find("ul.top-menu");
    var I = D.children();
    $(I[0]).click(function () {
        var K = $("#win-insert-celllink").find("table.tb-all");
        var M = K.find("tr:eq(1)").clone();
        M.show();
        M.find("select").each(function () {
            $(this).addClass("selectpicker").selectpicker("refresh")
        });
        var L = M.find("td:eq(1)");
        anyExcel.setColumnWithArg(L, "");
        K.append(M)
    });
    $(I[1]).click(function () {
        var K = $("#win-insert-celllink").find("table.tb-all");
        var L = K.find("tr:last");
        if (L.is(":visible")) {
            L.remove()
        }
    });
    var B = $("#win-insert-celllink").children("div:first");
    var F = B.children();
    $(F[4]).find("a").click(function () {
        var K = $(F[4]).find("input").attr("rptId");
        layer.open({
            type: 2,
            title: "选择报表",
            zIndex: 1025,
            shadeClose: true,
            area: ["520px", "400px"],
            content: PATH + "/anyrt/design/selectrpt.jsp?rptId=" + K,
            btn: ["确定", "取消"],
            yes: function (M, L) {
                var O = window[L.find("iframe")[0]["name"]];
                var N = O.getSelectNode();
                if (N != null) {
                    $(F[4]).find("input").val(N.name);
                    $(F[4]).find("input").attr("rptId", N.id)
                }
                layer.close(M)
            }
        })
    });
    var J = function (L, P) {
        var K = $("#win-insert-celllink").find("table.tb-all");
        var N = K.find("tr:eq(1)").clone();
        N.show();
        N.find("select").each(function () {
            $(this).addClass("selectpicker").selectpicker("refresh")
        });
        var O = N.find("td:eq(0)");
        O.find("input").val(L);
        var M = N.find("td:eq(1)");
        anyExcel.setColumnWithArg(M, P);
        K.append(N)
    };
    $(F[0]).find("select.selectpicker").change(function () {
        var K = $(this).val();
        $(F[3]).hide();
        $(F[4]).hide();
        $(F[5]).hide();
        if (K == 0) {
            $(F[4]).show()
        } else {
            if (K == 1) {
                $(F[3]).show()
            } else {
                C.setValue("");
                $(F[5]).show()
            }
        }
    });
    $(F[1]).find("select.selectpicker").change(function () {
        var K = $(this).val();
        $(F[2]).hide();
        if (K == 2) {
            $(F[2]).show()
        }
    });
    var E = function (O) {
        var U = O != null ? O.content["cellLinked"] : {};
        U = U ? U : {};
        var R = U["type"] ? U["type"] : 0;
        $(F[0]).find("select.selectpicker").selectpicker("val", R);
        $(F[0]).find("select.selectpicker").trigger("change");
        var K = U["targetType"] ? U["targetType"] : "0";
        $(F[1]).find("select.selectpicker").selectpicker("val", K).trigger("change");
        var M = U.width != undefined ? U.width : 600;
        var W = U.height != undefined ? U.height : 200;
        $(F[2]).find("input:eq(0)").val(M);
        $(F[2]).find("input:eq(1)").val(W);
        var L = U.url;
        if (L != undefined && L != "") {
            if (R == 0) {
                $(F[4]).find("input").attr("rptId", L);
                $.ajax({
                    type: "POST",
                    url: PATH + "/rptMgr/query_rpt_name.htm",
                    data: {rptId: L},
                    dataType: "text",
                    success: function (X) {
                        $(F[4]).find("input").val(X)
                    }
                })
            } else {
                if (R == 1) {
                    $(F[3]).find("input").val(L)
                } else {
                    C.setValue(L)
                }
            }
        } else {
            $(F[3]).find("input").val("");
            $(F[4]).find("input").val("");
            C.setValue("")
        }
        var N = $("#win-insert-celllink").find("table.tb-all");
        N.find("tr:gt(1)").remove();
        var P = U["argValueMap"] ? U["argValueMap"] : {};
        for (var T in P) {
            J(T, P[T])
        }
        H.find("tr:gt(1)").remove();
        var V = U.logicCondition;
        if (V != undefined) {
            var S = V.conditions;
            for (var Q = 0; Q < S.length; Q++) {
                anyExcel.addLogicCondition(S[Q], H)
            }
        }
    };
    var A = $("#win-insert-celllink").find("a.filter");
    A.click(function () {
        anyExcel.addLogicCondition({}, H)
    });
    var G = $("#win-insert-celllink").find("a.filter-del");
    G.click(function () {
        var L = H.find("tr:last");
        if (L.is(":visible")) {
            var K = L.prev();
            if (K.is(":visible")) {
                K.find("td:eq(4)").children("div").hide()
            }
            L.remove()
        }
    });
    $("li.tl-insert-celllink").click(function () {
        var K = anyExcel.getGrid().selectedGridCell;
        if (K == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        formIdx = layer.open({
            type: 1,
            title: "超级链接",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["720px", "480px"],
            content: $("#win-insert-celllink"),
            btn: ["确定", "取消"],
            yes: function (M) {
                var Q = {};
                var P = $("#win-insert-celllink").children("div:first");
                var O = P.children();
                Q["type"] = parseInt($(O[0]).find("select.selectpicker").val());
                Q["targetType"] = $(O[1]).find("select.selectpicker").val();
                Q.width = $(O[2]).find("input:eq(0)").val();
                Q.height = $(O[2]).find("input:eq(1)").val();
                if (Q["type"] == 0) {
                    Q["url"] = $(O[4]).find("input").attr("rptId")
                } else {
                    if (Q["type"] == 1) {
                        Q["url"] = $(O[3]).find("input").val()
                    } else {
                        Q["url"] = C.getValue()
                    }
                }
                var L = $("#win-insert-celllink").find("table.tb-all");
                var N = {};
                L.find("tr:gt(1)").each(function () {
                    var T = $(this).find("td:eq(0)");
                    var V = T.find("input").val();
                    var S = $(this).find("td:eq(1)");
                    var U = S.find("select:eq(0)").val();
                    if (U == 3) {
                        var R = S.find("select:eq(1)").val();
                        N[V] = R
                    } else {
                        var R = S.find("input.column").val();
                        N[V] = R
                    }
                });
                if (!$.isEmptyObject(N)) {
                    Q["argValueMap"] = N
                }
                anyExcel.setLogicCondition(Q, H);
                K.content["cellLinked"] = Q;
                layer.close(M)
            },
            success: function () {
                E(K);
                C.refresh()
            }
        })
    });
    var C = CodeMirror.fromTextArea(document.getElementById("win-insert-celllink-js"), {
        mode: "text/javascript",
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true
    })
});
$(function () {
    var J = new Array();
    var D = null;
    var B = $("#win-linkages-content").children();
    B.find("input").change(function () {
        H()
    });
    B.find("select").change(function () {
        H()
    });
    var F = $("#win-linkages-all").find("table.win-linkages-types");
    $("#win-linkages-add").find("li").click(function () {
        var N = $(this).text();
        var M = $(this).attr("val");
        I(N, M)
    });
    var I = function (R, Q, N) {
        var P = F.find("tr:eq(0)").clone().show();
        F.append(P);
        P.find("td:eq(0)").html(R);
        var M = J.length;
        P.find("td:eq(0)").attr("idx", M);
        P.find("td:eq(0)").click(function () {
            F.find("td").removeClass("tl-hover");
            $(this).addClass("tl-hover");
            var S = parseInt($(this).attr("idx"));
            D = J[S];
            A(D)
        });
        P.find("td:eq(1)").find("a").click(function () {
            var S = false;
            var T = parseInt($(this).parent().prev().attr("idx"));
            F.find("tr:gt(0)").each(function (X) {
                if (X == T) {
                    S = true;
                    $(this).remove();
                    J.splice(X, 1);
                    var W = $("#win-linkages-content").children();
                    W.hide();
                    var V = $("#win-linkages-all").find("table.tb-all");
                    V.find("tr:gt(1)").remove()
                }
                if (S) {
                    var U = parseInt($(this).find("td:eq(0)").attr("idx"));
                    $(this).find("td:eq(0)").attr("idx", U - 1)
                }
            })
        });
        if (N) {
            J.push(N)
        } else {
            var O = {};
            O.name = R;
            O["type"] = Q;
            J.push(O);
            P.find("td:eq(0)").trigger("click")
        }
    };
    var E = $("#win-linkages-all").find("ul.top-menu");
    var K = E.children();
    $(K[0]).click(function () {
        L("", "")
    });
    $(K[1]).click(function () {
        var M = $("#win-linkages-all").find("table.tb-all");
        var N = M.find("tr:last");
        if (N.is(":visible")) {
            N.remove();
            H()
        }
    });
    var B = $("#win-linkages-content").children();
    $(B[0]).find("a").bind("click", cellSelectHandler);
    var L = function (N, R) {
        var M = $("#win-linkages-all").find("table.tb-all");
        var P = M.find("tr:eq(1)").clone();
        P.show();
        P.find("select").each(function () {
            $(this).addClass("selectpicker").selectpicker("refresh")
        });
        var Q = P.find("td:eq(0)");
        Q.find("input").val(N);
        var O = P.find("td:eq(1)");
        anyExcel.setColumnWithArg(O, R);
        M.append(P);
        P.find("input").change(function () {
            H()
        });
        P.find("select:eq(1)").change(function () {
            H()
        })
    };
    var H = function () {
        var N = $("#win-linkages-content").children();
        if (D) {
            var O = parseInt(D["type"]);
            if (O == 0) {
                D["targetId"] = $(N[0]).find("input").val()
            } else {
                if (O == 1) {
                    D["targetId"] = $(N[1]).find("select").val()
                } else {
                    if (O == 2) {
                        D["targetId"] = $(N[2]).find("select").val()
                    }
                }
            }
            var P = {};
            var M = $("#win-linkages-all").find("table.tb-all");
            M.find("tr:gt(1)").each(function () {
                var T = $(this).find("td:eq(0)");
                var R = T.find("input").val();
                var S = $(this).find("td:eq(1)");
                var U = S.find("select:eq(0)").val();
                if (U == 3) {
                    var Q = S.find("select:eq(1)").val();
                    P[R] = Q
                } else {
                    var Q = S.find("input.column").val();
                    P[R] = Q
                }
            });
            if (!$.isEmptyObject(P)) {
                D["params"] = P
            }
        }
    };
    var C = function () {
        var N = $("#win-linkages-content").children();
        N.hide();
        J = new Array();
        linkage = null;
        F.find("tr:gt(0)").remove();
        var M = $("#win-linkages-all").find("table.tb-all");
        var O = M.find("tr:gt(1)");
        O.remove()
    };
    var G = function (O, Q) {
        O.empty();
        for (var N = 0; N < Q.length; N++) {
            var P = Q[N];
            var M = $("<option></option>").attr("value", P.id).html(P.name);
            O.append(M)
        }
        O.selectpicker("refresh")
    };
    var A = function (S) {
        var M = $("#win-linkages-all").find("table.tb-all");
        M.find("tr:gt(1)").remove();
        var Q = $("#win-linkages-content").children();
        Q.hide();
        if (S) {
            var R = S["type"];
            var N = S["targetId"] ? S["targetId"] : "";
            if (R == 0) {
                $(Q[0]).show();
                $(Q[0]).find("input").val(N)
            } else {
                if (R == 1) {
                    $(Q[1]).show();
                    var P = divCoor.getDivNames();
                    G($(Q[1]).find("select"), P);
                    if (N != "") {
                        $(Q[1]).find("select").selectpicker("val", N)
                    }
                    $(Q[1]).find("select").trigger("change")
                } else {
                    if (R == 2) {
                        $(Q[2]).show();
                        var P = divCoor.getPanelNames();
                        G($(Q[2]).find("select"), P);
                        if (N != "") {
                            $(Q[2]).find("select").selectpicker("val", N)
                        }
                        $(Q[2]).find("select").trigger("change")
                    }
                }
            }
            $(Q[3]).show();
            $(Q[4]).show();
            var T = S["params"] ? S["params"] : {};
            for (var O in T) {
                L(O, T[O])
            }
        }
    };
    $("li.tl-insert-linkages-all").click(function (N) {
        var M = anyExcel.getGrid().selectedGridCell;
        if (M == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        formIdx = layer.open({
            type: 1,
            title: "联动设置",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["680px", "400px"],
            content: $("#win-linkages-all"),
            btn: ["确定", "取消"],
            yes: function (P) {
                if (J.length > 0) {
                    var O = {};
                    O.linkages = J;
                    M.content["linkages"] = O
                }
                layer.close(P)
            },
            success: function () {
                C();
                if (M.content.linkages && M.content.linkages.linkages) {
                    var Q = M.content.linkages.linkages;
                    for (var P = 0; P < Q.length; P++) {
                        var O = Q[P];
                        I(O.name, O.type, O)
                    }
                }
            }
        })
    })
});
$(function () {
    $("li.tl-insert-image-link").click(function () {
        var A = anyExcel.getGrid().selectedGridCell;
        if (A == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        formIdx = layer.open({
            type: 1,
            title: "图片链接设置",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["580px", "300px"],
            content: $("#win-image-link"),
            btn: ["确定", "取消"],
            yes: function (H) {
                var K = {};
                var B = $("#win-image-link").find("table.tb-all");
                var D = B.find("tr:eq(0)").find("td:eq(1)");
                var C = D.find("input").val();
                if (C != "") {
                    K["filePath"] = C;
                    A.content["cellImageLinked"] = K
                }
                var G = B.find("tr:eq(1)");
                var L = G.find("input").val();
                if (L != "") {
                    K.serverPath = L
                }
                var F = B.find("tr:eq(2)");
                var J = F.find("input").val();
                if (J != "") {
                    K.imgWidth = J
                }
                var E = B.find("tr:eq(3)");
                var I = E.find("input").val();
                if (I != "") {
                    K.imgHeight = I
                }
                layer.close(H)
            },
            success: function () {
                var J = A.content["cellImageLinked"] ? A.content["cellImageLinked"] : {};
                var B = $("#win-image-link").find("table.tb-all");
                var C = B.find("tr:eq(0)").find("td:eq(1)");
                C.find("input").val("");
                var I = J["filePath"] ? J["filePath"] : A.getDsColumn();
                anyExcel.setColumn3Type(C, I, 0);
                var F = B.find("tr:eq(1)");
                var K = J.serverPath != undefined ? J.serverPath : "";
                F.find("input").val(K);
                var E = B.find("tr:eq(2)");
                var H = J.imgWidth != undefined ? J.imgWidth : "";
                E.find("input").val(H);
                var D = B.find("tr:eq(3)");
                var G = J.imgHeight != undefined ? J.imgHeight : "";
                D.find("input").val(G)
            }
        })
    })
});
$(function () {
    $("li.tl-insert-file-link").click(function () {
        var A = anyExcel.getGrid().selectedGridCell;
        if (A == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        formIdx = layer.open({
            type: 1,
            title: "文件设置",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["580px", "300px"],
            content: $("#win-file-link"),
            btn: ["确定", "取消"],
            yes: function (D) {
                var C = {};
                var B = $("#win-file-link").find("table.tb-all");
                var E = B.find("tr:eq(0)").find("td:eq(1)");
                var F = E.find("input").val();
                if (F != "") {
                    C["filePath"] = F;
                    A.content["cellFileLinked"] = C
                }
                layer.close(D)
            },
            success: function () {
                var C = A.content["cellFileLinked"] ? A.content["cellFileLinked"] : {};
                var B = $("#win-file-link").find("table.tb-all");
                var D = B.find("tr:eq(0)").find("td:eq(1)");
                D.find("input").val("");
                var E = C["filePath"] ? C["filePath"] : A.getDsColumn();
                anyExcel.setColumn3Type(D, E, 0)
            }
        })
    })
});
$(function () {
    $("li.tl-insert-cellSelect-style").click(function () {
        var A = anyExcel.getGrid().selectedGridCell;
        if (A == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        layer.open({
            type: 1,
            title: "动态背景色设置",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["440px", "300px"],
            content: $("#win-cellSelect-style"),
            btn: ["确定", "取消"],
            yes: function (F) {
                var H = {};
                var E = $("#win-cellSelect-style").find("table.tb-all");
                var D = E.find("tr:eq(0)");
                var C = D.find("input").spectrum("get").toHex(false);
                if (C != "ffffff") {
                    H["oddBackgroundColor"] = C
                }
                var B = E.find("tr:eq(1)");
                var G = B.find("input").spectrum("get").toHex(false);
                if (G != "ffffff") {
                    H["evenBackgroundColor"] = G
                }
                anyExcel.getGrid().setDyncBackground(H);
                layer.close(F)
            },
            success: function () {
                var F = A.content["cellSelectStyle"] ? A.content["cellSelectStyle"] : {};
                var D = $("#win-cellSelect-style").find("table.tb-all");
                var C = D.find("tr:eq(0)");
                var E = F["oddBackgroundColor"] ? F["oddBackgroundColor"] : "#ffffff";
                C.find("input").spectrum("set", E);
                var B = D.find("tr:eq(1)");
                var G = F["evenBackgroundColor"] ? F["evenBackgroundColor"] : "#ffffff";
                B.find("input").spectrum("set", G)
            }
        })
    })
});
$(function () {
    var D = $("#win-sub-report").find("ul.top-menu");
    var C = D.children();
    $(C[0]).click(function () {
        var H = $("#win-sub-report").find("table.tb-all");
        var J = H.find("tr:eq(1)").clone();
        J.show();
        J.find("select").each(function () {
            $(this).addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 80);
            $(this).selectpicker("refresh")
        });
        var I = J.find("td:eq(1)");
        anyExcel.setColumn3Type(I, "", 0);
        H.append(J)
    });
    $(C[1]).click(function () {
        var H = $("#win-sub-report").find("table.tb-all");
        var J = H.find("tr:last");
        if (J.is(":visible")) {
            J.remove();
            var I = $("li.tl-insert-panel-subreport").data("c");
            if (I == undefined || I == null) {
                if (anyExcel.getGrid().selectedGridCell != null) {
                    I = anyExcel.getGrid().selectedGridCell.content
                }
            }
            if (I != undefined && I != null) {
                A(I)
            }
        }
    });
    var E = null;
    var G = $("#win-sub-report").find("div:eq(0)");
    G.find("a").click(function () {
        var H = E.rptId != undefined ? E.rptId : "";
        layer.open({
            type: 2,
            title: "选择报表",
            zIndex: 1025,
            shadeClose: true,
            area: ["520px", "400px"],
            content: PATH + "/anyrt/design/selectrpt.jsp?rptId=" + H,
            btn: ["确定", "取消"],
            yes: function (J, I) {
                var M = window[I.find("iframe")[0]["name"]];
                var L = M.getSelectNode();
                if (L != null) {
                    var K = $("#win-sub-report").find("div:eq(0)");
                    K.find("input").val(L.name);
                    E.rptId = L.id
                }
                layer.close(J)
            }
        })
    });
    var B = function (I, M) {
        var H = $("#win-sub-report").find("table.tb-all");
        var K = H.find("tr:eq(1)").clone();
        K.show();
        K.find("select").each(function () {
            $(this).addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 80);
            $(this).selectpicker("refresh")
        });
        var L = K.find("td:eq(0)");
        L.find("input").val(I);
        var J = K.find("td:eq(1)");
        anyExcel.setColumn3Type(J, M, 0);
        H.append(K)
    };
    var F = function (L) {
        var K = $("#win-sub-report").find("div:eq(0)");
        if (L.rptId != undefined && L.rptId != "") {
            $.ajax({
                type: "POST",
                url: PATH + "/rptMgr/query_rpt_name.htm",
                data: {rptId: L.rptId},
                dataType: "text",
                success: function (M) {
                    K.find("input").val(M)
                }
            })
        } else {
            K.find("input").val("")
        }
        var H = $("#win-sub-report").find("table.tb-all");
        H.find("tr:gt(1)").remove();
        var J = L["argValueMap"] ? L["argValueMap"] : {};
        for (var I in J) {
            B(I, J[I])
        }
    };
    var A = function (J) {
        var H = $("#win-sub-report").find("table.tb-all");
        var I = {};
        H.find("tr:gt(1)").each(function () {
            var M = $(this).find("td:eq(0)");
            var N = M.find("input").val();
            var L = $(this).find("td:eq(1)");
            var K = L.find("input.column").val();
            I[N] = K
        });
        J["argValueMap"] = I
    };
    $("li.tl-insert-sub-report").click(function () {
        var I = anyExcel.getGrid().selectedGridCell;
        if (I == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        var H = I.content;
        formIdx = layer.open({
            type: 1,
            title: "子报表",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["560px", "400px"],
            content: $("#win-sub-report"),
            btn: ["确定", "取消"],
            yes: function (J) {
                A(H);
                if (H.rptId != undefined && H.rptId != "") {
                    I.setSubReportImage();
                    I.mark = 6
                }
                layer.close(J)
            },
            success: function () {
                E = H;
                F(E)
            }
        })
    });
    $("li.tl-insert-panel-subreport").click(function () {
        var H = $(this).data("c");
        var I = (H != undefined && H != null) ? H : new Content();
        var J = $(this);
        layer.open({
            type: 1,
            title: "子报表",
            zIndex: 1025,
            shadeClose: true,
            area: ["560px", "400px"],
            content: $("#win-sub-report"),
            btn: ["确定", "取消"],
            yes: function (K) {
                A(I);
                if (H == undefined || H == null) {
                    if (I.rptId != undefined && I.rptId != "") {
                        divCoor.appendSubReportPanel(400, 300, I)
                    }
                }
                layer.close(K)
            },
            success: function () {
                E = I;
                F(E)
            },
            end: function () {
                J.removeData("c")
            }
        })
    });
    $("li.tl-insert-cell-panel-subreport").click(function () {
        var I = anyExcel.getGrid().selectedGridCell;
        if (I == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        var H = I.content;
        formIdx = layer.open({
            type: 1,
            title: "子报表",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["560px", "400px"],
            content: $("#win-sub-report"),
            btn: ["确定", "取消"],
            yes: function (L) {
                var N = $(I.o);
                I.mark = 8;
                var M = E;
                A(M);
                var J = {};
                J.subReport = M;
                J.mark = 6;
                I.content.cellPanel = J;
                var K = $("<i class='icon iconfont icon-report fa-lg' style='font-size:16px'></i>");
                divCoor.appendCellPanel(400, 330, K, N);
                grid.setFirstGridCellWidth(I, 400);
                grid.setFirstGridCellHeight(I, 300);
                layer.close(L)
            },
            success: function () {
                var J = {};
                if (I.mark == 8) {
                    J = I.content.cellPanel.subReport
                }
                E = J;
                F(E)
            }
        })
    })
});
$(function () {
    $("#win-orderby").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal",});
    var B = $("#win-orderby").find("table.tb-all");
    var D = B.find("tr:eq(2)");
    D.find("select").each(function () {
        $(this).addClass("selectpicker").attr("data-style", "btn-select").attr("data-width", 80);
        $(this).selectpicker("refresh")
    });
    var C = D.find("td:eq(1)");
    anyExcel.setColumn3Type(C, "", 0);
    var A = function (M) {
        var J = $("#win-orderby").find("tr:eq(0)");
        var N = M["useSql"] ? "check" : "uncheck";
        J.find("input").iCheck(N);
        var I = $("#win-orderby").find("tr:eq(1)");
        var L = M["type"] != undefined ? M["type"] : 0;
        I.find("select").selectpicker("val", L);
        var E = $("#win-orderby").find("table.tb-all");
        var K = E.find("tr:eq(2)");
        var H = K.find("td:eq(1)");
        var G = M["columns"];
        var F = G != undefined ? G[0] : "";
        H.find("input").val(F)
    };
    $("li.tl-insert-orderby-icon").click(function () {
        var F = anyExcel.getGrid().selectedGridCell;
        if (F == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        var E = F.content;
        formIdx = layer.open({
            type: 1,
            title: "排序设置",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["540px", "300px"],
            content: $("#win-orderby"),
            btn: ["确定", "取消"],
            yes: function (K) {
                var M = {};
                var J = $("#win-orderby").find("tr:eq(0)");
                M["useSql"] = J.find("input").is(":checked");
                var H = $("#win-orderby").find("tr:eq(1)");
                M["type"] = H.find("select").val();
                var L = new Array();
                var I = $("#win-orderby").find("table.tb-all");
                I.find("tr:gt(1)").each(function () {
                    var N = $(this).find("input.column").val();
                    L.push(N)
                });
                if (L.length > 0) {
                    M["columns"] = L
                }
                if (L.length > 0) {
                    E["orderBy"] = M
                }
                var G = "<i class='icon iconfont icon-paixu fa-lg fa-lg'></i>";
                F.setIcon(G, true);
                layer.close(K)
            },
            success: function () {
                var G = E["orderBy"] ? E["orderBy"] : {};
                A(G)
            }
        })
    })
});
$(function () {
    $("#win-view-column-divide").find("input[type=radio]").iCheck({radioClass: "iradio_minimal"});
    var B = $("#win-view-column-divide").children("table");
    var H = B.find("tr:eq(0)");
    var G = B.find("tr:eq(1)");
    var F = B.find("tr:eq(2)");
    var E = B.find("tr:eq(3)");
    var D = B.find("tr:eq(4)");
    var C = B.find("tr:eq(6)");
    H.find("input[type=radio]").on("ifChecked", function (K) {
        var J = parseInt($(this).val());
        G.hide();
        F.hide();
        E.hide();
        if (J == 0) {
            G.show()
        } else {
            if (J == 1) {
                F.show()
            } else {
                if (J == 2) {
                    E.show()
                }
            }
        }
    });
    B.find("li").click(function () {
        B.find("li").removeClass("tl-hover");
        $(this).addClass("tl-hover");
        D.find("input").val($(this).attr("val"))
    });
    C.find("a").bind("click", cellSelectHandler);
    var I = function () {
        var W = report["reportView"] ? report["reportView"] : {};
        var N = W["columnDivide"] ? W["columnDivide"] : {};
        var L = anyExcel.getSelectGridCell();
        if (L != null && L.mark == 7) {
            var X = L.content;
            W = X.reportView ? X.reportView : {};
            N = W.columnDivide ? W.columnDivide : {}
        }
        var K = $("#win-view-column-divide").children("table");
        var V = K.find("tr:eq(0)");
        var R = N["type"] ? N["type"] : 0;
        V.find("input:eq(" + R + ")").iCheck("check");
        var T = K.find("tr:eq(1)");
        var S = K.find("tr:eq(2)");
        var Q = K.find("tr:eq(3)");
        T.hide();
        S.hide();
        Q.hide();
        if (R == 0) {
            T.show()
        } else {
            if (R == 1) {
                S.show()
            } else {
                if (R == 2) {
                    Q.show()
                }
            }
        }
        var P = K.find("tr:eq(4)");
        var U = N["num"] ? N["num"] : "";
        P.find("input").val(U);
        var O = K.find("tr:eq(5)");
        var Y = N["gap"] ? N["gap"] : "";
        O.find("input").val(Y);
        var M = K.find("tr:eq(6)");
        var J = N["area"] ? N["area"] : "";
        M.find("input").val(J)
    };
    var A = function () {
        var L = {};
        var J = $("#win-view-column-divide").children("table");
        var P = J.find("tr:eq(0)");
        var S = P.find("input:checked").val();
        L["type"] = parseInt(S);
        var O = J.find("tr:eq(4)");
        L["num"] = O.find("input").val();
        var N = J.find("tr:eq(5)");
        L["gap"] = N.find("input").val();
        var M = J.find("tr:eq(6)");
        L["area"] = M.find("input").val();
        var Q = {};
        var K = anyExcel.getSelectGridCell();
        if (K != null && K.mark == 7) {
            var R = K.content;
            Q["columnDivide"] = L;
            R.reportView = Q
        } else {
            Q["columnDivide"] = L;
            report["reportView"] = Q
        }
    };
    $("li.tl-view-column-divide").click(function () {
        formIdx = layer.open({
            type: 1,
            title: "分栏设置",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["540px", "360px"],
            content: $("#win-view-column-divide"),
            btn: ["确定", "取消"],
            yes: function (J) {
                A();
                layer.close(J)
            },
            success: function () {
                I()
            }
        })
    })
});
var divCoor = null;
$(function () {
    divCoor = new DivCoor();
    $("li.tl-insert-div-text").click(function () {
        divCoor.appendDiv(300, 200)
    });
    $("#right-property-panel").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    $("#right-property-div").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    var K = $("#right-property-div").find("tr:eq(1)");
    K.find("input").change(function () {
        divCoor.setName($(this).val())
    });
    var J = $("#right-property-div").find("tr:eq(2)");
    J.find("input").change(function () {
        divCoor.setWidth($(this).val())
    });
    var I = $("#right-property-div").find("tr:eq(3)");
    I.find("input").change(function () {
        divCoor.setHeight($(this).val())
    });
    var H = $("#right-property-div").find("tr:eq(4)");
    H.find("input").change(function () {
        divCoor.setX($(this).val())
    });
    var G = $("#right-property-div").find("tr:eq(5)");
    G.find("input").change(function () {
        divCoor.setY($(this).val())
    });
    var E = $("#right-property-div").find("tr:eq(6)");
    E.find("input").on("ifChanged", function (N) {
        divCoor.setPrinterFlag($(this).is(":checked") ? 0 : 1)
    });
    var F = $("#right-property-panel").find("tr:eq(1)");
    F.find("input").change(function () {
        divCoor.setName($(this).val())
    });
    var D = $("#right-property-panel").find("tr:eq(2)");
    D.find("input").change(function () {
        divCoor.setTitle($(this).val())
    });
    var C = $("#right-property-panel").find("tr:eq(3)");
    C.find("input").change(function () {
        divCoor.setWidth($(this).val())
    });
    var B = $("#right-property-panel").find("tr:eq(4)");
    B.find("input").change(function () {
        divCoor.setHeight($(this).val())
    });
    var A = $("#right-property-panel").find("tr:eq(5)");
    A.find("input").change(function () {
        divCoor.setX($(this).val())
    });
    var M = $("#right-property-panel").find("tr:eq(6)");
    M.find("input").change(function () {
        divCoor.setY($(this).val())
    });
    var L = $("#right-property-panel").find("tr:eq(7)");
    L.find("input").on("ifChanged", function (N) {
        divCoor.setPrinterFlag($(this).is(":checked") ? 0 : 1)
    });
    $("li.tl-insert-div-chart").click(function () {
        layer.open({
            type: 1,
            title: "插入图表",
            zIndex: 1025,
            shadeClose: true,
            area: ["760px", "500px"],
            content: $("#win-chart"),
            btn: ["确定", "取消"],
            yes: function (N) {
                var P = $("#win-chart").find("img.chart-img-active");
                if (P.length == 0) {
                    layer.alert("请选择图表");
                    return false
                }
                var O = $("<img>", {src: P.attr("big")});
                O.css("width", 400 - 2).css("height", 300 - 2);
                var Q = parseInt(P.attr("type"));
                divCoor.appendChartDiv(400, 300, O, Q);
                layer.close(N)
            }
        })
    });
    $("li.tl-insert-panel-chart").click(function () {
        layer.open({
            type: 1,
            title: "插入图表",
            zIndex: 1025,
            shadeClose: true,
            area: ["760px", "500px"],
            content: $("#win-chart"),
            btn: ["确定", "取消"],
            yes: function (N) {
                var P = $("#win-chart").find("img.chart-img-active");
                if (P.length == 0) {
                    layer.alert("请选择图表");
                    return false
                }
                var O = $("<img>", {src: P.attr("big")});
                O.css("width", "100%").css("height", "100%");
                var Q = parseInt(P.attr("type"));
                divCoor.appendPanel(400, 330, O, Q);
                layer.close(N)
            }
        })
    });
    $("li.tl-insert-cell-panel-chart").click(function () {
        var N = anyExcel.getGrid().selectedGridCell;
        if (N == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        layer.open({
            type: 1,
            title: "插入图表",
            zIndex: 1025,
            shadeClose: true,
            area: ["760px", "500px"],
            content: $("#win-chart"),
            btn: ["确定", "取消"],
            yes: function (P) {
                var S = $("#win-chart").find("img.chart-img-active");
                if (S.length == 0) {
                    layer.alert("请选择图表");
                    return false
                }
                var R = $("<img>", {src: S.attr("big")});
                R.css("width", "100%").css("height", "100%");
                var T = parseInt(S.attr("type"));
                var U = $(N.o);
                N.mark = 8;
                var O = new Content();
                O["chartType"] = T;
                O.initChart();
                var Q = {};
                Q.chartCell = O;
                Q.mark = 3;
                N.content.cellPanel = Q;
                divCoor.appendCellPanel(400, 330, R, U);
                grid.setFirstGridCellWidth(N, 400);
                grid.setFirstGridCellHeight(N, 300);
                layer.close(P)
            }
        })
    })
});
$(function () {
    $("a.tl-data-format").click(function () {
        var A = $(this);
        layer.open({
            type: 1,
            title: "数据格式",
            zIndex: 1025,
            shadeClose: true,
            area: ["480px", "400px"],
            content: $("#win-data-format"),
            btn: ["确定", "取消"],
            yes: function (D) {
                var C = $("#win-data-format").find("input[name=format]");
                if (C.val() != "") {
                    var B = A.prev().find("select");
                    var E = $("<option value='" + C.attr("code") + "' selected='selected'>" + C.val() + "</option>");
                    B.append(E);
                    B.selectpicker("refresh");
                    B.trigger("change")
                }
                layer.close(D)
            },
            success: function () {
                $("#win-data-format").find("div.money-type").hide()
            }
        })
    });
    $("#win-data-format").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal"});
    $("#win-data-format").find("input[type=checkbox]").on("ifChanged", function (A) {
        anyExcel.getGrid().localeUs($(this).is(":checked"))
    });
    $("#win-data-format").find("ul.formatType").children("li").click(function () {
        var A = $(this).attr("type");
        $("#win-data-format-content").find("ul").hide();
        $("#win-data-format").find("div.money-type").hide();
        if (A == "1") {
            $("#win-data-format-content").find("ul.number").show()
        } else {
            if (A == "2") {
                $("#win-data-format-content").find("ul.date").show()
            } else {
                if (A == "3") {
                    $("#win-data-format-content").find("ul.datetime").show()
                } else {
                    if (A == "4") {
                        $("#win-data-format-content").find("ul.time").show()
                    } else {
                        if (A == "5") {
                            $("#win-data-format-content").find("ul.money").show();
                            $("#win-data-format").find("div.money-type").show()
                        } else {
                            if (A == "6") {
                                $("#win-data-format-content").find("ul.percent").show()
                            }
                        }
                    }
                }
            }
        }
    });
    $("#win-data-format").find("select").change(function () {
        var A = $(this).val();
        $("#win-data-format-content").find("ul").hide();
        if (A == "￥") {
            $("#win-data-format-content").find("ul.money").show()
        } else {
            if (A == "$") {
                $("#win-data-format-content").find("ul.money1").show()
            } else {
                if (A == "US$") {
                    $("#win-data-format-content").find("ul.money2").show()
                }
            }
        }
    });
    $("#win-data-format-content").find("li").click(function () {
        var A = $(this).text();
        $("#win-data-format").find("input[name=format]").val(A);
        $("#win-data-format").find("input[name=format]").attr("code", $(this).attr("val"))
    });
    $("select.tl-data-format-select").change(function () {
        var A = $(this).val();
        anyExcel.getGrid().formatId(A)
    })
});
$(function () {
    $("#win-arg-attr").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal",});
    var A = function (D, E) {
        return ((1 << D) & E) != 0
    };
    var C = function () {
        var F = $("#win-arg-attr").children("table");
        var E = report.reportArg != undefined ? report.reportArg : {};
        var G = E.relative != undefined ? E.relative : (TYPE == "app" ? 2 : 0);
        var D = F.find("tr:eq(0)");
        D.find("input").each(function (I) {
            var H = parseInt($(this).val());
            var J = A(H, G) ? "check" : "uncheck";
            $(this).iCheck(J)
        })
    };
    var B = function () {
        var F = $("#win-arg-attr").children("table");
        var D = F.find("tr:eq(0)");
        var G = 0;
        D.find("input").each(function () {
            var H = parseInt($(this).val());
            if ($(this).is(":checked")) {
                G = G | (1 << H)
            } else {
                G = (~(1 << H)) & G
            }
        });
        var E = report.reportArg != undefined ? report.reportArg : {};
        E.relative = G;
        report.reportArg = E
    };
    $("li.tl-arg-attr").click(function () {
        layer.open({
            type: 1,
            title: "参数属性",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["610px", "460px"],
            content: $("#win-arg-attr"),
            btn: ["确定", "取消"],
            yes: function (D) {
                B();
                layer.close(D)
            },
            success: function () {
                C()
            }
        })
    })
});
$(function () {
    $("#win-report-attr").find("input[type=radio]").iCheck({radioClass: "iradio_minimal",});
    $("#win-report-attr").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal",});
    var D = $("#win-report-attr-page").find("tr:eq(7)");
    D.find("td:eq(1)").find("span:eq(1)").find("a").click(function () {
        report.bgImage = "";
        C("", D)
    });
    var E = function (H, I) {
        return ((1 << H) & I) != 0
    };
    var C = function (I, J) {
        if (I == "") {
            var H = $("<input type='file'/>");
            J.find("td:eq(1)").find("span:eq(0)").empty().append(H);
            H.change(function () {
                var M = this.files[0];
                if (!/image\/\w+/.test(M.type)) {
                    alert("请上传图片!");
                    return false
                }
                var L = new FileReader();
                L.onload = function () {
                    var N = this.result;
                    var O = $("<img></img>").attr("src", N).height(45);
                    J.find("td:eq(1)").find("span:eq(0)").empty().append(O);
                    J.find("td:eq(1)").find("span:eq(1)").show();
                    report.bgImage = N
                };
                L.readAsDataURL(M)
            });
            J.find("td:eq(1)").find("span:eq(1)").hide()
        } else {
            var K = $("<img></img>").attr("src", I).height(45);
            J.find("td:eq(1)").find("span:eq(0)").empty().append(K);
            J.find("td:eq(1)").find("span:eq(1)").show()
        }
    };
    var B = $("#win-report-attr-printer").children("table");
    var A = B.find("tr:eq(3)");
    A.find("a").bind("click", cellSelectHandler);
    var F = function () {
        var n = $("#win-report-attr-page").find("tr:eq(0)");
        var O = report.name ? report.name : "";
        n.find("input").val(O);
        var m = $("#win-report-attr-page").find("tr:eq(1)");
        var W = report.offset ? report.offset : 0;
        m.find("input[value=" + W + "]").iCheck("check");
        var k = $("#win-report-attr-page").find("tr:eq(2)");
        var V = report.exportFlag != undefined ? report.exportFlag : 79;
        k.find("input").each(function (t) {
            var s = parseInt($(this).val());
            var u = E(s, V) ? "check" : "uncheck";
            $(this).iCheck(u)
        });
        var h = $("#win-report-attr-page").find("tr:eq(3)");
        var Q = report.loadMode ? report.loadMode : 0;
        h.find("input[value=" + Q + "]").iCheck("check");
        var f = $("#win-report-attr-page").find("tr:eq(4)");
        var J = report.asyncData ? report.asyncData : {};
        var I = J.interval ? J.interval : "";
        var j = J.timeType != undefined ? J.timeType : 0;
        f.find("input").val(I);
        f.find("select").selectpicker("val", j);
        var d = $("#win-report-attr-page").find("tr:eq(5)");
        var M = report.relative != undefined ? report.relative : 0;
        d.find("input").each(function (t) {
            var s = parseInt($(this).val());
            var u = E(s, M) ? "check" : "uncheck";
            $(this).iCheck(u)
        });
        var b = $("#win-report-attr-page").find("tr:eq(6)");
        var U = report.bgColor != undefined ? report.bgColor : null;
        b.find("input.color-select").spectrum("set", U);
        var Z = $("#win-report-attr-page").find("tr:eq(7)");
        var N = report.bgImage != undefined ? report.bgImage : "";
        C(N, Z);
        var K = $("#win-report-attr-printer").children("table");
        var P = report.printerAttr ? report.printerAttr : {};
        var l = K.find("tr:eq(0)");
        var p = P.rotate != undefined ? P.rotate : 0;
        l.find("input[value=" + p + "]").iCheck("check");
        var i = K.find("tr:eq(1)");
        var L = P.marginLeft != undefined ? P.marginLeft : 36;
        var X = P.marginTop != undefined ? P.marginTop : 36;
        var r = P.marginRight != undefined ? P.marginRight : 36;
        var S = P.marginBottom != undefined ? P.marginBottom : 36;
        i.find("input:eq(0)").val(L);
        i.find("input:eq(1)").val(X);
        i.find("input:eq(2)").val(r);
        i.find("input:eq(3)").val(S);
        var g = K.find("tr:eq(2)");
        var o = P.zoom ? P.zoom : "100";
        g.find("input").val(o);
        var H = P.hTOut == 1 ? "check" : "uncheck";
        var e = K.find("tr:eq(3)");
        e.find("input").iCheck(H);
        var q = P.num != undefined ? P.num : "";
        var c = K.find("tr:eq(4)");
        c.find("input").val(q);
        var T = P.area != undefined ? P.area : "";
        var a = K.find("tr:eq(5)");
        a.find("input").val(T);
        var R = (P.cellBgOut == undefined || P.cellBgOut == 0) ? "check" : "uncheck";
        var Y = K.find("tr:eq(6)");
        Y.find("input").iCheck(R)
    };
    var G = function () {
        var h = $("#win-report-attr-page").find("tr:eq(0)");
        report.name = h.find("input").val();
        var g = $("#win-report-attr-page").find("tr:eq(1)");
        report.offset = parseInt(g.find("input[type='radio']:checked").val());
        var f = $("#win-report-attr-page").find("tr:eq(2)");
        var Z = report.exportFlag ? report.exportFlag : 79;
        f.find("input").each(function () {
            var i = parseInt($(this).val());
            if ($(this).is(":checked")) {
                Z = Z | (1 << i)
            } else {
                Z = (~(1 << i)) & Z
            }
        });
        report.exportFlag = Z;
        var d = $("#win-report-attr-page").find("tr:eq(3)");
        report.loadMode = parseInt(d.find("input[type='radio']:checked").val());
        var b = $("#win-report-attr-page").find("tr:eq(4)");
        var H = {};
        var c = b.find("input").val();
        if (c != "") {
            H.interval = c;
            H.timeType = b.find("select").val();
            report.asyncData = H
        } else {
            report.asyncData = null
        }
        var a = $("#win-report-attr-page").find("tr:eq(5)");
        var e = 0;
        a.find("input").each(function () {
            var i = parseInt($(this).val());
            if ($(this).is(":checked")) {
                e = e | (1 << i)
            } else {
                e = (~(1 << i)) & e
            }
        });
        report.relative = e;
        var Y = $("#win-report-attr-page").find("tr:eq(6)");
        if (Y.find("input.color-select").spectrum("get") != null) {
            var N = Y.find("input.color-select").spectrum("get").toHex(false);
            report.bgColor = "#" + N
        } else {
            report.bgColor = undefined
        }
        var U = {};
        var M = $("#win-report-attr-printer").children("table");
        var V = M.find("tr:eq(0)");
        U.rotate = V.find("input:checked").val();
        var T = M.find("tr:eq(1)");
        var W = T.find("input:eq(0)").val();
        U.marginLeft = W != "" ? W : 36;
        var I = T.find("input:eq(1)").val();
        U.marginTop = I != "" ? I : 36;
        var K = T.find("input:eq(2)").val();
        U.marginRight = K != "" ? K : 36;
        var L = T.find("input:eq(3)").val();
        U.marginBottom = I != "" ? L : 36;
        var S = M.find("tr:eq(2)");
        U.zoom = S.find("input").val();
        var R = M.find("tr:eq(3)");
        U.hTOut = R.find("input").is(":checked") ? 1 : undefined;
        var Q = M.find("tr:eq(4)");
        var J = Q.find("input").val();
        U.num = J != "" ? J : undefined;
        var P = M.find("tr:eq(5)");
        var X = P.find("input").val();
        U.area = X != "" ? X : undefined;
        var O = M.find("tr:eq(6)");
        U.cellBgOut = O.find("input").is(":checked") ? 0 : 1;
        report.printerAttr = U
    };
    $("li.tl-report-attr").click(function () {
        formIdx = layer.open({
            type: 1,
            title: "报表属性",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["610px", "460px"],
            content: $("#win-report-attr"),
            btn: ["确定", "取消"],
            yes: function (H) {
                G();
                layer.close(H)
            },
            success: function () {
                F()
            }
        })
    })
});
$(function () {
    var D = $("#win-extendUnits").children("div");
    var B = $("#win-extendUnits").children("table");
    D.find("li").click(function () {
        var E = B.find("tr:eq(1)");
        var G = E.clone().show();
        var H = G.find("td:eq(0)");
        H.find("a").bind("click", cellSelectHandler);
        var F = G.find("td:eq(1)");
        F.find("a").click(function () {
            $(this).parent().parent().remove()
        });
        B.append(G)
    });
    var C = function () {
        B.find("tr:gt(1)").remove();
        var K = report.extendUnits;
        if (K && K.length > 0) {
            for (var G = 0; G < K.length; G++) {
                var F = K[G];
                var J = F.sourceRowCol + ":" + F.destRowCol;
                var E = B.find("tr:eq(1)");
                var I = E.clone().show();
                var L = I.find("td:eq(0)");
                L.find("input").val(J);
                L.find("a").bind("click", cellSelectHandler);
                var H = I.find("td:eq(1)");
                H.find("a").click(function () {
                    $(this).parent().parent().remove()
                });
                B.append(I)
            }
        }
    };
    var A = function () {
        var E = new Array();
        B.find("tr:gt(1)").each(function () {
            var I = $(this).find("td:eq(0)");
            var G = I.find("input").val();
            var H = G.split(":");
            var F = {};
            F.sourceRowCol = H[0];
            F.destRowCol = H[1];
            if (F.sourceRowCol && F.destRowCol) {
                E.push(F)
            }
        });
        report.extendUnits = E
    };
    $("li.tl-expand-Units").click(function () {
        formIdx = layer.open({
            type: 1,
            title: "扩展单元域",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["420px", "320px"],
            content: $("#win-extendUnits"),
            btn: ["确定", "取消"],
            yes: function (E) {
                A();
                layer.close(E);
                if (report.extendUnits) {
                    anyExcel.getGrid().drawExtendUnitsBorder(report.extendUnits)
                }
            },
            success: function () {
                C()
            }
        })
    })
});
$(function () {
    $("li.tl-view-rptxml").click(function () {
        layer.open({
            type: 1,
            title: "数据格式",
            zIndex: 1025,
            shadeClose: true,
            area: ["680px", "460px"],
            content: $("#win-rptxml"),
            btn: ["确定", "取消"],
            yes: function (A) {
            },
            success: function () {
                var B = new RptXml();
                var A = B.stringify(report);
                $("#win-rptxml").find("pre").html(B.htmlEncode(A))
            }
        })
    })
});
$(function () {
    $("a.tl-fx").bind("click", function (G) {
        var F = anyExcel.getSelectGridCell();
        if (F != null) {
            var H = F.getText();
            $(this).data("fx", H)
        }
        fxHandler($(this))
    });
    $("a.tl-fx-input").bind("click", function (G) {
        var F = $(this).prev();
        if (F.val() != null) {
            $(this).data("fx", F.val())
        }
        fxHandler($(this))
    });
    var D = function (F, G) {
        anyExcel.setColumnWithArg(F, G)
    };
    var A = "";
    var E = function () {
        var F = A + "(";
        $("#win-fx-forumula-table").find("tr:gt(0)").each(function () {
            var H = $(this).find("select:eq(0)").val();
            var G = $(this).find("input").val();
            if (H == 3) {
                G = $(this).find("select:eq(1)").val()
            }
            F += G + ","
        });
        F = F.substring(0, F.length - 1);
        F += ")";
        $("#win-fx-forumula-demo").show().val(F)
    };
    var C = function () {
        $("#win-fx-forumula-icon").hide();
        $("#win-fx-forumula-table").find("tr:gt(0)").remove();
        $("#win-fx-forumula-table").hide();
        $("#win-fx-forumula-word").hide();
        $("#win-fx-forumula-demo").hide();
        $("#win-fx-forumula-desc").hide();
        $("#win-fx-forumula-word-div").hide()
    };
    $("#win-fx-type").find("li").click(function () {
        $("#win-fx-general").hide();
        $("#win-fx-percent").hide();
        $("#win-fx-logical").hide();
        $("#win-fx-text").hide();
        $("#win-fx-datetime").hide();
        $("#win-fx-math").hide();
        $("#win-fx-datetime-cal").hide();
        $("#win-fx-other").hide();
        $("#win-fx-type").find("li").removeClass("tl-hover");
        $(this).addClass("tl-hover");
        var F = $(this).attr("type");
        if (F == 0) {
            $("#win-fx-general").show()
        } else {
            if (F == 1) {
                $("#win-fx-percent").show()
            } else {
                if (F == 2) {
                    $("#win-fx-logical").show()
                } else {
                    if (F == 3) {
                        $("#win-fx-text").show()
                    } else {
                        if (F == 4) {
                            $("#win-fx-datetime").show()
                        } else {
                            if (F == 5) {
                                $("#win-fx-math").show()
                            } else {
                                if (F == 6) {
                                    $("#win-fx-datetime-cal").show()
                                } else {
                                    if (F == 7) {
                                        $("#win-fx-other").show()
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        C();
        $("#win-fx-forumula").find("li").removeClass("tl-hover")
    });
    var B = function (H, M, G) {
        var L = $("#win-fx-forumula-table").find("tr:eq(0)");
        for (var K = 0; K < G; K++) {
            var F = L.clone();
            var I = F.find("span.argName");
            I.html(H ? M : M[K]);
            F.find("select").addClass("selectpicker").selectpicker("refresh");
            F.show();
            var J = F.find("td:eq(1)");
            D(J, "");
            J.find("input").change(function () {
                E()
            });
            J.find("select:eq(1)").change(function () {
                E()
            });
            $("#win-fx-forumula-table").append(F)
        }
    };
    $("#win-fx-forumula").find("li").click(function () {
        $("#win-fx-forumula").find("li").removeClass("tl-hover");
        $(this).addClass("tl-hover");
        A = $(this).text();
        var I = functions[A];
        var F = I[0];
        C();
        if (F == -1) {
            $("#win-fx-forumula-icon").show();
            F = 1
        }
        if (F != 0) {
            $("#win-fx-forumula-table").show()
        }
        if (F > 0) {
            var H = I[1];
            var G = typeof (H) == "string";
            B(G, H, F)
        }
        $("#win-fx-forumula-word-div").show();
        $("#win-fx-forumula-word").show().html(I[2]);
        $("#win-fx-forumula-demo").show().val(A + "()");
        $("#win-fx-forumula-desc").show().html(I[3])
    });
    $("#win-fx-forumula-icon").find("li:eq(0)").click(function () {
        B(true, "参数", 1)
    });
    $("#win-fx-forumula-icon").find("li:eq(1)").click(function () {
        if ($("#win-fx-forumula-table").find("tr").length > 2) {
            $("#win-fx-forumula-table").find("tr:last").remove();
            E()
        }
    })
});
$(function () {
    var E = new RptXml();
    var B = {data: {simpleData: {enable: true}}};
    var D = null;
    var C = function () {
        $.ajax({
            type: "POST",
            url:"./php/findallfolder.php",
            dataType: "json",
            success: function (H) {
                D = $.fn.zTree.init($("#win-report-folder-tree"), B, H)
            }
        })
    };
    var A = function () {
        if (D == null) {
            return 0
        }
        var H = D.getSelectedNodes();
        if (H.length > 0) {
            return H[0].id
        }
        return 0
    };
    var G = false;
    $("li.tl-report-save").click(function () {
        if (rptType == "form" || rptType == "formEdit") {
            var H = E.stringify(report);
            parent.setRptXml(H);
            return false
        }
        layer.open({
            type: 1,
            title: "保存报表",
            zIndex: 1025,
            shadeClose: true,
            area: ["600px", "420px"],
            content: $("#win-report-save"),
            btn: ["确定", "取消"],
            yes: function (J) {
                if (G) {
                    document.location.href = PATH + "/rptMgr/" + TYPE + "/add_rpt.htm";
                    return false
                }
                if (!Validate.validation($("#win-report-save"))) {
                    return false
                }
                var I = $("#win-report-save").find("tr:eq(0)");
                report.name = I.find("input").val();
                var K = E.stringify(report);
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "./php/saverpttplt.php",
                    data: JSON.stringify({folderId: A(), rptxml: K, rptId: report.rptId}),
                    dataType: "json",
                    success: function (L) {
                        if (!L.success) {
                            alertError("报表保存出现错误", L.errorMsg)
                        } else {
                            G = true;
                            $("#win-report-save").children("table").hide();
                            $("#win-report-save").children("div").show();
                            var M = "报表[" + report.name + "] 保存成功";
                            $("#win-report-save-success").empty().html(M)
                        }
                    }
                })
            },
            success: function () {
                G = false;
                $("#win-report-save").children("div").hide();
                $("#win-report-save").children("table").show();
                var J = $("#win-report-save").find("tr:eq(0)");
                if (report.name != undefined) {
                    J.find("input").val(report.name)
                }
                if (report.rptId == undefined || report.rptId == "") {
                    C()
                } else {
                    var I = $("#win-report-save").find("tr:eq(1)");
                    I.hide()
                }
            }
        })
    });
    var F = $("#win-report-save").children("div").find("ul");
    F.find("li:eq(0)").click(function () {
        document.location.href = PATH + "/rptMgr/" + TYPE + "/add_rpt.htm"
    });
    F.find("li:eq(1)").click(function () {
        document.location.href = PATH + "/rptMgr/" + TYPE + "/index.htm"
    })
});
$(function () {
    var A = $("#win-input-hidden").children("div");
    var B = $("#win-input-hidden").children("table");
    A.find("li").click(function () {
        D()
    });
    var D = function (K) {
        var K = K ? K : {};
        var H = B.find("tr:eq(1)").clone().show();
        H.find("select").addClass("selectpicker").selectpicker("refresh");
        var O = H.find("td:eq(0)");
        if (K.name != undefined) {
            O.find("input").val(K.name)
        }
        var I = H.find("td:eq(1)");
        var N = I.find("select:eq(0)");
        N.change(function () {
            var P = parseInt($(this).val());
            if (P == 5) {
                $(I.children("span")[1]).show()
            } else {
                $(I.children("span")[1]).hide()
            }
        });
        if (K.dataType != undefined) {
            N.selectpicker("val", K.dataType);
            N.trigger("change")
        }
        var M = I.find("select:eq(1)");
        if (K.dateFormat != undefined) {
            M.selectpicker("val", K.dateFormat)
        }
        var G = H.find("td:eq(2)");
        var L = $(G.children("span")[0]);
        var J = $(G.children("span")[1]);
        L.find("select").change(function () {
            var P = $(this).val();
            if (P == "0") {
                J.children("input").show();
                J.children("a").hide();
                J.children("span").hide()
            } else {
                if (P == "1") {
                    J.children("input").show();
                    J.children("a").show();
                    J.children("span").hide()
                } else {
                    J.children("input").hide();
                    J.children("a").hide();
                    J.children("span").show()
                }
            }
        });
        J.children("a").bind("click", fxInputSelectHandler);
        if (K.defaultValueType != undefined) {
            L.find("select").selectpicker("val", K.defaultValueType)
        }
        L.find("select").trigger("change");
        if (K.defaultValueType == 0 || K.defaultValueType == 1) {
            if (K.defaultValue != undefined) {
                J.children("input").val(K.defaultValue)
            }
        } else {
            J.find("select").selectpicker("val", K.defaultValue)
        }
        var F = H.find("td:eq(3)");
        F.find("a").click(function () {
            $(this).parent().parent().remove()
        });
        B.append(H)
    };
    var E = function () {
        var F = new Array();
        B.find("tr:gt(1)").each(function () {
            var K = {};
            var O = $(this).find("td:eq(0)");
            K.name = O.find("input").val();
            var I = $(this).find("td:eq(1)");
            var N = I.find("select:eq(0)");
            K.dataType = parseInt(N.val());
            if (K.dataType == 5) {
                var M = I.find("select:eq(1)");
                K.dateFormat = M.val()
            }
            var H = $(this).find("td:eq(2)");
            var L = $(H.children("span")[0]);
            var J = $(H.children("span")[1]);
            var P = parseInt(L.find("select").val());
            K.defaultValueType = P;
            if (P == 0 || P == 1) {
                K.defaultValue = J.children("input").val()
            } else {
                K.defaultValue = J.find("select").val()
            }
            F.push(K)
        });
        var G = report.reportArg != undefined ? report.reportArg : {};
        G.hiddens = F;
        report.reportArg = G
    };
    var C = function () {
        B.find("tr:gt(1)").remove()
    };
    $("li.tl-input-hidden").click(function () {
        layer.open({
            type: 1,
            title: "隐藏域设置",
            zIndex: 1025,
            shadeClose: true,
            area: ["720px", "420px"],
            content: $("#win-input-hidden"),
            btn: ["确定", "取消"],
            yes: function (F) {
                E();
                layer.close(F)
            },
            success: function () {
                C();
                var H = report.reportArg ? report.reportArg : {};
                var G = H.hiddens ? H.hiddens : {};
                if (!$.isEmptyObject(G)) {
                    for (var F = 0; F < G.length; F++) {
                        var I = G[F];
                        D(I)
                    }
                }
            }
        })
    })
});
$(function () {
    var A = function (D) {
        var F = $("#win-insert-image").find("input.input-image");
        var B = F.height();
        var E = F.width();
        var C = new Array();
        if (D != "") {
            C.push(D)
        }
        upload.initFilePreview(F, C, E, B)
    };
    $("li.tl-insert-image").click(function () {
        layer.open({
            type: 1,
            title: "插入图片",
            zIndex: 1025,
            shadeClose: true,
            area: ["650px", "440px"],
            content: $("#win-insert-image"),
            btn: ["确定", "取消"],
            yes: function (B) {
                var E = anyExcel.getGrid().selectedGridCell;
                if (E == null) {
                    layer.alert("请选中一个单元格");
                    return false
                }
                var D = E.content;
                var F = $(E.o);
                var C = $("#win-insert-image").find(".file-preview-frame").find("img");
                if (C.length > 0) {
                    E.mark = 5;
                    D.imageUrl = $(C[0]).attr("src");
                    E.setImage($(C[0]).clone(), F.width(), F.height())
                } else {
                    F.find("div").remove();
                    E.reset()
                }
                layer.close(B)
            },
            success: function () {
                var C = anyExcel.getGrid().selectedGridCell;
                if (C == null) {
                    return false
                }
                var B = C.content;
                var D = $("#win-insert-image").find("input.input-image");
                upload.clearFilePreview(D);
                D.parent().find("img").remove();
                if (B.mark = 5 && B.imageUrl != undefined) {
                    A(B.imageUrl)
                } else {
                    A("")
                }
            }
        })
    })
});
$(function () {
    $("#win-insert-background").find("input[type=radio]").iCheck({radioClass: "iradio_minimal"});
    $("#win-insert-background").find("input[type=checkbox]").iCheck({checkboxClass: "icheckbox_minimal",});
    var A = function (D) {
        var F = $("#win-insert-background").find("input.input-image");
        var B = F.height();
        var E = F.width();
        var C = new Array();
        if (D != "") {
            C.push(D)
        }
        upload.initFilePreview(F, C, E, B)
    };
    $("li.tl-insert-background").click(function () {
        layer.open({
            type: 1,
            title: "插入背景图",
            zIndex: 1025,
            shadeClose: true,
            area: ["650px", "440px"],
            content: $("#win-insert-background"),
            btn: ["确定", "取消"],
            yes: function (C) {
                var E = report.style != undefined ? report.style : {};
                var B = $("#win-insert-background").find("input[type=radio]:checked").val();
                var F = $("#win-insert-background").find("input[type=checkbox]").is(":checked") ? 0 : 1;
                var D = $("#win-insert-background").find(".file-preview-frame").find("img");
                if (D.length > 0) {
                    E.tgBackground = $(D[0]).attr("src");
                    E.tgType = B;
                    anyExcel.initReportStyle(E);
                    report.style = E;
                    report.bgPrinterOut = F
                } else {
                    $("#report-table").attr("style", "");
                    report.style = undefined
                }
                layer.close(C)
            },
            success: function () {
                var D = report.style != undefined ? report.style : {};
                var B = D.tgType != undefined ? D.tgType : 0;
                $("#win-insert-background").find("div:eq(0)").find("input[value=" + B + "]").iCheck("checked");
                var C = report.bgPrinterOut == 1 ? "uncheck" : "check";
                $("#win-insert-background").find("input[type=checkbox]").iCheck(C);
                var E = $("#win-insert-background").find("input.input-image");
                upload.clearFilePreview(E);
                E.parent().find("img").remove();
                if (D.tgBackground != undefined) {
                    A(D.tgBackground)
                } else {
                    A("")
                }
            }
        })
    })
});
$(function () {
    var A = $("#win-insert-icon").find("table");
    A.find("td").click(function () {
        A.find("td").removeClass("table-icon-active");
        $(this).addClass("table-icon-active")
    });
    $("li.tl-insert-icon").click(function () {
        layer.open({
            type: 1,
            title: "插入图标",
            zIndex: 1025,
            shadeClose: true,
            area: ["650px", "440px"],
            content: $("#win-insert-icon"),
            btn: ["确定", "取消"],
            yes: function (C) {
                var E = anyExcel.getGrid().selectedGridCell;
                if (E == null) {
                    layer.alert("请选中一个单元格");
                    return false
                }
                var D = A.find("td.table-icon-active");
                if (D.length == 0) {
                    return false
                }
                var B = "<i class='" + D.find("i").attr("class") + " fa-lg'></i>";
                E.setIcon(B, false);
                E.mark = 0;
                var F = {};
                F.size = 14;
                F.iconString = D.find("i").attr("class") + " fa-lg";
                F.align = "left";
                E.content.iconStyle = F;
                layer.close(C)
            },
            success: function () {
            }
        })
    })
});
$(function () {
    $("#win-tree-expand").find("input[type=radio]").iCheck({radioClass: "iradio_minimal"});
    $("li.tl-tree-expand").click(function () {
        var B = anyExcel.getGrid().selectedGridCell;
        if (B == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        var A = B.content;
        layer.open({
            type: 1,
            title: "折叠设置",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["450px", "240px"],
            content: $("#win-tree-expand"),
            btn: ["确定", "取消"],
            yes: function (E) {
                var F = {};
                var D = $("#win-tree-expand").find("input[type='radio']:checked").val();
                F.foldType = parseInt(D);
                A.cellFold = F;
                var C = F.foldType == 0 ? "<i class='icon iconfont icon-zhedie-jiahao fa-lg'></i>" : "<i class='icon iconfont icon-delete1 fa-lg'></i>";
                B.setIcon(C, false);
                layer.close(E)
            },
            success: function () {
                var C = A.cellFold ? A.cellFold : {};
                if (C.foldType != undefined) {
                    $("#win-tree-expand").find("input:eq(" + C.foldType + ")").iCheck("check")
                }
            }
        })
    })
});
$(function () {
    var B = $("#win-data-filter-condition").find("table");
    var A = $("#win-data-filter-condition").children("div");
    A.find("a").click(function () {
        anyExcel.addDatafilter({}, B)
    });
    A.find("input[type=radio]").iCheck({radioClass: "iradio_minimal"});
    var C = function () {
        B.find("tr:gt(1)").remove();
        A.find("input[type=radio]:eq(0)").iCheck("check")
    };
    $("li.tl-data-filter").click(function () {
        var E = anyExcel.getGrid().selectedGridCell;
        if (E == null) {
            layer.alert("请选中一个单元格");
            return false
        }
        var D = E.content;
        layer.open({
            type: 1,
            title: "数据过滤",
            zIndex: 1025,
            shadeClose: true,
            shade: false,
            area: ["720px", "400px"],
            content: $("#win-data-filter-condition"),
            btn: ["确定", "取消"],
            yes: function (F) {
                anyExcel.setDatafilter(D, B);
                var G = D.dataFilter;
                if (G != undefined) {
                    G.type = A.find("input[type=radio]:checked").val()
                }
                layer.close(F)
            },
            success: function () {
                C();
                var H = D.dataFilter;
                if (H != undefined) {
                    var G = H.type != undefined ? H.type : 0;
                    A.find("input[value=" + G + "]").iCheck("check");
                    var I = H.conditions;
                    for (var F = 0; F < I.length; F++) {
                        anyExcel.addDatafilter(I[F], B)
                    }
                }
            }
        })
    })
});
$(function () {
    $("li.tl-other-rptxml").click(function () {
        layer.open({
            type: 2,
            title: "选择报表",
            zIndex: 1025,
            shadeClose: true,
            area: ["520px", "400px"],
            content: "selectrpt.html",
            btn: ["确定", "取消"],
            yes: function (C, B) {
                var F = window[B.find("iframe")[0]["name"]];
                var E = F.getSelectNode();
                if (E != null) {
                    var D = E.id;
                    $.ajax({
                        type: "POST",
                        url: "./php/queryrpttplt.php",
                        data: {rptId: D},
                        dataType: "text",
                        success: function (K) {
                            var H = report.rptId;
                            var I = report.name;
                            grid.clearAll();
                            argGrid.clearAll();
                            var G = $(".tab-report-arg").attr("aria-expanded");
                            if (G == "true") {
                                $("#tab-arg-report").find("a:eq(1)").data("rptxml", K);
                                $("#tab-arg-report").find("a:eq(1)").on("shown.bs.tab", function (N) {
                                    var M = new RptXml();
                                    var L = M.parse($(this).data("rptxml"));
                                    $(this).data("rptxml", "");
                                    $(this).unbind("shown.bs.tab")
                                });
                                $("#tab-arg-report").find("a:eq(1)").tab("show")
                            } else {
                                var J = new RptXml();
                                var K = J.parse(K)
                            }
                            if (H != "") {
                                report.rptId = H;
                                report.name = I
                            }
                        }
                    })
                }
                layer.close(C)
            }
        })
    });
    $("li.tl-rptxml-export").click(function () {
        var D = new RptXml();
        var C = D.stringify(report);
        var B = report.rptId ? report.rptId : "";
        $("#exportRpt-form").find("input[name=rptId]").val(B);
        $("#exportRpt-form").find("input[name=rptxml]").val(C);
        $("#exportRpt-form").submit()
    });
    $("li.tl-rptxml-import").click(function () {
        layer.open({
            type: 1,
            title: "导入模板文件",
            zIndex: 1025,
            shadeClose: true,
            area: ["400px", "200px"],
            content: $("#win-import-file"),
            btn: ["确定", "取消"],
            yes: function (B) {
                layer.close(B);
                A("rpt")
            },
            success: function () {
                if ($("#win-import-file").find("input").length == 0) {
                    $("#win-import-file").append("<input type='file' name='import-rptxml-file'>")
                }
            }
        })
    });
    $("li.tl-rptxml-import-excel").click(function () {
        layer.open({
            type: 1,
            title: "导入Excel模板文件",
            zIndex: 1025,
            shadeClose: true,
            area: ["400px", "200px"],
            content: $("#win-import-file"),
            btn: ["确定", "取消"],
            yes: function (B) {
                layer.close(B);
                A("xls")
            },
            success: function () {
                if ($("#win-import-file").find("input").length == 0) {
                    $("#win-import-file").append("<input type='file' name='import-rptxml-file'>")
                }
            }
        })
    });
    var A = function (B) {
        $.ajaxFileUpload({
            url: PATH + "/rptMgr/import_rpt_tplt.htm",
            data: {type: B},
            secureuri: false,
            fileElementName: "import-rptxml-file",
            dataType: "text",
            success: function (H, F) {
                if (H == undefined) {
                    return false
                }
                var L = 0;
                var C = 0;
                var N = 0;
                for (var I = 0; I < H.length; I++) {
                    if (H.charAt(I) == "{") {
                        L = I
                    }
                    if (H.charAt(I) == ":") {
                        C = I;
                        break
                    }
                }
                for (var I = H.length - 1; I >= 0; I--) {
                    if (H.charAt(I) == "}") {
                        N = I;
                        break
                    }
                }
                if (C != 0) {
                    var J = H.substring(L + 1, C);
                    var M = H.substring(C + 1, N);
                    if (J == "error") {
                        layer.alert("文件最大不能超过" + M, {icon: 2})
                    } else {
                        var K = report.rptId;
                        var E = report.name;
                        var G = Base64.decode(M);
                        grid.clearAll();
                        argGrid.clearAll();
                        var D = new RptXml();
                        D.parse(G);
                        if (K != "") {
                            report.rptId = K;
                            report.name = E
                        }
                    }
                }
            },
            error: function (D, C, E) {
                layer.alert("文件上传失败, 请选择正确的文件上传!", {icon: 2})
            }
        })
    }
});
$(function () {
    $("a.tl-insert-table").click(function () {
        var B = grid.selectedGridCell;
        if (B == null) {
            return
        }
        var A = B.content;
        if (B.mark == 7) {
            return
        }
        B.setTableIcon();
        anyExcel.initInsertTable(B)
    })
});
$(function () {
    var G = CodeMirror.fromTextArea(document.getElementById("win-develop-js-source"), {
        mode: "text/javascript",
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true
    });
    var E = CodeMirror.fromTextArea(document.getElementById("win-develop-css-source"), {
        mode: "text/css",
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true
    });
    var D = $("#win-develop-js").children("ul");
    D.find("a").on("shown.bs.tab", function (J) {
        if ($(this).attr("href") == "#tab-dev-js") {
            G.refresh()
        } else {
            if ($(this).attr("href") == "#tab-dev-css") {
                E.refresh()
            }
        }
    });
    var H = $("#win-develop-js").find("table.tb");
    var I = new UpFile(PATH + "/rptMgr/upload.htm", "file-jslib-uploader", {}, function () {
    }, function (J, L) {
        var K = H.find("tr:eq(1)").clone().show();
        H.append(K);
        K.find("td:eq(0)").html(J.name);
        K.find("td:eq(1)").html(PATH + "/" + L._raw);
        K.find("td:eq(2)").find("a").attr("jsPath", L._raw);
        K.find("td:eq(2)").find("a").click(function () {
            var M = $(this);
            var N = M.attr("jsPath");
            layer.confirm("您确定要删除该文件吗?", {icon: 3, shift: -1, title: "提示"}, function (O) {
                layer.close(O);
                $.ajax({
                    type: "POST",
                    url: PATH + "/rptMgr/delete_file.htm",
                    data: {filePath: N},
                    dataType: "json",
                    success: function (P) {
                        M.parent().parent().remove()
                    },
                    error: function (P) {
                        layer.alert("文件删除失败")
                    }
                })
            })
        })
    });
    I.init();
    var B = function () {
        H.find("tr:gt(1)").remove();
        var P = $(".tab-report-arg").attr("aria-expanded");
        var R = null;
        if (P == "true") {
            R = report.argDeveloper != undefined ? report.argDeveloper : {}
        } else {
            R = report.developer != undefined ? report.developer : {}
        }
        var S = R.jsCode != undefined ? R.jsCode : "";
        G.setValue(S);
        var O = R.cssCode != undefined ? R.cssCode : "";
        E.setValue(O);
        var J = R.files != undefined ? R.files : new Array();
        for (var M = 0; M < J.length; M++) {
            var K = J[M];
            var N = K.jslib != undefined ? K.jslib : "";
            var Q = K.jsPath != undefined ? K.jsPath : "";
            var L = H.find("tr:eq(1)").clone().show();
            H.append(L);
            L.find("td:eq(0)").html(N);
            L.find("td:eq(1)").html(PATH + "/" + Q);
            L.find("td:eq(2)").find("a").attr("jsPath", Q);
            L.find("td:eq(2)").find("a").click(function () {
                var T = $(this);
                var U = T.attr("jsPath");
                layer.confirm("您确定要删除该文件吗?", {icon: 3, shift: -1, title: "提示"}, function (V) {
                    layer.close(V);
                    $.ajax({
                        type: "POST",
                        url: PATH + "/rptMgr/delete_file.htm",
                        data: {filePath: U},
                        dataType: "json",
                        success: function (W) {
                            T.parent().parent().remove()
                        },
                        error: function (W) {
                            layer.alert("文件删除失败")
                        }
                    })
                })
            })
        }
    };
    var A = function () {
        var K = $(".tab-report-arg").attr("aria-expanded");
        var N = G.getValue();
        if (N == "") {
            if (K == "true") {
                report.argDeveloper = undefined
            } else {
                report.developer = undefined
            }
            return
        }
        var L = {};
        L.jsCode = N;
        var J = E.getValue();
        if (J != "") {
            L.cssCode = J
        }
        var M = new Array();
        H.find("tr:gt(1)").each(function () {
            var O = {};
            O.jslib = $(this).find("td:eq(0)").html();
            O.jsPath = $(this).find("td:eq(2)").find("a").attr("jsPath");
            M.push(O)
        });
        if (M.length > 0) {
            L.files = M
        }
        if (K == "true") {
            report.argDeveloper = L
        } else {
            report.developer = L
        }
    };
    var F = $(window).height();
    var C = $(window).width();
    $("li.tl-develop-js").click(function () {
        $("#win-develop-js").find(".CodeMirror").width(C - 140).height(F - 180);
        layer.open({
            type: 1,
            title: "js程序",
            zIndex: 1025,
            shadeClose: true,
            area: [(C - 100) + "px", (F - 50) + "px"],
            content: $("#win-develop-js"),
            btn: ["确定", "取消"],
            yes: function (J) {
                A();
                layer.close(J)
            },
            success: function () {
                B();
                G.refresh();
                E.refresh()
            }
        })
    })
});
$(function () {
    $("li.tl-arg-save").click(function () {
        layer.open({
            type: 1,
            title: "参数模板",
            zIndex: 1025,
            shadeClose: true,
            area: ["520px", "200px"],
            content: $("#win-template-arg-save"),
            btn: ["确定", "取消"],
            yes: function (C) {
                var B = $("#win-template-arg-save").find("input").val();
                if (B == "") {
                    layer.alert("请输入名称!");
                    return false
                }
                var A = new RptXml();
                $.ajax({
                    type: "POST",
                    url: PATH + "/rptMgr/add_config_ext.htm",
                    data: {name: B, content: A.stringifyArg()},
                    dataType: "text",
                    success: function (D) {
                        layer.msg("参数模板保存成功")
                    },
                    error: function () {
                        layer.alert("新增参数模板失败!")
                    }
                });
                layer.close(C)
            }
        })
    });
    $("li.tl-arg-mgr").click(function () {
        $.ajax({
            type: "POST", url: PATH + "/rptMgr/query_config_ext.htm", dataType: "json", success: function (A) {
                layer.open({
                    type: 1,
                    title: "参数模板",
                    zIndex: 1025,
                    shadeClose: true,
                    area: ["520px", "400px"],
                    content: $("#win-template-arg-mgr"),
                    success: function () {
                        var B = $("#win-template-arg-mgr").find("table");
                        B.find("tr:gt(1)").remove();
                        for (var C = 0; C < A.length; C++) {
                            var E = A[C];
                            var D = B.find("tr:eq(1)").clone().show();
                            B.append(D);
                            D.find("td:eq(0)").html(E.name);
                            D.find("td:eq(1)").html(E.createTime);
                            D.find("td:eq(2)").find("a").attr("did", E.id);
                            D.find("td:eq(2)").find("a").click(function () {
                                var G = $(this);
                                var F = G.attr("did");
                                $.ajax({
                                    type: "POST",
                                    url: PATH + "/rptMgr/del_config_ext.htm",
                                    data: {id: F},
                                    dataType: "text",
                                    success: function (H) {
                                        G.parent().parent().remove()
                                    },
                                    error: function () {
                                        layer.alert("参数模板删除失败!")
                                    }
                                })
                            })
                        }
                    }
                })
            }, error: function () {
                layer.alert("查询参数模板失败!")
            }
        })
    });
    $("li.tl-arg-use").click(function () {
        $.ajax({
            type: "POST", url: PATH + "/rptMgr/query_config_ext.htm", dataType: "json", success: function (A) {
                layer.open({
                    type: 1,
                    title: "参数模板",
                    zIndex: 1025,
                    shadeClose: true,
                    area: ["520px", "200px"],
                    content: $("#win-template-arg-use"),
                    btn: ["确定", "取消"],
                    yes: function (B) {
                        var C = $("#win-template-arg-use").find("table").find("select");
                        var D = C.val();
                        if (D != "") {
                            $.ajax({
                                type: "POST",
                                url: PATH + "/rptMgr/query_config_ext_byid.htm",
                                data: {id: D},
                                dataType: "text",
                                success: function (F) {
                                    if (F == "") {
                                        return false
                                    }
                                    var E = new RptXml();
                                    E.parseTemplateArg(F)
                                },
                                error: function () {
                                    layer.alert("参数模板查询失败!")
                                }
                            })
                        }
                        layer.close(B)
                    },
                    success: function () {
                        var C = $("#win-template-arg-use").find("table").find("select");
                        C.find("option").remove();
                        for (var B = 0; B < A.length; B++) {
                            var E = A[B];
                            var D = $("<option></option>");
                            D.attr("value", E.id).html(E.name);
                            C.append(D)
                        }
                        C.selectpicker("refresh")
                    }
                })
            }, error: function () {
                layer.alert("查询参数模板失败!")
            }
        })
    })
});
var PALETTE = [["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)", "#f1f4f7", "#FAFAFA", "#EEEEEE", "#DDDDDD"], ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)", "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)", "#777777", "#555555", "#333333", "#A992E2", "#00C9E6"], ["#5BC0DE", "#337AB7", "#5F69E0", "#FF4859", "#A94442", "#D9534F", "#3C763D", "#7EC857", "#FFC017", "#F0AD4E", "#C7B69D", "#1BC9E4", "#FB9678", "#25A6F7", "#F7C65F", "#363A5C", "#55BADF", "#006699", "#669933", "#99CCCC", "#993333", "#A24B29", "#A27729", "#967A8E", "#D880E8", "#A28E92", "#EC6F5A"]];
var functions = {};
functions["SUM"] = new Array(-1, "参数", "SUM(number1,number2, ...)", "返回某一单元格区域中所有数字之和<br/>示例:SUM(3, 2)=5, SUM(ds.column)");
functions["COUNT"] = new Array(1, "参数", "COUNT(column)", "返回单元格列的个数");
functions["AVG"] = new Array(-1, "参数", "AVG(number1,number2, ...)", "返回某一单元格区域中所有数字之和的平均值<br/>示例:AVG(3, 2)=2.5, AVG(ds.column)");
functions["CHAR"] = new Array(1, "数值", "CHAR(number)", "数值用于转换的字符代码，介于 1 到 255 之间<br/><br/>示例: CHAR(65)=A");
functions["DATE"] = new Array(3, new Array("年", "月", "日"), "DATE(year, month, day)", "返回指定年月日的日期类型<br/><br/>示例:DATE(2013, 10 1)=Tue Oct 01 00:00:00 CST 2013(日期类型)");
functions["MAX"] = new Array(-1, "参数", "MAX(number1,number2, ...)", "返回某一单元格区域中所有数字的最大值<br/><br/>示例:MAX(3, 2)=3,MAX(ds.column)");
functions["MIN"] = new Array(-1, "参数", "MIN(number1,number2, ...)", "返回某一单元格区域中所有数字的最小值<br/><br/>示例:MIN(3, 2)=2,MIN(ds.column)");
functions["SEQ"] = new Array(0, "", "SEQ()", "计算扩展单元格行数(序列号)");
functions["SELECT"] = new Array(2, "", 'SELECT(ds.column, "条件表达式")', "数据集过滤<br/>示例:SELECT(ds.T_VAL, \"NAME == '上海'\") = 29.8");
functions["SQL"] = new Array(2, "", 'SQL("sourceName","sql", columnName, num)', '使用sql查询，获取数据列数据<br/>示例:sql("demo","select * from rpt_value where name=\'上海\'",t_val, 0)=29.82');
functions["MOM"] = new Array(-1, "参数", "MOM(numberCell,groupCell, ...)", "计算数据环比<br/><br/>示例:MOM(C1, A1, B1..) C1为计算环比数据单元,A1,B1..为分组单元");
functions["YOY"] = new Array(-1, "参数", "YOY(numberCell,groupCell, ...)", "计算数据同比<br/><br/>示例:YOY(C1, A1, B1..) C1为计算同比数据单元,A1,B1..为分组单元");
functions["QOQ"] = new Array(-1, "参数", "QOQ(numberCell,groupCell, ...)", "计算季度环比<br/><br/>示例:MOM(C1, A1, B1..) C1为计算环比数据单元,A1,B1..为分组单元");
functions["HOH"] = new Array(-1, "参数", "HOH(numberCell,groupCell, ...)", "计算半年环比<br/><br/>示例:YOY(C1, A1, B1..) C1为计算同比数据单元,A1,B1..为分组单元");
functions["SUMM"] = new Array(-1, "参数", "SUMM(numberCell,groupCell, ...)", "数值累加<br/><br/>示例:SUMM(C1) 或 SUMM(C1, A1, B1..) 取C1单元数据的累加值,A1,B1..为分组单元");
functions["RANK"] = new Array(-1, "参数", "RANK(numberCell,groupCell, ...)", "排名<br/><br/>示例:RANK(C1) 或 RANK(C1, A1, B1..) 取C1单元数值,A1,B1..为分组单元");
functions["AND"] = new Array(-1, "参数", "AND(logical1, [logical2], ...)", "所有参数的计算结果为 TRUE 时，返回 TRUE；<br/>只要有一个参数的计算结果为 FALSE，即返回 FALSE<br/><br/>示例:AND(TRUE, TRUE) = true,  AND(TRUE, FALSE)=false, AND(ds.column > 0)=true");
functions["IF"] = new Array(3, "参数", "IF(logical_test,value_if_true,value_if_false)", "根据对指定的条件计算结果为 TRUE 或 FALSE，返回不同的结果。<br/>示例: IF(100>9, 100, 0)=100, IF(ds.P_NUM != null,ds.P_NUM,0), IF(ds.P_NUM >= 10,ds.P_NUM,0)");
functions["OR"] = new Array(-1, "参数", "OR(logical1,logical2,...)", "在其参数组中，任何一个参数逻辑值为 TRUE，即返回 TRUE；<br/>任何一个参数的逻辑值为 FALSE，即返回 FALSE<br/><br/>示例:OR(TRUE) =TRUE,  OR(ds.column1>10,ds.column2==10)=FALSE");
functions["NOT"] = new Array(1, "参数", "NOT(logical)", "对参数值求反。当要确保一个值不等于某一特定值时，可以使用 NOT 函数<br/><br/>示例:NOT(FALSE)=TRUE, NOT(ds.column>10)=FALSE");
functions["TRUE"] = new Array(0, "TRUE()", "返回逻辑值 TRUE");
functions["FALSE"] = new Array(0, "FALSE()", "返回逻辑值 FALSE");
functions["CODE"] = new Array(1, "文本", "CODE(text)", "文本字符串中第一个字符的数字代码<br/><br/>示例:CODE(A)=65");
functions["CONCATENATE"] = new Array(-1, "文本", "CONCATENATE (text1,text2,...)", '两个或多个文本字符串合并为一个文本字符串<br/><br/>示例:CONCATENATE(a,b,c)=abc, CONCATENATE(ds.column,"abc")');
functions["ENDWITH"] = new Array(2, "文本", "ENDWITH(text1, text2)", '判断该字符串是否以另一个字符串结束<br/><br/>示例:ENDWITH("test","st")=true,  ENDWITH("test","ab")=false');
functions["STARTWITH"] = new Array(2, "文本", "STARTWITH(text1, text2)", "返回逻辑值 TRUE");
functions["EXACT"] = new Array(2, "文本", "EXACT(text1,text2)", '返回逻辑值 TRUE, 示例:EXACT("word","word") = true, EXACT("Word","word") = false');
functions["FIND"] = new Array(3, "文本", "FIND(find_text,within_text,start_num)", "返回逻辑值 TRUE");
functions["LEFT"] = new Array(2, "文本", "LEFT(text,num_chars)", '文本字符串中第一个字符或前几个字符<br/><br/>示例:LEFT("text",2)=te,  LEFT("text",5)=text');
functions["LEN"] = new Array(1, "文本", "LEN(text)", '文本字符串中的字符数<br/><br/>示例:LEN("text")=4');
functions["LOWER"] = new Array(1, "文本", "LOWER(text)", '文本字符串中的所有大写字母转换为小写字母<br/><br/>示例:LOWER("TEXT")=text');
functions["MID"] = new Array(3, "文本", "MID(text,start_num,num_chars)", 'MID 返回文本字符串中从指定位置开始的特定数目的字符，该数目由用户指定。<br/><br/>示例:MID(text,2,2)="ex",  MID(text,5,2)=""');
functions["PROPER"] = new Array(1, "文本", "PROPER(text)", '将文本字符串的首字母及任何非字母字符之后的首字母转换成大写。<br/>将其余的字母转换成小写<br/><br/>示例:PROPER("text")=Text,  PROPER("59text")=59Text');
functions["REPLACE"] = new Array(4, "文本", "REPLACE(old_text,start_num,num_chars,new_text)", '使用其他文本字符串并根据所指定的字符数替换某文本字符串中的部分文本<br/><br/>示例:REPLACE("abcdefghijk",6,5,"*")= abcde*k');
functions["RIGHT"] = new Array(2, "文本", "RIGHT(text,num_chars)", '根据所指定的字符数返回文本字符串中最后一个或多个字符<br/><br/>示例:RIGHT("text", 2)=xt');
functions["SUBSTITUTE"] = new Array(4, "文本", "SUBSTITUTE(text,old_text,new_text,instance_num)", '在文本字符串中用 new_text 替代 old_text<br/><br/>示例:SUBSTITUTE("销售数据", "销售", "成本")=成本数据<br/>SUBSTITUTE("2011 年第一季度", "1", "2", 3)= 2012 年第一季度');
functions["TEXT"] = new Array(2, "文本", "TEXT(value,format_text)", 'TEXT 函数可将数值转换为文本，并可使用户通过使用特殊格式字符串来指定显示格式<br/><br/>示例:TEXT(23.5,"$0.00")=$23.50, TEXT(NOW(), "yyyyMM")');
functions["TRIM"] = new Array(1, "文本", "TRIM(text)", '去除字符首尾的空格<br/><br/>示例:TRIM(" test ")=text,  TRIM("a bc")=a bc');
functions["UPPER"] = new Array(1, "文本", "UPPER(text)", '将文本转换成大写形式<br/><br/>示例:UPPER("text")=TEXT');
functions["SUBSTRING"] = new Array(3, "文本", "SUBSTRING(text, start, end)", '截取字符串文本<br/><br/>示例:SUBSTRING("text", 0, 1)=t');
functions["SUBSTR"] = new Array(3, "文本", "SUBSTR(text, start, len)", '截取固定长度字符串文本<br/><br/>示例:SUBSTR("text", 1, 1)=e');
functions["WEEKSTART"] = new Array(1, "日期", "WEEKSTART(dateTime)", "返回当前日期的上周开始时间,参数可以为空<br/><br/>示例:WEEKSTART()=2017-08-21 00:00:00(日期类型)<br/>WEEKSTART(NOW())=2017-08-21 00:00:00(日期类型)");
functions["WEEKEND"] = new Array(1, "日期", "WEEKEND(dateTime)", "返回当前日期的上周结束时间,参数可以为空<br/><br/>示例:WEEKEND()=2017-08-27 23:59:59(日期类型)<br/>WEEKEND(NOW())=2017-08-27 23:59:59(日期类型)");
functions["MONTHSTART"] = new Array(1, "日期", "MONTHSTART(dateTime)", "返回当前日期的上月开始时间,参数可以为空<br/><br/>示例:MONTHSTART()=2017-07-01 00:00:00(日期类型)<br/>MONTHSTART(NOW())=2017-07-01 00:00:00(日期类型)");
functions["MONTHEND"] = new Array(1, "日期", "MONTHEND(dateTime)", "返回当前日期的上月结束时间,参数可以为空<br/><br/>示例:MONTHEND()=2017-07-31 23:59:59(日期类型)<br/>MONTHEND(NOW())=2017-07-31 23:59:59(日期类型)");
functions["QUARTERSTART"] = new Array(1, "日期", "QUARTERSTART(dateTime)", "返回当前日期的前一个季度开始时间,参数可以为空<br/><br/>示例:QUARTERSTART()=2017-04-01 00:00:00(日期类型)<br/>QUARTERSTART(NOW())=2017-04-01 00:00:00(日期类型)");
functions["QUARTEREND"] = new Array(1, "日期", "QUARTEREND(dateTime)", "返回当前日期的前一个季度结束时间,参数可以为空<br/><br/>示例:QUARTEREND()=2017-06-30 23:59:59(日期类型)<br/>QUARTEREND(NOW())=2017-06-30 23:59:59(日期类型)");
functions["HALFYEARSTART"] = new Array(1, "日期", "HALFYEARSTART(dateTime)", "返回当前日期的前一个半年开始时间,参数可以为空<br/><br/>示例:HALFYEARSTART()=2017-01-01 00:00:00(日期类型)<br/>HALFYEARSTART(NOW())=2017-01-01 00:00:00(日期类型)");
functions["HALFYEAREND"] = new Array(1, "日期", "HALFYEAREND(dateTime)", "返回当前日期的前一个半年结束时间,参数可以为空<br/><br/>示例:HALFYEAREND()=2017-06-30 23:59:59(日期类型)<br/>HALFYEAREND(NOW())=2017-06-30 23:59:59(日期类型)");
functions["YEARSTART"] = new Array(1, "日期", "YEARSTART(dateTime)", "返回当前日期的前一年开始时间,参数可以为空<br/><br/>示例:YEARSTART()=2016-01-01 00:00:00(日期类型)<br/>YEARSTART(NOW())=2016-01-01 00:00:00(日期类型)");
functions["YEAREND"] = new Array(1, "日期", "YEAREND(dateTime)", "返回当前日期的前一年结束时间,参数可以为空<br/><br/>示例:YEAREND()=2016-12-31 23:59:59(日期类型)<br/>YEAREND(NOW())=2016-12-31 23:59:59(日期类型)");
functions["YEARADD"] = new Array(2, "日期", "YEARADD(dateTime, num)", '返回datetime日期加上num年<br/>示例:YEARADD(NOW(), 1)=2019-08-21 00:00:00(日期类型),<br/> YEARADD(TODATE("2017-09-01","yyyy-MM-dd"), 1)=2018-09-01');
functions["YEARSUB"] = new Array(2, "日期", "YEARADD(dateTime, num)", '返回datetime日期减去num年<br/>示例:YEARSUB(NOW(), 1)=2017-08-21 00:00:00(日期类型),<br/> YEARSUB(TODATE("2017-09-01","yyyy-MM-dd"), 1)=2016-09-01');
functions["MONTHADD"] = new Array(2, "日期", "MONTHADD(dateTime, num)", '返回datetime日期加上num月<br/>示例:MONTHADD(NOW(), 1)=2018-09-21 00:00:00(日期类型),<br/> MONTHADD(TODATE("2017-09-01","yyyy-MM-dd"), 1)=2017-10-01');
functions["MONTHSUB"] = new Array(2, "日期", "MONTHSUB(dateTime, num)", '返回datetime日期减去num月<br/>示例:MONTHSUB(NOW(), 1)=2017-07-21 00:00:00(日期类型),<br/> MONTHSUB(TODATE("2017-09-01","yyyy-MM-dd"), 1)=2017-08-01');
functions["DAYADD"] = new Array(2, "日期", "DAYADD(dateTime, num)", '返回datetime日期加上num天<br/>示例:DAYADD(NOW(), 1)=2018-08-22 00:00:00(日期类型),<br/> DAYADD(TODATE("2017-09-01","yyyy-MM-dd"), 1)=2017-09-02');
functions["DAYSUB"] = new Array(2, "日期", "DAYSUB(dateTime, num)", '返回datetime日期减去num天<br/>示例:DAYSUB(NOW(), 1)=2017-08-20 00:00:00(日期类型),<br/> DAYSUB(TODATE("2017-09-01","yyyy-MM-dd"), 1)=2017-08-31');
functions["HOURADD"] = new Array(2, "日期", "HOURADD(dateTime, num)", '返回datetime日期加上num小时<br/>示例:HOURADD(NOW(), 1)=2018-08-22 04:00:00(日期类型),<br/> HOURADD(TODATE("2017-09-01 03","yyyy-MM-dd HH"), 1)=2017-09-01 04');
functions["HOURSUB"] = new Array(2, "日期", "HOURSUB(dateTime, num)", '返回datetime日期减去num小时<br/>示例:HOURSUB(NOW(), 1)=2017-08-20 02:00:00(日期类型),<br/> HOURSUB(TODATE("2017-09-01 03","yyyy-MM-dd HH"), 1)=2017-09-01 02');
functions["MINUTEADD"] = new Array(2, "日期", "MINUTEADD(dateTime, num)", '返回datetime日期加上num分钟<br/>示例:MINUTEADD(NOW(), 1)=2018-08-22 04:04:00(日期类型),<br/> MINUTEADD(TODATE("2017-09-01 03:03","yyyy-MM-dd HH:mm"), 1)=2017-09-01 03:04');
functions["MINUTESUB"] = new Array(2, "日期", "MINUTESUB(dateTime, num)", '返回datetime日期减去num分钟<br/>示例:MINUTESUB(NOW(), 1)=2017-08-20 02:02:00(日期类型),<br/> MINUTESUB(TODATE("2017-09-01 03:03","yyyy-MM-dd HH:mm"), 1)=2017-09-01 03:02');
functions["SECONDADD"] = new Array(2, "日期", "SECONDADD(dateTime, num)", '返回datetime日期加上num秒<br/>示例:SECONDADD(NOW(), 1)=2018-08-22 04:04:04(日期类型),<br/> SECONDADD(TODATE("2017-09-01 03:03:03","yyyy-MM-dd HH:mm:ss"), 1)=2017-09-01 03:03:04');
functions["SECONDSUB"] = new Array(2, "日期", "SECONDSUB(dateTime, num)", '返回datetime日期减去num秒<br/>示例:SECONDSUB(NOW(), 1)=2017-08-20 02:02:02(日期类型),<br/> SECONDSUB(TODATE("2017-09-01 03:03:03","yyyy-MM-dd HH:mm:ss"), 1)=2017-09-01 03:03:02');
functions["TODATE"] = new Array(2, new Array("日期字符串", "日期格式"), "TODATE(dateString, pattern)", '返回字符串的日期类型<br/><br/>示例:TODATE("20131001", "yyyyMMdd")=Tue Oct 01 00:00:00 CST 2013(日期类型)');
functions["DAY"] = new Array(1, "日期", "DAY(dateTime)", "返回某日期的天数，用整数 1 到 31 表示<br/><br/>示例:DAY(NOW())=12");
functions["HOUR"] = new Array(1, "日期", "HOUR(dateTime)", "返回时间值的小时数。即一个介于 0 (12:00 A.M.) 到 23 (11:00 P.M.) 之间的整数<br/><br/>示例:HOUR(NOW())=12");
functions["MINUTE"] = new Array(1, "日期", "MINUTE(dateTime)", "返回时间值中的分钟，为一个介于 0 到 59 之间的整数<br/><br/>示例:MINUTE(NOW())=12");
functions["MONTH"] = new Array(1, "日期", "MONTH(dateTime)", "返回日期中的月份。月份是介于 1（一月）到 12（十二月）之间的整数<br/><br/>示例:MONTH(NOW())=8");
functions["NOW"] = new Array(0, "", "NOW()", "返回当前日期时间");
functions["SECOND"] = new Array(1, "日期", "SECOND(dateTime)", "返回时间值的秒数。返回的秒数为 0 到 59 之间的整数<br/><br/>示例:SECOND(NOW())=8");
functions["TIME"] = new Array(3, new Array("小时", "分", "秒"), "TIME(hour,minute,second)", "返回当天的时间<br/><br/>示例:TIME(12,12,12)=Sat Aug 08 12:12:12 CST 2015(日期类型)");
functions["TODAY"] = new Array(0, "", "TODAY()", "返回当前日期<br/><br/>示例:TODAY()=Sat Aug 08 00:00:00 CST 2015(日期类型)");
functions["WEEKDAY"] = new Array(1, "日期", "WEEKDAY(dateTime)", "返回某日期为星期几。默认情况下，其值为 1（星期天）到 7（星期六）之间的整数<br/><br/>示例:WEEKDAY(TODAY())=2");
functions["WEEKNUM"] = new Array(1, "日期", "WEEKNUM(dateTime)", "返回一个数字，该数字代表一年中的第几周<br/><br/>示例:WEEKNUM(TODAY())=2");
functions["YEAR"] = new Array(1, "日期", "YEAR(dateTime)", "返回某日期对应的年份<br/><br/>示例:YEAR(TODAY())=2015");
functions["ABS"] = new Array(1, "数值", "ABS(number)", "返回数字的绝对值, 绝对值没有符号<br/><br/>示例: ABS(-2)=2, ABS(2)=2");
functions["ACOS"] = new Array(1, "数值", "ACOS(number)", "返回数字的反余弦值。反余弦值是角度，它的余弦值为数字。<br/>返回的角度值以弧度表示，范围是 0 到 pi<br/><br/>示例:ACOS(-0.5)= 2.094395<br/>       ACOS(-0.5)*180/PI()=120");
functions["ACOSH"] = new Array(1, "数值", "ACOSH(number)", "返回 number 参数的反双曲余弦值。参数必须大于或等于 1<br/><br/>示例:ACOSH(1)=0,  ACOSH(10)= 2.993223");
functions["ASIN"] = new Array(1, "数值", "ASIN(number)", "返回参数的反正弦值。反正弦值为一个角度，该角度的正弦值即等于此函数的 number 参数。<br/>返回的角度值将以弧度表示，范围为 -pi/2 到 pi/2<br/><br/>示例:ASIN(-0.5)= -0.5236,  ASIN(-0.5)*180/PI()=-30");
functions["ASINH"] = new Array(1, "数值", "ASINH(number)", "返回参数的反双曲正弦值。反双曲正弦值的双曲正弦即等于此函数的 number 参数值<br/><br/>示例:");
functions["ATAN"] = new Array(1, "数值", "ATAN (number)", "返回反正切值。反正切值为角度，其正切值即等于 number 参数值。<br/>返回的角度值将以弧度表示，范围为 -pi/2 到 pi/2<br/><br/>示例:ATAN(1)= 0.785398,   ATAN(1)*180/PI()=45");
functions["ATAN2"] = new Array(2, "数值", "ATAN2(x_num,y_num)", "返回给定的 X 及 Y 坐标值的反正切值。反正切的角度值等于 X 轴<br/>与通过原点和给定坐标点 (x_num, y_num) 的直线之间的夹角。<br/>结果以弧度表示并介于 -pi 到 pi 之间（不包括 -pi）。<br/><br/>示例:ATAN2(1, 1)= 0.785398,   ATAN2(-1, -1)= -2.35619");
functions["ATANH"] = new Array(1, "数值", "ATANH(number)", "返回参数的反双曲正切值，参数必须介于 -1 到 1 之间（除去 -1 和 1）<br/><br/>示例:ATANH(0.76159416)=1,  ATANH(-0.1)= -0.10034");
functions["CEILING"] = new Array(1, "数值", "CEILING(number)", "将参数 Number 向上舍入（沿值增大的方向）为最接近数<br/><br/>示例:CEILING(2.5)=3,  CEILING(-2.5)=-2");
functions["COS"] = new Array(1, "数值", "COS(number)", "返回给定角度的余弦值<br/><br/>示例:COS(1.047)= 0.500171,  COS(60*PI()/180)=0.5");
functions["COSH"] = new Array(1, "数值", "COSH(number)", "返回数字的双曲余弦值<br/><br/>示例:COSH(4) = 27.30823");
functions["DEGREES"] = new Array(1, "数值", "DEGREES(angle)", "将弧度转换为度<br/><br/>示例:DEGREES(PI())=180");
functions["EVEN"] = new Array(1, "数值", "EVEN(number)", "返回沿绝对值增大方向取整后最接近的偶数<br/><br/>示例:EVEN(1.5)=2,  EVEN(3)=4,  EVEN(2)=2,  EVEN(-1)=-2");
functions["EXP"] = new Array(1, "EXP(number)", "返回 e 的 n 次幂。常数 e等于 2.71828182845904，是自然对数的底数<br/><br/>示例:EXP(1) = 2.718282,  EXP(2)= 7.389056");
functions["FACT"] = new Array(1, "数值", "FACT(number)", "返回某数的阶乘，一个数的阶乘等于 1*2*3*...* 该数<br/><br/>示例:FACT(5)=120 (1*2*3*4*5=120)");
functions["FLOOR"] = new Array(1, "数值", "FLOOR(number)", "将 number 向下舍入（向零的方向）到最接近的数<br/><br/>示例:FLOOR(2.5)=2,  FLOOR(-2.5)=-2");
functions["INT"] = new Array(1, "数值", "INT(number)", "将数字向下舍入到最接近的整数<br/><br/>示例:INT(8.9)=8,  INT(-8.9)=-9");
functions["LN"] = new Array(1, "数值", "LN(number)", "返回一个数的自然对数。自然对数以常数项 e (2.71828182845904) 为底<br/><br/>示例:LN(86)=4.454347,  LN(2.7182818)=1");
functions["LOG"] = new Array(2, "数值", "LOG(number,base)", "按所指定的底数，返回一个数的对数<br/><br/>示例:LOG(10)=2.30, LOG(8,2)=3");
functions["LOG10"] = new Array(1, "数值", "LOG10(number)", "返回以 10 为底的对数<br/><br/>示例:LOG10(10)=1, LOG10(86)=1.934498451");
functions["MOD"] = new Array(2, "数值", "MOD(number,divisor)", "返回两数相除的余数，结果的正负号与除数相同<br/><br/>示例:MOD(3,2)=1");
functions["ODD"] = new Array(1, "数值", "ODD(number)", "返回对指定数值进行向上舍入后的奇数<br/><br/>示例:ODD(1.5)=3");
functions["PI"] = new Array(0, "", "PI()", "返回数字 3.14159265358979，即数学常量 pi，精确到小数点后 14 位<br/><br/>示例:PI()=3.14159265358979");
functions["POWER"] = new Array(2, new Array("底数", "密值"), "POWER(number,power)", "返回给定数字的乘幂<br/><br/>示例:POWER(5,2)=25, POWER(98.6,3.2)=2401077, POWER(4,5/4)=5.656854");
functions["PRODUCT"] = new Array(-1, "数值", "PRODUCT(number1, number2, ...)", "计算用作参数的所有数字的乘积，然后返回乘积<br/><br/>示例:PRODUCT(3,10)=30, PRODUCT(3,10,10)=300");
functions["RADIANS"] = new Array(1, "数值", "RADIANS(angle)", "RADIANS 函数将角度转换为弧度<br/><br/>示例:RADIANS(270)=4.712389");
functions["RAND"] = new Array(0, "", "RAND()", "RAND 函数返回大于或等于0且小于1的平均分布随机数<br/><br/>示例:=RAND()");
functions["ROUND"] = new Array(2, new Array("数值", "位数"), "ROUND(number,num_digits)", "ROUND 函数可将某个数字四舍五入为指定的位数<br/><br/>示例:ROUND(2.15, 1)=2.2, ROUND(2.149, 1)=2.1, ROUND(-1.475, 2)=-1.48");
functions["ROUNDDOWN"] = new Array(2, new Array("数值", "位数"), "ROUNDDOWN(number,num_digits)", "靠近零值，向下（绝对值减小的方向）舍入数字<br/><br/>示例:ROUNDDOWN(3.2, 0)=3,  ROUNDDOWN(76.9,0)=76 <br/> ROUNDDOWN(-3.14159, 1)=-3.1");
functions["ROUNDUP"] = new Array(2, new Array("数值", "位数"), "ROUNDUP(number,num_digits)", "远离零值，向上舍入数字<br/><br/>示例:ROUNDUP(3.2,0)=4, ROUNDUP(76.9,0)=77,  ROUNDUP(3.14159, 3)=3.142");
functions["SIGN"] = new Array(1, "数值", "SIGN(number)", "返回数字的符号。当数字为正数时返回 1，为零时返回 0，为负数时返回 -1<br/><br/>示例:SIGN(10)=1,  SIGN(-10)=-1,  SIGN(0)=0");
functions["SIN"] = new Array(1, "数值", "SIN(number)", "返回给定角度的正弦值<br/><br/>示例:SIN(PI())=0, SIN(PI()/2)=1,  SIN(30*PI()/180)=0.5,  SIN(RADIANS(30))=0.5");
functions["SINH"] = new Array(1, "数值", "SINH(number)", "返回某一数字的双曲正弦值<br/><br/>示例:SINH(1)=1.175201194, SINH(-1)=-1.175201194");
functions["SQRT"] = new Array(1, "数值", "SQRT(number)", "返回正平方根<br/><br/>示例:SQRT(16)=4");
functions["TAN"] = new Array(1, "数值", "TAN(number)", "返回给定角度的正切值。<br/><br/>示例:TAN(0.785)=0.9992");
functions["TANH"] = new Array(1, "数值", "TANH(number)", "返回某一数字的双曲正切<br/><br/>示例:TANH(-2)= -0.96403,  TANH(0)=0,  TANH(0.5)= 0.462117");
functions["RMB"] = new Array(1, "数值", "RMB(number)", "数字金额转换成中文大写金额<br/><br/>示例:RMB(10000.12)=壹万元壹角贰分");
var formats = {};
formats["0"] = "常规";
formats["101"] = "0";
formats["102"] = "0.0";
formats["103"] = "0.00";
formats["104"] = "0.000";
formats["105"] = "0.0000";
formats["106"] = "0.00000";
formats["107"] = "#";
formats["108"] = "#.#";
formats["109"] = "#.##";
formats["110"] = "#.###";
formats["111"] = "#.####";
formats["112"] = "#.#####";
formats["201"] = "yyyy";
formats["202"] = "yyyy-MM";
formats["203"] = "yyyy-MM-dd";
formats["204"] = "yyyy年";
formats["205"] = "yyyy年MM月";
formats["206"] = "yyyy年MM月dd日";
formats["207"] = "yyyy/MM";
formats["208"] = "yyyy/MM/dd";
formats["209"] = "MM";
formats["210"] = "MM月";
formats["211"] = "MM-dd";
formats["212"] = "MM月dd日";
formats["213"] = "MM/dd";
formats["214"] = "dd";
formats["215"] = "dd日";
formats["301"] = "yyyy-MM-dd HH:mm";
formats["302"] = "yyyy-MM-dd HH:mm:ss";
formats["303"] = "yyyy年MM月dd日 HH时mm分";
formats["304"] = "yyyy年MM月dd日 HH时mm分ss秒";
formats["401"] = "HH:mm";
formats["402"] = "HH:mm:ss";
formats["403"] = "HH时mm分";
formats["404"] = "HH时mm分ss秒";
formats["405"] = "HH";
formats["406"] = "HH时";
formats["407"] = "mm";
formats["408"] = "mm分";
formats["501"] = "￥0";
formats["502"] = "￥0.0";
formats["503"] = "￥0.00";
formats["504"] = "￥0.000";
formats["505"] = "￥0.0000";
formats["506"] = "￥0.00000";
formats["507"] = "￥#";
formats["508"] = "￥#.#";
formats["509"] = "￥#.##";
formats["510"] = "￥#.###";
formats["511"] = "￥#.####";
formats["512"] = "￥#.#####";
formats["521"] = "$0";
formats["522"] = "$0.0";
formats["523"] = "$0.00";
formats["524"] = "$0.000";
formats["525"] = "$0.0000";
formats["526"] = "$0.00000";
formats["527"] = "$#";
formats["528"] = "$#.#";
formats["529"] = "$#.##";
formats["530"] = "$#.###";
formats["531"] = "$#.####";
formats["532"] = "$#.#####";
formats["541"] = "US$0";
formats["542"] = "US$0.0";
formats["543"] = "US$0.00";
formats["544"] = "US$0.000";
formats["545"] = "US$0.0000";
formats["546"] = "US$0.00000";
formats["547"] = "US$#";
formats["548"] = "US$#.#";
formats["549"] = "US$#.##";
formats["550"] = "US$#.###";
formats["551"] = "US$#.####";
formats["552"] = "US$#.#####";
formats["601"] = "0%";
formats["602"] = "0.0%";
formats["603"] = "0.00%";
formats["604"] = "0.000%";
formats["605"] = "0.0000%";
formats["606"] = "0.00000%";
formats["607"] = "#%";
formats["608"] = "#.#%";
formats["609"] = "#.##%";
formats["610"] = "#.###%";
formats["611"] = "#.####%";
formats["612"] = "#.#####%"