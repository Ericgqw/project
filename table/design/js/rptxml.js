var RptXml = function () {
    this.findName = "rpt.xml"
};
RptXml.prototype.htmlEncode = function (A) {
    return $("<div/>").text(A).html()
};
RptXml.prototype.stringify = function (U) {
    var I = grid.getMaxMinCellNum();
    var M = I[0];
    var b = I[1];
    grid.setReportType(M, b, U);
    var V = JSXML.fromString('<?xml version="1.0" encoding="UTF-8"?><report/>');
    var Y = V.createElement("name");
    Y.textContent = U.name != undefined ? U.name : "";
    var O = V.createElement("pageSize");
    O.textContent = U.pageSize != undefined ? U.pageSize : 0;
    var S = V.createElement("exportFlag");
    S.textContent = U.exportFlag != undefined ? U.exportFlag : 79;
    var K = V.createElement("loadMode");
    K.textContent = U.loadMode != undefined ? U.loadMode : 0;
    var R = V.createElement("reportType");
    R.textContent = U.rptType != undefined ? U.rptType : 1;
    var X = V.createElement("offset");
    X.textContent = U.offset != undefined ? U.offset : 0;
    var G = V.createElement("relative");
    G.textContent = U.relative != undefined ? U.relative : 0;
    V.documentElement.appendChild(Y);
    V.documentElement.appendChild(O);
    V.documentElement.appendChild(S);
    V.documentElement.appendChild(K);
    V.documentElement.appendChild(R);
    V.documentElement.appendChild(X);
    V.documentElement.appendChild(G);
    if (U.bgColor != undefined) {
        var C = V.createElement("bgColor");
        C.textContent = U.bgColor;
        V.documentElement.appendChild(C)
    }
    if (U.bgImage != undefined) {
        var D = V.createElement("bgImage");
        D.textContent = U.bgImage;
        V.documentElement.appendChild(D)
    }
    if (U.bgPrinterOut != undefined) {
        var P = V.createElement("bgPrinterOut");
        P.textContent = U.bgPrinterOut;
        V.documentElement.appendChild(P)
    }
    if (U.developer != undefined) {
        var T = this.createDeveloperNode(U.developer, V);
        if (T.childNodes.length > 0) {
            V.documentElement.appendChild(T)
        }
    }
    if (U.style != undefined) {
        var W = U.style;
        var a = V.createElement("style");
        if (W.tgBackground != undefined) {
            var L = V.createElement("tgBackground");
            L.textContent = W.tgBackground;
            a.appendChild(L)
        }
        if (W.tgType != undefined) {
            var B = V.createElement("tgType");
            B.textContent = W.tgType;
            a.appendChild(B)
        }
        if (a.childNodes.length > 0) {
            V.documentElement.appendChild(a)
        }
    }
    if (U.printerAttr != undefined) {
        var N = this.createPrinterAttrNode(U.printerAttr, V);
        if (N.childNodes.length > 0) {
            V.documentElement.appendChild(N)
        }
    }
    if (U.ds) {
        var A = this.createDataSetNode(U.ds, V);
        if (A.childNodes.length > 0) {
            V.documentElement.appendChild(A)
        }
    }
    if (U.reportView) {
        var J = this.createReportViewXmlNode(U.reportView, V);
        if (J.childNodes.length > 0) {
            V.documentElement.appendChild(J)
        }
    }
    if (U.extendUnits && U.extendUnits.length > 0) {
        this.createExtendUnitsNode(U.extendUnits, V)
    }
    if (U.asyncData) {
        U.asyncData.usable = 1;
        var Z = this.createAsyncData(U.asyncData, V);
        V.documentElement.appendChild(Z)
    }
    if (U.chartTheme) {
        var H = this.createChartThemeNode(U.chartTheme, V);
        if (H.childNodes.length > 0) {
            V.documentElement.appendChild(H)
        }
    }
    var E = V.createElement("canvas");
    E.appendChild(this.createColumns(M, b, grid, V));
    E.appendChild(this.createRows(M, b, grid, V));
    V.documentElement.appendChild(E);
    var F = this.createArgs(V);
    if (F != null) {
        V.documentElement.appendChild(F)
    }
    var Q = this.createCellsNode(M, b, grid, V);
    if (Q.childNodes.length > 0) {
        V.documentElement.appendChild(Q)
    }
    this.createDivXMlNode(V);
    this.createPanelXMLNode(V);
    return JSXML.stringify(V)
};
RptXml.prototype.stringifyDataSet = function (A) {
    var C = JSXML.fromString('<?xml version="1.0" encoding="UTF-8"?><datasets/>');
    var B = this.createDataset(A, C);
    C.documentElement.appendChild(B);
    return JSXML.stringify(C)
};
RptXml.prototype.stringifyArg = function () {
    var B = JSXML.fromString('<?xml version="1.0" encoding="UTF-8"?><report/>');
    var A = this.createArgs(B);
    if (A != null) {
        B.documentElement.appendChild(A)
    }
    return JSXML.stringify(B)
};
RptXml.prototype.createDataSetNode = function (C, E) {
    var B = E.createElement("datasets");
    for (var D in C) {
        var A = C[D];
        if (A != undefined) {
            B.appendChild(this.createDataset(A, E))
        }
    }
    return B
};
RptXml.prototype.createDataset = function (e, D) {
    var o = D.createElement("dataset");
    var q = D.createElement("name");
    q.textContent = e.name;
    o.appendChild(q);
    if (e.sourceName != undefined) {
        var b = D.createElement("source");
        b.textContent = e.sourceName;
        o.appendChild(b)
    }
    if (e.sql != undefined) {
        var a = D.createElement("sql");
        a.textContent = e.sql;
        o.appendChild(a)
    }
    var h = D.createElement("pageSize");
    h.textContent = e.pageSize != undefined ? e.pageSize : 0;
    o.appendChild(h);
    var A = D.createElement("type");
    A.textContent = e.type != undefined ? e.type : 0;
    o.appendChild(A);
    if (e.startRow != undefined) {
        var l = D.createElement("startRow");
        l.textContent = e.startRow;
        o.appendChild(l)
    }
    if (e.files != undefined) {
        var Z = e.files;
        var E = D.createElement("files");
        for (var p = 0; p < Z.length; p++) {
            var c = Z[p];
            var m = D.createElement("file");
            if (c.name != undefined) {
                var q = D.createElement("name");
                q.textContent = c.name;
                m.appendChild(q)
            }
            if (c.filePath != undefined) {
                var g = D.createElement("filePath");
                g.textContent = c.filePath;
                m.appendChild(g)
            }
            if (c.fileTime != undefined) {
                var I = D.createElement("fileTime");
                I.textContent = c.fileTime;
                m.appendChild(I)
            }
            E.appendChild(m)
        }
        o.appendChild(E)
    }
    if (e.parser != undefined) {
        var J = D.createElement("parser");
        J.textContent = e.parser;
        o.appendChild(J)
    }
    var N = e.columns;
    if (N && N.length > 0) {
        var Y = D.createElement("columns");
        for (var p = 0; p < N.length; p++) {
            var K = D.createElement("column");
            if (e.type == 6) {
                K.textContent = N[p].name;
                K.setAttribute("type", N[p].type);
                if (N[p].dateFormat != undefined) {
                    K.setAttribute("dateFormat", N[p].dateFormat)
                }
            } else {
                K.textContent = N[p]
            }
            Y.appendChild(K)
        }
        if (Y.childNodes.length > 0) {
            o.appendChild(Y)
        }
    }
    if (e.url != undefined) {
        var B = D.createElement("url");
        B.textContent = e.url;
        o.appendChild(B)
    }
    if (e.reqMethod != undefined) {
        var T = D.createElement("reqMethod");
        T.textContent = e.reqMethod;
        o.appendChild(T)
    }
    if (e.returnMethod != undefined) {
        var F = D.createElement("returnMethod");
        F.textContent = e.returnMethod;
        o.appendChild(F)
    }
    if (e.readTimeout != undefined) {
        var V = D.createElement("readTimeout");
        V.textContent = e.readTimeout;
        o.appendChild(V)
    }
    if (e.connectTimeout != undefined) {
        var f = D.createElement("connectTimeout");
        f.textContent = e.connectTimeout;
        o.appendChild(f)
    }
    if (e.className != undefined) {
        var L = D.createElement("className");
        L.textContent = e.className;
        o.appendChild(L)
    }
    var G = e.datas;
    if (G != undefined) {
        var d = D.createElement("datas");
        for (var p = 0; p < G.length; p++) {
            var W = D.createElement("row");
            for (var n = 0; n < G[p].length; n++) {
                var U = D.createElement("col");
                U.textContent = G[p][n];
                W.appendChild(U)
            }
            d.appendChild(W)
        }
        o.appendChild(d)
    }
    var k = e.args;
    if (k != undefined && k.length > 0) {
        var C = D.createElement("args");
        for (var p = 0; p < k.length; p++) {
            var X = k[p];
            var R = D.createElement("arg");
            if (X.name != undefined) {
                var Q = D.createElement("name");
                Q.textContent = X.name;
                R.appendChild(Q)
            }
            if (X.dataType != undefined) {
                var H = D.createElement("dataType");
                H.textContent = X.dataType;
                R.appendChild(H)
            }
            if (X.dateFormat != undefined) {
                var O = D.createElement("dateFormat");
                O.textContent = X.dateFormat;
                R.appendChild(O)
            }
            if (X.value != undefined) {
                var P = D.createElement("value");
                P.textContent = X.value;
                R.appendChild(P)
            }
            if (X.defaultValueType != undefined) {
                var r = D.createElement("defaultValueType");
                r.textContent = X.defaultValueType;
                R.appendChild(r)
            }
            if (X.defaultValue != undefined) {
                var M = D.createElement("defaultValue");
                M.textContent = X.defaultValue;
                R.appendChild(M)
            }
            if (X.dsDefaultValue != undefined) {
                var s = D.createElement("dsDefaultValue");
                s.textContent = X.dsDefaultValue;
                R.appendChild(s)
            }
            if (X.modelType != undefined) {
                var S = D.createElement("modelType");
                S.textContent = X.modelType;
                R.appendChild(S)
            }
            C.appendChild(R)
        }
        o.appendChild(C)
    }
    return o
};
RptXml.prototype.createReportViewXmlNode = function (G, R) {
    var H = R.createElement("view");
    var B = G.fixedCell;
    if (B && ((B.rows && B.rows.length > 0) || (B.columns && B.columns.length > 0))) {
        var O = R.createElement("fixed");
        if (B.rows && B.rows.length > 0) {
            var Q = R.createElement("rows");
            Q.textContent = Utils.getRowsString(B.rows);
            O.appendChild(Q)
        }
        if (B.columns && B.columns.length > 0) {
            var S = R.createElement("cols");
            S.textContent = Utils.getColumnsString(B.columns);
            O.appendChild(S)
        }
        H.appendChild(O)
    }
    var L = G.hiddenCell;
    if (L && ((L.rows && L.rows.length > 0) || (L.cols && L.cols.length > 0))) {
        var E = R.createElement("hidden");
        if (L.rows && L.rows.length > 0) {
            var Q = R.createElement("rows");
            Q.textContent = Utils.getRowsString(L.rows);
            E.appendChild(Q)
        }
        if (L.cols && L.cols.length > 0) {
            var S = R.createElement("cols");
            S.textContent = Utils.getColumnsString(L.cols);
            E.appendChild(S)
        }
        H.appendChild(E)
    }
    var N = G.headerCell;
    if (N && (N.rows && N.rows.length > 0)) {
        var F = R.createElement("header");
        if (N.rows && N.rows.length > 0) {
            var Q = R.createElement("rows");
            Q.textContent = Utils.getRowsString(N.rows);
            F.appendChild(Q)
        }
        H.appendChild(F)
    }
    var K = G.tailCell;
    if (K && (K.rows && K.rows.length > 0)) {
        var A = R.createElement("tail");
        if (K.rows && K.rows.length > 0) {
            var Q = R.createElement("rows");
            Q.textContent = Utils.getRowsString(K.rows);
            A.appendChild(Q)
        }
        H.appendChild(A)
    }
    var I = G.repeatCell;
    if (I && ((I.rows && I.rows.length > 0) || (I.cols && I.cols.length > 0))) {
        var U = R.createElement("repeat");
        if (I.rows && I.rows.length > 0) {
            var Q = R.createElement("rows");
            Q.textContent = Utils.getRowsString(I.rows);
            U.appendChild(Q)
        }
        if (I.cols && I.cols.length > 0) {
            var S = R.createElement("cols");
            S.textContent = Utils.getColumnsString(I.cols);
            U.appendChild(S)
        }
        H.appendChild(U)
    }
    var M = G.columnDivide;
    if (M && M.num > 1) {
        var C = R.createElement("divide");
        var P = R.createElement("type");
        P.textContent = M.type ? M.type : 0;
        C.appendChild(P);
        var T = R.createElement("num");
        T.textContent = M.num;
        C.appendChild(T);
        var J = R.createElement("gap");
        J.textContent = M.gap ? M.gap : 0;
        C.appendChild(J);
        if (M.area) {
            var D = R.createElement("area");
            D.textContent = M.area;
            C.appendChild(D)
        }
        H.appendChild(C)
    }
    return H
};
RptXml.prototype.createExtendUnitsNode = function (G, F) {
    var H = F.createElement("extendUnits");
    for (var D = 0; D < G.length; D++) {
        var A = G[D];
        var E = F.createElement("extendUnit");
        var B = F.createElement("sourceRowCol");
        B.textContent = A.sourceRowCol;
        var C = F.createElement("destRowCol");
        C.textContent = A.destRowCol;
        E.appendChild(B);
        E.appendChild(C);
        H.appendChild(E)
    }
    if (H.childNodes.length > 0) {
        F.documentElement.appendChild(H)
    }
};
RptXml.prototype.createAsyncData = function (D, E) {
    var C = E.createElement("async");
    if (D.usable != undefined) {
        var A = E.createElement("usable");
        A.textContent = D.usable;
        C.appendChild(A)
    }
    var F = E.createElement("interval");
    F.textContent = D.interval != undefined ? D.interval : 0;
    var B = E.createElement("timeType");
    B.textContent = D.timeType != undefined ? D.timeType : 0;
    C.appendChild(F);
    C.appendChild(B);
    return C
};
RptXml.prototype.createColumns = function (B, F, D, G) {
    var E = G.createElement("columns");
    for (var A = 1; A <= F; A++) {
        var H = D.findTd(0, A);
        var C = G.createElement("column");
        C.setAttribute("w", Math.round(H.outerWidth()));
        E.appendChild(C)
    }
    return E
};
RptXml.prototype.createRows = function (B, F, E, G) {
    var A = G.createElement("rows");
    for (var C = 1; C <= B; C++) {
        var H = E.findTd(C, 0);
        var D = G.createElement("row");
        D.setAttribute("h", Math.round(H.parent().height()));
        A.appendChild(D)
    }
    return A
};
RptXml.prototype.createArgColumns = function (B, E, F) {
    var D = F.createElement("columns");
    for (var A = 1; A <= E; A++) {
        var G = argGrid.findTd(0, A);
        var C = F.createElement("column");
        C.setAttribute("w", Math.round(G.width()));
        D.appendChild(C)
    }
    return D
};
RptXml.prototype.createArgRows = function (B, E, F) {
    var A = F.createElement("rows");
    for (var C = 1; C <= B; C++) {
        var G = argGrid.findTd(C, 0);
        var D = F.createElement("row");
        D.setAttribute("h", Math.round(G.parent().height()));
        A.appendChild(D)
    }
    return A
};
RptXml.prototype.createCellsNode = function (I, J, G, D) {
    var K = D.createElement("cells");
    var H = G.tb.children();
    for (var F = 1; F <= I; F++) {
        var E = $(H[F]).children("td");
        for (var C = 1; C <= J; C++) {
            var B = $(E[C]);
            var A = B.data("gc");
            if (A.isRemove) {
                continue
            }
            if (A.mark == 0 || A.mark == 1) {
                K.appendChild(this.createCellXmlNode(A, D))
            } else {
                if (A.mark == 3 || A.mark == 4) {
                    K.appendChild(this.createChartCellXmlNode(A, D))
                } else {
                    if (A.mark == 5) {
                        K.appendChild(this.createImageCellXmlNode(A, D))
                    } else {
                        if (A.mark == 6) {
                            K.appendChild(this.createSubReportCellXmlNode(A, D))
                        } else {
                            if (A.mark == 7) {
                                K.appendChild(this.createTableCellXmlNode(A, D))
                            } else {
                                if (A.mark == 8) {
                                    K.appendChild(this.createPanelCellXmlNode(A, D))
                                } else {
                                    if (A.mark == 2) {
                                        K.appendChild(this.createConditionCellXmlNode(A, D))
                                    } else {
                                        if (A.mark == -2) {
                                            A.mark == 0;
                                            K.appendChild(this.createCellXmlNode(A, D))
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
    return K
};
RptXml.prototype.createArgs = function (U) {
    var I = report.reportArg ? report.reportArg : {};
    var C = I.hiddens ? I.hiddens : {};
    var D = argGrid.getArgMaxMinCellNum();
    var B = U.createElement("args");
    if (report.argDeveloper != undefined) {
        var O = this.createDeveloperNode(report.argDeveloper, U);
        if (O.childNodes.length > 0) {
            B.appendChild(O)
        }
    }
    if (I.relative != undefined) {
        var K = U.createElement("attr");
        var H = U.createElement("relative");
        H.textContent = I.relative;
        K.appendChild(H);
        B.appendChild(K)
    }
    if (D != null) {
        var M = D[0];
        var V = D[1];
        var G = U.createElement("canvas");
        G.appendChild(this.createArgColumns(M, V, U));
        G.appendChild(this.createArgRows(M, V, U));
        B.appendChild(G);
        if (M != 0 || V != 0) {
            var N = argGrid.tb.find("tr");
            for (var R = 1; R <= M; R++) {
                var S = $(N[R]).find("td");
                for (var P = 1; P <= V; P++) {
                    var J = $(S[P]);
                    var W = J.data("gc");
                    if (W.mark == 0) {
                        B.appendChild(this.createCellXmlNode(W, U))
                    } else {
                        if (W.mark == 2) {
                            B.appendChild(this.createConditionCellXmlNode(W, U))
                        } else {
                            W.mark == 0;
                            B.appendChild(this.createCellXmlNode(W, U))
                        }
                    }
                }
            }
        }
    }
    if (!$.isEmptyObject(C)) {
        for (var R = 0; R < C.length; R++) {
            var F = U.createElement("hidden");
            var Q = C[R];
            if (Q.name != undefined) {
                var T = U.createElement("name");
                T.textContent = Q.name;
                F.appendChild(T)
            }
            if (Q.dataType != undefined) {
                var E = U.createElement("dataType");
                E.textContent = Q.dataType;
                F.appendChild(E)
            }
            if (Q.dateFormat != undefined) {
                var X = U.createElement("dateFormat");
                X.textContent = Q.dateFormat;
                F.appendChild(X)
            }
            if (Q.defaultValueType != undefined) {
                var L = U.createElement("defaultValueType");
                L.textContent = Q.defaultValueType;
                F.appendChild(L)
            }
            if (Q.defaultValue != undefined) {
                var A = U.createElement("defaultValue");
                A.textContent = Q.defaultValue;
                F.appendChild(A)
            }
            B.appendChild(F)
        }
    }
    if (B.childNodes.length == 0) {
        return null
    }
    return B
};
RptXml.prototype.createPrinterAttrNode = function (E, F) {
    var C = F.createElement("printerAttr");
    if (E.rotate != undefined) {
        var M = F.createElement("rotate");
        M.textContent = E.rotate;
        C.appendChild(M)
    }
    if (E.marginLeft != undefined) {
        var D = F.createElement("marginLeft");
        D.textContent = E.marginLeft;
        C.appendChild(D)
    }
    if (E.marginTop != undefined) {
        var L = F.createElement("marginTop");
        L.textContent = E.marginTop;
        C.appendChild(L)
    }
    if (E.marginRight != undefined) {
        var B = F.createElement("marginRight");
        B.textContent = E.marginRight;
        C.appendChild(B)
    }
    if (E.marginBottom != undefined) {
        var G = F.createElement("marginBottom");
        G.textContent = E.marginBottom;
        C.appendChild(G)
    }
    if (E.zoom != undefined) {
        var H = F.createElement("zoom");
        H.textContent = E.zoom;
        C.appendChild(H)
    }
    if (E.hTOut != undefined) {
        var A = F.createElement("hTOut");
        A.textContent = E.hTOut;
        C.appendChild(A)
    }
    if (E.num != undefined) {
        var K = F.createElement("num");
        K.textContent = E.num;
        C.appendChild(K)
    }
    if (E.area != undefined) {
        var J = F.createElement("area");
        J.textContent = E.area;
        C.appendChild(J)
    }
    if (E.cellBgOut != undefined) {
        var I = F.createElement("cellBgOut");
        I.textContent = E.cellBgOut;
        C.appendChild(I)
    }
    return C
};
RptXml.prototype.createDeveloperNode = function (I, D) {
    var G = D.createElement("developer");
    if (I.jsCode != undefined) {
        var B = D.createElement("jsCode");
        B.textContent = I.jsCode;
        G.appendChild(B)
    }
    if (I.cssCode != undefined) {
        var H = D.createElement("cssCode");
        H.textContent = I.cssCode;
        G.appendChild(H)
    }
    if (I.files != undefined) {
        var A = I.files;
        for (var E = 0; E < A.length; E++) {
            var C = A[E];
            var F = D.createElement("file");
            F.setAttribute("jslib", C.jslib);
            F.setAttribute("jsPath", C.jsPath);
            G.appendChild(F)
        }
    }
    return G
};
RptXml.prototype.createCellXmlNode = function (c, T) {
    var P = c.content;
    var U = P.contentType;
    var A = "";
    var K = c.mark;
    var J = $(c.o);
    var M = J.find("span").html();
    var N = M;
    if (K == 0 || K == -2 || U == 4) {
        A = "htmlcell"
    } else {
        A = "columncell";
        if (report.rptType == 2) {
            if (P.isSum()) {
                P.setColumnTypeFlag(4, true)
            }
        }
        M = P.columnName;
        if (M != undefined) {
            M = M.replace(/&nbsp;/g, " ")
        }
    }
    var Q = T.createElement(A);
    var V = J.width();
    if (V < 0) {
        V = J.children("div").width()
    }
    if (V > 0) {
        Q.setAttribute("w", Math.round(V))
    }
    var D = J.height();
    if (D < 0) {
        D = J.children("div").height()
    }
    if (D > 0) {
        Q.setAttribute("h", Math.round(D))
    }
    Q.setAttribute("rowNum", c.rowNum - 1);
    Q.setAttribute("colNum", c.colNum - 1);
    Q.setAttribute("rowSpan", c.rowSpan);
    Q.setAttribute("colSpan", c.colSpan);
    if (P.disType != undefined) {
        var E = T.createElement("disType");
        E.textContent = P.disType;
        Q.appendChild(E)
    }
    if (P.joinType != undefined) {
        var L = T.createElement("joinType");
        L.textContent = P.joinType;
        Q.appendChild(L)
    }
    if (P.contentType != undefined) {
        var G = T.createElement("contentType");
        G.textContent = P.contentType;
        Q.appendChild(G)
    }
    if (P.hiddenCondtion != undefined) {
        var W = T.createElement("hiddenCondtion");
        W.textContent = P.hiddenCondtion;
        Q.appendChild(W)
    }
    var H = T.createElement("orgName");
    H.textContent = N;
    Q.appendChild(H);
    var S = T.createElement("name");
    S.textContent = M;
    Q.appendChild(S);
    if (P.visible != undefined) {
        var Y = T.createElement("visible");
        Y.textContent = P.visible;
        Q.appendChild(Y)
    }
    if (P.exportVisible != undefined) {
        var b = T.createElement("exportVisible");
        b.textContent = P.exportVisible;
        Q.appendChild(b)
    }
    if (A == "columncell") {
        if (P.columnType != undefined) {
            var a = T.createElement("columnType");
            a.textContent = P.columnType;
            Q.appendChild(a)
        }
        if (P.formatId != undefined) {
            var R = T.createElement("formatId");
            R.textContent = P.formatId;
            Q.appendChild(R);
            var C = T.createElement("localeUs");
            C.textContent = P.localeUs ? P.localeUs : false;
            Q.appendChild(C)
        }
        if (P.expression != undefined) {
            var F = T.createElement("expression");
            F.textContent = P.expression;
            Q.appendChild(F)
        }
        if (P.treeType != undefined) {
            var O = T.createElement("treeType");
            O.textContent = P.treeType;
            Q.appendChild(O)
        }
    }
    if (P.printerFlag != undefined) {
        var Z = T.createElement("printerFlag");
        Z.textContent = P.printerFlag;
        Q.appendChild(Z)
    }
    if (P.fileOutFlag != undefined) {
        var B = T.createElement("fileOutFlag");
        B.textContent = P.fileOutFlag;
        Q.appendChild(B)
    }
    if (P.upperCell != undefined) {
        var I = T.createElement("upperCell");
        I.textContent = P.upperCell;
        Q.appendChild(I)
    }
    if (P.asyncData != undefined) {
        var X = this.createAsyncData(P.asyncData, T);
        Q.appendChild(X)
    }
    this.createCellStyle(c, Q, T);
    this.setBorderStyle(Q, c, T);
    this.setCellLinked(Q, c.content, T);
    this.setCellImageLinked(Q, c.content, T);
    this.setCellFileLinked(Q, c.content, T);
    this.setCellConditionFormat(Q, c.content, T);
    this.setCellDataFilter(Q, c.content, T);
    this.setLinkage(Q, c.content, T);
    this.setDataBar(Q, c.content, T);
    this.setDiffBar(Q, c.content, T);
    this.setCellLines(Q, c, T);
    this.setOrderBy(Q, c.content, T);
    this.setCellFold(Q, c.content, T);
    this.setBarCode(Q, c.content, T);
    this.setCellSelectStyle(Q, c.content, T);
    this.setCellLogicValue(Q, c.content, T);
    this.setIconStyle(Q, c.content, T);
    return Q
};
RptXml.prototype.createConditionCellXmlNode = function (k, C) {
    var AG = C.createElement("conditioncell");
    var E = $(k.o);
    var u = E.width();
    if (u < 0) {
        u = E.children("div").width()
    }
    if (u > 0) {
        AG.setAttribute("w", Math.round(u))
    }
    var AE = E.height();
    if (AE < 0) {
        AE = E.children("div").height()
    }
    if (AE > 0) {
        AG.setAttribute("h", Math.round(AE))
    }
    AG.setAttribute("rowNum", k.rowNum - 1);
    AG.setAttribute("colNum", k.colNum - 1);
    AG.setAttribute("rowSpan", k.rowSpan);
    AG.setAttribute("colSpan", k.colSpan);
    this.createCellStyle(k, AG, C);
    if (k.mark == 0) {
        var g = E.children("div").html();
        var AB = C.createElement("name");
        AB.textContent = g;
        AG.appendChild(AB);
        var A = C.createElement("type");
        A.textContent = 0;
        AG.appendChild(A)
    } else {
        if (k.mark == 2) {
            var m = k.content;
            if (m.width != undefined) {
                var B = C.createElement("width");
                B.textContent = m.width;
                AG.appendChild(B)
            }
            if (m.widthUnit != undefined) {
                var AA = C.createElement("widthUnit");
                AA.textContent = m.widthUnit;
                AG.appendChild(AA)
            }
            if (m.height != undefined) {
                var a = C.createElement("height");
                a.textContent = m.height;
                AG.appendChild(a)
            }
            if (m.heightUnit != undefined) {
                var D = C.createElement("heightUnit");
                D.textContent = m.heightUnit;
                AG.appendChild(D)
            }
            if (m.name != undefined) {
                var AB = C.createElement("name");
                AB.textContent = m.name;
                AG.appendChild(AB)
            }
            if (m.hiddenCondtion != undefined) {
                var V = C.createElement("hiddenCondtion");
                V.textContent = m.hiddenCondtion;
                AG.appendChild(V)
            }
            var A = C.createElement("type");
            A.textContent = 1;
            AG.appendChild(A);
            if (m.dataType != undefined) {
                var H = C.createElement("dataType");
                H.textContent = m.dataType;
                AG.appendChild(H)
            }
            if (m.defaultValue != undefined) {
                var N = C.createElement("defaultValue");
                N.textContent = m.defaultValue;
                AG.appendChild(N);
                if (m.defaultValueType != undefined) {
                    var AD = C.createElement("defaultValueType");
                    AD.textContent = m.defaultValueType;
                    AG.appendChild(AD)
                }
            }
            if (m.useLike != undefined) {
                var O = C.createElement("useLike");
                O.textContent = m.useLike;
                AG.appendChild(O)
            }
            if (m.likeType != undefined) {
                var v = C.createElement("likeType");
                v.textContent = m.likeType;
                AG.appendChild(v)
            }
            if (m.triggerQuery != undefined) {
                var T = C.createElement("triggerQuery");
                T.textContent = m.triggerQuery;
                AG.appendChild(T)
            }
            var j = m.editStyle;
            var AC = C.createElement("editStyle");
            AC.textContent = j;
            AG.appendChild(AC);
            var AF = m.data;
            if (j == 2 || j == 10) {
                if (m.linkCondName) {
                    var n = C.createElement("linkCondName");
                    n.textContent = m.linkCondName;
                    AG.appendChild(n)
                }
                var w = C.createElement("select");
                if (AF) {
                    var X = AF.type != undefined ? AF.type : 1;
                    if (j == 10) {
                        X = 2
                    }
                    if (X != undefined) {
                        w.setAttribute("datatype", X)
                    }
                    if (AF.multiselect != undefined) {
                        w.setAttribute("multiselect", AF.multiselect)
                    }
                    if (AF.supportSearch != undefined) {
                        w.setAttribute("supportSearch", AF.supportSearch)
                    }
                    if ((X == undefined || X == 1) && j == 2) {
                        var l = AF.dataMap;
                        if (l) {
                            for (var x in l) {
                                var K = C.createElement("option");
                                K.setAttribute("value", x);
                                K.textContent = l[x];
                                w.appendChild(K)
                            }
                        }
                    } else {
                        var G = AF.conditionSql;
                        if (G != undefined) {
                            var J = C.createElement("code");
                            J.textContent = G.code;
                            var s = C.createElement("label");
                            s.textContent = G.label;
                            var y = C.createElement("dsName");
                            y.textContent = G.dsName;
                            w.appendChild(J);
                            w.appendChild(s);
                            w.appendChild(y)
                        }
                    }
                }
                AG.appendChild(w)
            } else {
                if (j == 3 || j == 16) {
                    if (m.dateFormat) {
                        var R = C.createElement("dateFormat");
                        R.textContent = m.dateFormat;
                        AG.appendChild(R)
                    }
                    if (m.linkCondName) {
                        var n = C.createElement("linkCondName");
                        n.textContent = m.linkCondName;
                        AG.appendChild(n)
                    }
                    if (m.dateRange != undefined) {
                        var t = C.createElement("dateRange");
                        t.textContent = m.dateRange;
                        AG.appendChild(t)
                    }
                    if (m.startName != undefined) {
                        var AH = C.createElement("startName");
                        AH.textContent = m.startName;
                        AG.appendChild(AH)
                    }
                    if (m.endName != undefined) {
                        var AI = C.createElement("endName");
                        AI.textContent = m.endName;
                        AG.appendChild(AI)
                    }
                } else {
                    if (j == 4) {
                        if (AF) {
                            var Q = AF.conditionSql;
                            var L = C.createElement("tree");
                            if (AF.multiselect != undefined) {
                                L.setAttribute("multiselect", AF.multiselect)
                            }
                            if (AF.treeType != undefined) {
                                L.setAttribute("treeType", AF.treeType)
                            }
                            if (AF.treeType != undefined && AF.treeType == 1) {
                                var l = AF.dataMap;
                                if (l) {
                                    for (var x in l) {
                                        var K = C.createElement("option");
                                        K.setAttribute("value", x);
                                        K.textContent = l[x];
                                        L.appendChild(K)
                                    }
                                    var M = C.createElement("dsName");
                                    M.textContent = Q.dsName;
                                    L.appendChild(M);
                                    AG.appendChild(L)
                                }
                            } else {
                                if (Q != undefined) {
                                    var e = C.createElement("code");
                                    e.textContent = Q.code;
                                    var d = C.createElement("pcode");
                                    d.textContent = Q.pcode;
                                    var F = C.createElement("queryCode");
                                    F.textContent = Q.queryCode;
                                    var I = C.createElement("label");
                                    I.textContent = Q.label;
                                    var M = C.createElement("dsName");
                                    M.textContent = Q.dsName;
                                    L.appendChild(e);
                                    L.appendChild(d);
                                    L.appendChild(F);
                                    L.appendChild(I);
                                    L.appendChild(M)
                                }
                                AG.appendChild(L)
                            }
                        }
                    } else {
                        if (j == 5 || j == 6 || j == 18) {
                            if (AF) {
                                var c = AF.dataMap;
                                if (c) {
                                    var q = j == 5 ? "radio" : "check";
                                    var p = C.createElement("group");
                                    for (var W in c) {
                                        var U = C.createElement(q);
                                        U.setAttribute("label", c[W]);
                                        U.setAttribute("value", W);
                                        p.appendChild(U)
                                    }
                                    AG.appendChild(p)
                                }
                            }
                        } else {
                            if (j == 9) {
                                if (AF) {
                                    var h = AF.datas;
                                    for (var z = 0; z < h.length; z++) {
                                        var Z = h[z];
                                        var r = C.createElement("button");
                                        r.setAttribute("type", Z.type);
                                        AG.appendChild(r)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var Y = m.cmpStyle;
            if (Y != undefined) {
                var b = C.createElement("cmpStyle");
                if (Y.background != undefined) {
                    var S = C.createElement("background");
                    S.textContent = Y.background;
                    b.appendChild(S)
                }
                if (Y.borderColor != undefined) {
                    var f = C.createElement("borderColor");
                    f.textContent = Y.borderColor;
                    b.appendChild(f)
                }
                if (Y.iconColor != undefined) {
                    var P = C.createElement("iconColor");
                    P.textContent = Y.iconColor;
                    b.appendChild(P)
                }
                if (b.childNodes.length > 0) {
                    AG.appendChild(b)
                }
            }
            this.setLinkage(AG, k.content, C);
            this.setCellLinked(AG, k.content, C)
        }
    }
    return AG
};
RptXml.prototype.createCellStyle = function (U, E, O) {
    var I = $(U.o);
    if (I.hasClass("bold")) {
        var C = O.createElement("fontWeight");
        C.textContent = "bold";
        E.appendChild(C)
    }
    if (I.hasClass("italic")) {
        var L = O.createElement("fontStyle");
        L.textContent = "italic";
        E.appendChild(L)
    }
    if (I.hasClass("underline")) {
        var T = O.createElement("textDecoration");
        T.textContent = "underline";
        E.appendChild(T)
    }
    var P = grid.style(I);
    if (P["font-size"]) {
        var B = P["font-size"];
        if (B != "12px") {
            var A = O.createElement("fontSize");
            A.textContent = B.substring(0, B.length - 2);
            E.appendChild(A)
        }
    }
    if (P["background"]) {
        var Q = O.createElement("backgroundColor");
        Q.textContent = P["background"];
        E.appendChild(Q)
    }
    if (P["color"]) {
        var K = O.createElement("color");
        K.textContent = P["color"];
        E.appendChild(K)
    }
    var G = I.attr("valign");
    if (G != undefined && G != "" && G != "top") {
        var J = O.createElement("verticalAlign");
        J.textContent = G;
        E.appendChild(J)
    }
    var N = I.attr("align");
    if (N != undefined && N != "" && N != "left") {
        var F = O.createElement("horizontalAlign");
        F.textContent = N;
        E.appendChild(F)
    }
    var R = U.content;
    if (R.paddingLeft != undefined) {
        var H = O.createElement("paddingLeft");
        H.textContent = R.paddingLeft;
        E.appendChild(H)
    }
    if (R.paddingTop != undefined) {
        var S = O.createElement("paddingTop");
        S.textContent = R.paddingTop;
        E.appendChild(S)
    }
    if (R.paddingRight != undefined) {
        var M = O.createElement("paddingRight");
        M.textContent = R.paddingRight;
        E.appendChild(M)
    }
    if (R.paddingBottom != undefined) {
        var D = O.createElement("paddingBottom");
        D.textContent = R.paddingBottom;
        E.appendChild(D)
    }
};
RptXml.prototype.setBorderStyle = function (B, E, F) {
    var G = E.borderColor;
    if (!E.borderColor) {
        return
    }
    for (var C in G) {
        var D = F.createElement("border");
        D.setAttribute("side", C);
        var A = G[C];
        D.setAttribute("color", A.color);
        if (A.borderStyle != undefined && A.borderStyle != null) {
            D.setAttribute("borderStyle", A.borderStyle)
        }
        if (A.borderWidth != undefined && A.borderWidth != null) {
            D.setAttribute("borderWidth", A.borderWidth)
        }
        B.appendChild(D)
    }
};
RptXml.prototype.setCellLinked = function (G, E, C) {
    var J = E.cellLinked;
    if (!J || J == null) {
        return
    }
    var B = C.createElement("cellLinked");
    if (J.type != undefined && J.type != null) {
        var M = C.createElement("type");
        M.textContent = J.type;
        B.appendChild(M)
    }
    if (J.targetType) {
        var K = C.createElement("targetType");
        K.textContent = J.targetType;
        B.appendChild(K)
    }
    if (J.width != undefined) {
        var L = C.createElement("width");
        L.textContent = J.width;
        B.appendChild(L)
    }
    if (J.height != undefined) {
        var H = C.createElement("height");
        H.textContent = J.height;
        B.appendChild(H)
    }
    if (J.url) {
        var D = C.createElement("url");
        D.textContent = J.url;
        B.appendChild(D)
    }
    var A = J.argValueMap;
    if (A) {
        for (var I in A) {
            var F = C.createElement("param");
            F.setAttribute("argName", I);
            F.setAttribute("argValue", A[I]);
            B.appendChild(F)
        }
    }
    if (J.logicCondition != undefined) {
        var N = this.createLogicCondition(J.logicCondition, C);
        if (N.childNodes.length > 0) {
            B.appendChild(N)
        }
    }
    if (B.childNodes.length > 0) {
        G.appendChild(B)
    }
};
RptXml.prototype.createLogicCondition = function (I, A) {
    var L = A.createElement("logicCondition");
    var F = I.conditions;
    for (var C = 0; C < F.length; C++) {
        var E = F[C];
        var G = A.createElement("content");
        if (E.column != undefined) {
            var B = A.createElement("column");
            B.textContent = E.column;
            G.appendChild(B)
        }
        if (E.symbol != undefined) {
            var D = A.createElement("symbol");
            D.textContent = E.symbol;
            G.appendChild(D)
        }
        if (E.type != undefined) {
            var K = A.createElement("type");
            K.textContent = E.type;
            G.appendChild(K)
        }
        if (E.logic != undefined) {
            var J = A.createElement("logic");
            J.textContent = E.logic;
            G.appendChild(J)
        }
        if (E.value != undefined) {
            var H = A.createElement("value");
            H.textContent = E.value;
            G.appendChild(H)
        }
        L.appendChild(G)
    }
    return L
};
RptXml.prototype.setCellImageLinked = function (C, F, H) {
    var A = F.cellImageLinked;
    if (!A || A == null) {
        return
    }
    if (A.filePath) {
        var G = H.createElement("imageLinked");
        G.setAttribute("filePath", A.filePath);
        C.appendChild(G);
        if (A.serverPath != undefined) {
            var E = H.createElement("serverPath");
            E.textContent = A.serverPath;
            G.appendChild(E)
        }
        if (A.imgWidth != undefined) {
            var B = H.createElement("imgWidth");
            B.textContent = A.imgWidth;
            G.appendChild(B)
        }
        if (A.imgHeight != undefined) {
            var D = H.createElement("imgHeight");
            D.textContent = A.imgHeight;
            G.appendChild(D)
        }
    }
};
RptXml.prototype.setCellFileLinked = function (B, D, E) {
    var A = D.cellFileLinked;
    if (!A || A == null) {
        return
    }
    if (A.filePath) {
        var C = E.createElement("fileLinked");
        C.setAttribute("filePath", A.filePath);
        B.appendChild(C)
    }
};
RptXml.prototype.setCellConditionFormat = function (I, O, W) {
    var J = O.conditionFormat;
    if (!J || J == null) {
        return
    }
    var F = W.createElement("conditionFormat");
    var S = J.cformats;
    if (!S || S == null) {
        return
    }
    for (var U = 0; U < S.length; U++) {
        var X = S[U];
        var a = W.createElement("style");
        if (X.fontColor != undefined) {
            var V = W.createElement("fontColor");
            V.textContent = X.fontColor;
            a.appendChild(V)
        }
        if (X.background != undefined) {
            var T = W.createElement("background");
            T.textContent = X.background;
            a.appendChild(T)
        }
        if (X.isBold != undefined) {
            var E = W.createElement("bold");
            E.textContent = X.isBold;
            a.appendChild(E)
        }
        if (X.isItalic != undefined) {
            var N = W.createElement("italic");
            N.textContent = X.isItalic;
            a.appendChild(N)
        }
        if (X.isUnderline != undefined) {
            var b = W.createElement("underline");
            b.textContent = X.isUnderline;
            a.appendChild(b)
        }
        if (X.fontSize != undefined) {
            var C = W.createElement("fontSize");
            C.textContent = X.fontSize;
            a.appendChild(C)
        }
        if (X.styleImages && X.styleImages.length > 0) {
            var L = X.styleImages;
            for (var M = 0; M < L.length; M++) {
                var K = L[M];
                var Q = W.createElement("styleImage");
                Q.setAttribute("filePath", K.filePath);
                Q.setAttribute("remote", K.remote);
                a.appendChild(Q)
            }
        }
        if (X.desc != undefined) {
            var A = W.createElement("desc");
            A.textContent = X.desc;
            a.appendChild(A)
        }
        var H = X.contents;
        if (H != undefined && H != null) {
            for (var Z = 0; Z < H.length; Z++) {
                var R = H[Z];
                var P = W.createElement("content");
                if (R.column != undefined) {
                    var Y = W.createElement("column");
                    Y.textContent = R.column;
                    P.appendChild(Y)
                }
                if (R.symbol != undefined) {
                    var d = W.createElement("symbol");
                    d.textContent = R.symbol;
                    P.appendChild(d)
                }
                if (R.type != undefined) {
                    var D = W.createElement("type");
                    D.textContent = R.type;
                    P.appendChild(D)
                }
                if (R.logic != undefined) {
                    var B = W.createElement("logic");
                    B.textContent = R.logic;
                    P.appendChild(B)
                }
                if (R.value != undefined) {
                    var G = W.createElement("value");
                    G.textContent = R.value;
                    P.appendChild(G)
                }
                a.appendChild(P)
            }
        }
        F.appendChild(a)
    }
    if (F.childNodes.length > 0) {
        I.appendChild(F)
    }
};
RptXml.prototype.setCellDataFilter = function (I, B, D) {
    var A = B.dataFilter;
    if (A == undefined || A == null) {
        return
    }
    var N = D.createElement("dataFilter");
    var H = A.conditions;
    if (H == undefined || H.length == 0) {
        return
    }
    if (A.type != undefined) {
        N.setAttribute("type", A.type)
    }
    if (H != null) {
        for (var E = 0; E < H.length; E++) {
            var G = H[E];
            var J = D.createElement("content");
            var C = D.createElement("column");
            C.textContent = G.column;
            J.appendChild(C);
            var F = D.createElement("symbol");
            F.textContent = G.symbol;
            J.appendChild(F);
            var M = D.createElement("type");
            M.textContent = G.type;
            J.appendChild(M);
            var L = D.createElement("logic");
            L.textContent = G.logic;
            J.appendChild(L);
            var K = D.createElement("value");
            K.textContent = G.value;
            J.appendChild(K);
            N.appendChild(J)
        }
    }
    I.appendChild(N)
};
RptXml.prototype.setDataBar = function (J, G, F) {
    var C = G.dataBar;
    if (!C || C == null) {
        return
    }
    var I = F.createElement("dataBar");
    if (C.onlyBar != undefined) {
        var D = F.createElement("onlyBar");
        D.textContent = C.onlyBar;
        I.appendChild(D)
    }
    if (C.min != undefined) {
        var E = F.createElement("min");
        E.textContent = C.min;
        I.appendChild(E)
    }
    if (C.max != undefined) {
        var B = F.createElement("max");
        B.textContent = C.max;
        I.appendChild(B)
    }
    if (C.backgroundColor != undefined) {
        var A = F.createElement("backgroundColor");
        A.textContent = C.backgroundColor;
        I.appendChild(A)
    }
    if (C.height != undefined) {
        var K = F.createElement("height");
        K.textContent = C.height;
        I.appendChild(K)
    }
    if (C.maxWidth != undefined) {
        var H = F.createElement("maxWidth");
        H.textContent = C.maxWidth;
        I.appendChild(H)
    }
    J.appendChild(I)
};
RptXml.prototype.setDiffBar = function (I, G, D) {
    var F = G.diffBar;
    if (!F || F == null) {
        return
    }
    var A = D.createElement("diffBar");
    if (F.onlyBar != undefined) {
        var B = D.createElement("onlyBar");
        B.textContent = F.onlyBar;
        A.appendChild(B)
    }
    if (F.columnValue != undefined) {
        var E = D.createElement("column");
        E.textContent = F.columnValue;
        A.appendChild(E)
    }
    if (F.midValue != undefined) {
        var C = D.createElement("mid");
        C.textContent = F.midValue;
        A.appendChild(C)
    }
    if (F.height != null) {
        var J = D.createElement("height");
        J.textContent = F.height;
        A.appendChild(J)
    }
    if (F.maxWidth != null) {
        var H = D.createElement("maxWidth");
        H.textContent = F.maxWidth;
        A.appendChild(H)
    }
    I.appendChild(A)
};
RptXml.prototype.setLinkage = function (L, G, E) {
    var D = G.linkages;
    if (!D || D == null) {
        return
    }
    var O = D.linkages;
    if (!O || O == null) {
        return
    }
    var J = E.createElement("linkages");
    for (var F = 0; F < O.length; F++) {
        var K = O[F];
        var C = E.createElement("linkage");
        var B = E.createElement("name");
        B.textContent = K.name;
        C.appendChild(B);
        var N = E.createElement("type");
        N.textContent = K.type;
        C.appendChild(N);
        var I = E.createElement("targetId");
        I.textContent = K.targetId;
        C.appendChild(I);
        var A = K.params;
        if (A) {
            for (var M in A) {
                var H = E.createElement("param");
                H.setAttribute("argName", M);
                H.setAttribute("argValue", A[M]);
                C.appendChild(H)
            }
        }
        J.appendChild(C)
    }
    if (J.childNodes.length > 0) {
        L.appendChild(J)
    }
};
RptXml.prototype.setCellSelectStyle = function (C, E, G) {
    var B = E.cellSelectStyle;
    if (B == undefined || B == null) {
        return
    }
    var A = G.createElement("selectStyle");
    if (B.oddBackgroundColor != undefined) {
        var F = G.createElement("oddBackgroundColor");
        F.textContent = B.oddBackgroundColor;
        A.appendChild(F)
    }
    if (B.evenBackgroundColor != undefined) {
        var D = G.createElement("evenBackgroundColor");
        D.textContent = B.evenBackgroundColor;
        A.appendChild(D)
    }
    if (A.childNodes.length > 0) {
        C.appendChild(A)
    }
};
RptXml.prototype.setBarCode = function (F, E, D) {
    if (E.contentType != 5) {
        return
    }
    var C = E.barCode;
    if (!C || C == null) {
        return
    }
    var B = D.createElement("barCode");
    if (C.type != undefined) {
        var I = D.createElement("type");
        I.textContent = C.type;
        B.appendChild(I)
    }
    if (C.height != undefined) {
        var G = D.createElement("height");
        G.textContent = C.height;
        B.appendChild(G)
    }
    if (C.width != undefined) {
        var H = D.createElement("width");
        H.textContent = C.width;
        B.appendChild(H)
    }
    if (C.textEnabled != undefined) {
        var A = D.createElement("textEnabled");
        A.textContent = C.textEnabled;
        B.appendChild(A)
    }
    F.appendChild(B)
};
RptXml.prototype.setCellLogicValue = function (C, E, F) {
    if (E.contentType != 3) {
        return
    }
    var B = E.logicMap;
    if (!B || B == null) {
        return
    }
    var A = F.createElement("logicValue");
    for (var D in B) {
        var G = F.createElement("item");
        G.setAttribute("code", D);
        G.setAttribute("value", B[D]);
        A.appendChild(G)
    }
    if (A.childNodes.length > 0) {
        C.appendChild(A)
    }
};
RptXml.prototype.setCellLines = function (A, E, F) {
    var D = E.content;
    if (!E.celllines || E.celllines == null) {
        return
    }
    var C = E.celllines;
    for (var B = 0; B < C.length; B++) {
        var H = $(C[B]);
        var G = F.createElement("point");
        G.setAttribute("x", Math.round(H.data("x")));
        G.setAttribute("y", Math.round(H.data("y")));
        G.setAttribute("sx", 0);
        G.setAttribute("sy", 0);
        A.appendChild(G)
    }
};
RptXml.prototype.setOrderBy = function (I, G, E) {
    var H = G.orderBy;
    if (!H || H == null) {
        return
    }
    var A = E.createElement("orderBy");
    var J = E.createElement("type");
    J.textContent = H.type;
    A.appendChild(J);
    if (H.dyn != undefined) {
        var C = E.createElement("dyn");
        C.textContent = H.dyn;
        A.appendChild(C)
    }
    var B = H.columns;
    if (B != null) {
        for (var F = 0; F < B.length; F++) {
            var D = E.createElement("column");
            D.textContent = B[F];
            A.appendChild(D)
        }
    }
    I.appendChild(A)
};
RptXml.prototype.setCellFold = function (C, D, F) {
    var E = D.cellFold;
    if (E == undefined || E == null) {
        return
    }
    var B = F.createElement("cellFold");
    var A = F.createElement("foldType");
    A.textContent = E.foldType;
    B.appendChild(A);
    C.appendChild(B)
};
RptXml.prototype.setIconStyle = function (H, F, D) {
    var E = F.iconStyle;
    if (E == undefined || E == null) {
        return
    }
    var I = D.createElement("iconStyle");
    if (E.color != undefined) {
        var B = D.createElement("color");
        B.textContent = E.color;
        I.appendChild(B)
    }
    if (E.size != undefined) {
        var G = D.createElement("size");
        G.textContent = E.size;
        I.appendChild(G)
    }
    if (E.align != undefined) {
        var A = D.createElement("align");
        A.textContent = E.align;
        I.appendChild(A)
    }
    if (E.iconString != undefined) {
        var C = D.createElement("iconString");
        C.textContent = E.iconString;
        I.appendChild(C)
    }
    H.appendChild(I)
};
RptXml.prototype.createDivXMlNode = function (D) {
    var K = divCoor.getDivs();
    if (K == null || K.length == 0) {
        return null
    }
    for (var F = 0; F < K.length; F++) {
        var G = $(K[F]);
        var J = D.createElement("div");
        var E = G.position();
        J.setAttribute("x", Math.round(E.left - divCoor.POSLEFT));
        J.setAttribute("y", Math.round(E.top - divCoor.POSTOP));
        J.setAttribute("w", Math.round(G.width()));
        J.setAttribute("h", Math.round(G.height()));
        var M = G.data("rd");
        if (M.id != undefined) {
            var I = D.createElement("id");
            I.textContent = M.id;
            J.appendChild(I)
        }
        if (M.name != undefined) {
            var A = D.createElement("name");
            A.textContent = M.name;
            J.appendChild(A)
        }
        if (M.printerFlag != undefined) {
            var N = D.createElement("printerFlag");
            N.textContent = M.printerFlag;
            J.appendChild(N)
        }
        if (M.fileOutFlag != undefined) {
            var C = D.createElement("fileOutFlag");
            C.textContent = M.fileOutFlag;
            J.appendChild(C)
        }
        if (M.mark == 0) {
            var O = D.createElement("text");
            O.textContent = G.find(".content").html();
            J.appendChild(O)
        }
        if (M.mark == 3) {
            var L = M.content;
            J.appendChild(this.createChartXmlNode(L, D))
        }
        var H = M.content;
        this.setLinkage(J, H, D);
        this.setCellLinked(J, H, D);
        if (H.asyncData != undefined) {
            var B = this.createAsyncData(H.asyncData, D);
            J.appendChild(B)
        }
        D.documentElement.appendChild(J)
    }
};
RptXml.prototype.createPanelXMLNode = function (Q) {
    var C = divCoor.getPanels();
    if (C == null || C.length == 0) {
        return null
    }
    for (var P = 0; P < C.length; P++) {
        var J = $(C[P]);
        var G = Q.createElement("panel");
        var H = J.position();
        G.setAttribute("x", Math.round(H.left - divCoor.POSLEFT));
        G.setAttribute("y", Math.round(H.top - divCoor.POSTOP));
        G.setAttribute("w", Math.round(J.width()));
        G.setAttribute("h", Math.round(J.height()));
        var L = J.data("rd");
        if (L.id != undefined) {
            var I = Q.createElement("id");
            I.textContent = L.id;
            G.appendChild(I)
        }
        if (L.name != undefined) {
            var R = Q.createElement("name");
            R.textContent = L.name;
            G.appendChild(R)
        }
        if (L.title != undefined) {
            var M = Q.createElement("title");
            M.textContent = L.title;
            G.appendChild(M)
        }
        if (L.printerFlag != undefined) {
            var T = Q.createElement("printerFlag");
            T.textContent = L.printerFlag;
            G.appendChild(T)
        }
        if (L.fileOutFlag != undefined) {
            var A = Q.createElement("fileOutFlag");
            A.textContent = L.fileOutFlag;
            G.appendChild(A)
        }
        if (L.mark == 0) {
            var D = Q.createElement("text");
            D.textContent = J.find(".content").html();
            G.appendChild(D)
        }
        if (L.mark == 3) {
            var E = L.content;
            G.appendChild(this.createChartXmlNode(E, Q))
        }
        if (L.mark == 6) {
            var B = L.content;
            var K = Q.createElement("report");
            var N = Q.createElement("rptId");
            N.textContent = B.rptId;
            K.appendChild(N);
            var F = B.argValueMap;
            if (F) {
                for (var V in F) {
                    var U = Q.createElement("param");
                    U.setAttribute("argName", V);
                    U.setAttribute("argValue", F[V]);
                    K.appendChild(U)
                }
            }
            G.appendChild(K)
        }
        var O = L.content;
        this.setLinkage(G, O, Q);
        this.setCellLinked(G, O, Q);
        if (O.asyncData != undefined) {
            var S = this.createAsyncData(O.asyncData, Q);
            G.appendChild(S)
        }
        Q.documentElement.appendChild(G)
    }
};
RptXml.prototype.createChartCellXmlNode = function (B, E) {
    var I = E.createElement("chartcell");
    var C = $(B.o);
    var H = B.content;
    var J = C.width();
    if (J < 0) {
        J = C.children("div").width()
    }
    if (J > 0) {
        I.setAttribute("w", Math.round(J))
    }
    var G = C.height();
    if (G < 0) {
        G = C.children("div").height()
    }
    if (G > 0) {
        I.setAttribute("h", Math.round(G))
    }
    I.setAttribute("rowNum", B.rowNum - 1);
    I.setAttribute("colNum", B.colNum - 1);
    I.setAttribute("rowSpan", B.rowSpan);
    I.setAttribute("colSpan", B.colSpan);
    if (H.disType != undefined) {
        var F = E.createElement("disType");
        F.textContent = H.disType;
        I.appendChild(F)
    }
    if (H.printerFlag != undefined) {
        var K = E.createElement("printerFlag");
        K.textContent = H.printerFlag;
        I.appendChild(K)
    }
    if (H.fileOutFlag != undefined) {
        var D = E.createElement("fileOutFlag");
        D.textContent = H.fileOutFlag;
        I.appendChild(D)
    }
    if (H.asyncData != undefined) {
        var A = this.createAsyncData(H.asyncData, E);
        I.appendChild(A)
    }
    this.createCellStyle(B, I, E);
    this.setBorderStyle(I, B, E);
    this.setCellDataFilter(I, B.content, E);
    this.setCellLinked(I, B.content, E);
    this.setLinkage(I, B.content, E);
    I.appendChild(this.createChartXmlNode(B.content, E));
    return I
};
RptXml.prototype.createChartXmlNode = function (D, B) {
    var AF = B.createElement("chart");
    if (D.chartType != undefined) {
        var r = B.createElement("type");
        r.textContent = D.chartType;
        AF.appendChild(r)
    }
    if (D.chart) {
        var G = B.createElement("chart");
        var AG = D.chart;
        if (AG.marginLeft != undefined) {
            var AI = B.createElement("marginLeft");
            AI.textContent = AG.marginLeft;
            G.appendChild(AI)
        }
        if (AG.marginRight != undefined) {
            var l = B.createElement("marginRight");
            l.textContent = AG.marginRight;
            G.appendChild(l)
        }
        if (AG.marginTop != undefined) {
            var AE = B.createElement("marginTop");
            AE.textContent = AG.marginTop;
            G.appendChild(AE)
        }
        if (AG.marginBottom != undefined) {
            var q = B.createElement("marginBottom");
            q.textContent = AG.marginBottom;
            G.appendChild(q)
        }
        if (AG.margin != undefined) {
            var g = B.createElement("margin");
            g.textContent = AG.margin;
            G.appendChild(g)
        }
        if (AG.borderWidth != undefined) {
            var L = B.createElement("borderWidth");
            L.textContent = AG.borderWidth;
            G.appendChild(L)
        }
        if (AG.backgroundColor != undefined) {
            var h = B.createElement("backgroundColor");
            h.textContent = AG.backgroundColor;
            G.appendChild(h)
        }
        if (AG.bgOpacity != undefined) {
            var z = B.createElement("bgOpacity");
            z.textContent = AG.bgOpacity;
            G.appendChild(z)
        }
        if (AG.bgColor != undefined && AG.bgColor != "#ffffff") {
            var Q = B.createElement("bgColor");
            Q.textContent = AG.bgColor;
            G.appendChild(Q)
        }
        if (AG.borderColor != undefined) {
            var T = B.createElement("borderColor");
            T.textContent = AG.borderColor;
            G.appendChild(T)
        }
        if (AG.borderOpacity != undefined) {
            var X = B.createElement("borderOpacity");
            X.textContent = AG.borderOpacity;
            G.appendChild(X)
        }
        if (AG.width != undefined) {
            var o = B.createElement("width");
            o.textContent = AG.width;
            G.appendChild(o)
        }
        if (AG.height != undefined) {
            var V = B.createElement("height");
            V.textContent = AG.height;
            G.appendChild(V)
        }
        if (AG.borderRadius != undefined) {
            var f = B.createElement("borderRadius");
            f.textContent = AG.borderRadius;
            G.appendChild(f)
        }
        if (AG.type != undefined) {
            var w = B.createElement("type");
            w.textContent = AG.type;
            G.appendChild(w)
        }
        if (AG.layout != undefined) {
            var N = B.createElement("layout");
            N.textContent = AG.layout;
            G.appendChild(N)
        }
        if (AG.enable3D) {
            var W = B.createElement("enable3D");
            W.textContent = AG.enable3D;
            G.appendChild(W)
        }
        var J = AG.asyncData;
        if (J != undefined) {
            if (J.interval != undefined) {
                var k = B.createElement("interval");
                k.textContent = J.interval;
                G.appendChild(k)
            }
            if (J.timeType != undefined) {
                var O = B.createElement("timeType");
                O.textContent = J.timeType;
                G.appendChild(O)
            }
        }
        if (G.childNodes.length > 0) {
            AF.appendChild(G)
        }
    }
    if (D.title) {
        var d = this.createTitleNode(D.title, B);
        if (d.childNodes.length > 0) {
            AF.appendChild(d)
        }
    }
    if (D.tooltip) {
        var u = B.createElement("tooltip");
        var n = D.tooltip;
        if (n.enabled != undefined && !n.enabled) {
            var c = B.createElement("enabled");
            c.textContent = n.enabled;
            u.appendChild(c)
        }
        if (n.format != undefined && n.format != "0") {
            var b = B.createElement("format");
            b.textContent = n.format;
            u.appendChild(b)
        }
        if (n.align != undefined) {
            var H = B.createElement("align");
            H.textContent = n.align;
            u.appendChild(H)
        }
        if (n.padding != undefined && n.padding != 10) {
            var U = B.createElement("padding");
            U.textContent = n.padding;
            u.appendChild(U)
        }
        if (n.borderColor != undefined) {
            var T = B.createElement("borderColor");
            T.textContent = n.borderColor;
            u.appendChild(T)
        }
        if (n.borderWidth != undefined && n.borderWidth != 0) {
            var L = B.createElement("borderWidth");
            L.textContent = n.borderWidth;
            u.appendChild(L)
        }
        if (n.backgroundColor != undefined) {
            var h = B.createElement("backgroundColor");
            h.textContent = n.backgroundColor;
            u.appendChild(h)
        }
        if (n.borderRadius != undefined && n.borderRadius != 3) {
            var f = B.createElement("borderRadius");
            f.textContent = n.borderRadius;
            u.appendChild(f)
        }
        if (n.textStyle != undefined) {
            var e = this.createTextStyle(n.textStyle, B);
            if (e.childNodes.length > 0) {
                u.appendChild(e)
            }
        }
        if (u.childNodes.length > 0) {
            AF.appendChild(u)
        }
    }
    if (D.legend) {
        var j = B.createElement("legend");
        var s = D.legend;
        if (s.enabled != undefined && !s.enabled) {
            var c = B.createElement("enabled");
            c.textContent = s.enabled;
            j.appendChild(c)
        }
        if (s.align != undefined && s.align != "center") {
            var H = B.createElement("align");
            H.textContent = s.align;
            j.appendChild(H)
        }
        if (s.verticalAlign != undefined && s.verticalAlign != "bottom") {
            var S = B.createElement("verticalAlign");
            S.textContent = s.verticalAlign;
            j.appendChild(S)
        }
        if (s.layout != undefined && s.layout != "horizontal") {
            var N = B.createElement("layout");
            N.textContent = s.layout;
            j.appendChild(N)
        }
        if (s.itemGap != undefined && s.itemGap != 10) {
            var I = B.createElement("itemGap");
            I.textContent = s.itemGap;
            j.appendChild(I)
        }
        if (s.textStyle != undefined) {
            var e = this.createTextStyle(s.textStyle, B);
            if (e.childNodes.length > 0) {
                j.appendChild(e)
            }
        }
        if (j.childNodes.length > 0) {
            AF.appendChild(j)
        }
    }
    if (D.series) {
        var P = B.createElement("series");
        var M = D.series;
        if (M.gap != undefined && M.gap != 1) {
            var A = B.createElement("gap");
            A.textContent = M.gap;
            P.appendChild(A)
        }
        if (M.startAngle != undefined) {
            var m = B.createElement("startAngle");
            m.textContent = M.startAngle;
            P.appendChild(m)
        }
        if (M.endAngle != undefined) {
            var y = B.createElement("endAngle");
            y.textContent = M.endAngle;
            P.appendChild(y)
        }
        if (M.barGap != undefined) {
            var AH = B.createElement("barGap");
            AH.textContent = M.barGap;
            P.appendChild(AH)
        }
        if (M.barCategoryGap != undefined) {
            var Y = B.createElement("barCategoryGap");
            Y.textContent = M.barCategoryGap;
            P.appendChild(Y)
        }
        if (M.column != undefined) {
            var E = B.createElement("column");
            E.textContent = M.column;
            P.appendChild(E);
            if (M.columnValueType != undefined) {
                var Z = B.createElement("columnValueType");
                Z.textContent = M.columnValueType;
                P.appendChild(Z)
            }
        }
        if (M.unitName != undefined) {
            var x = B.createElement("unitName");
            x.textContent = M.unitName;
            P.appendChild(x)
        }
        if (M.rowCount != undefined) {
            var R = B.createElement("rowCount");
            R.textContent = M.rowCount;
            P.appendChild(R)
        }
        if (M.structType != undefined) {
            var AD = B.createElement("structType");
            AD.textContent = M.structType;
            P.appendChild(AD)
        }
        var AA = M.series;
        if (AA) {
            for (var AC = 0; AC < AA.length; AC++) {
                var a = AA[AC];
                var v = this.createSerieXmlNode(a, B);
                if (v.childNodes.length > 0) {
                    P.appendChild(v)
                }
            }
        }
        if (P.childNodes.length > 0) {
            AF.appendChild(P)
        }
    }
    if (D.xAxis) {
        var p = this.createAxisNode(D.xAxis, "xaxis", B);
        if (p.childNodes.length > 0) {
            AF.appendChild(p)
        }
    }
    if (D.yAxis) {
        var F = this.createAxisNode(D.yAxis, "yaxis", B);
        if (F.childNodes.length > 0) {
            AF.appendChild(F)
        }
    }
    if (D.yRightAxis) {
        var AB = this.createAxisNode(D.yRightAxis, "yrightaxis", B);
        if (AB.childNodes.length > 0) {
            AF.appendChild(AB)
        }
    }
    if (D.axis) {
        var C = this.createAxisNode(D.axis, "axis", B);
        if (C.childNodes.length > 0) {
            AF.appendChild(C)
        }
    }
    if (D.map) {
        var K = this.createMapAttrNode(D.map, B);
        if (K.childNodes.length > 0) {
            AF.appendChild(K)
        }
    }
    if (D.styleMap) {
        var t = this.createStyleMapNode(D.styleMap, B);
        if (t.childNodes.length > 0) {
            AF.appendChild(t)
        }
    }
    return AF
};
RptXml.prototype.createTextStyle = function (H, G) {
    var E = G.createElement("textStyle");
    if (H.fontSize != undefined) {
        var F = G.createElement("fontSize");
        F.textContent = H.fontSize;
        E.appendChild(F)
    }
    if (H.color != undefined && H.color != "#000000") {
        var A = G.createElement("color");
        A.textContent = H.color;
        E.appendChild(A)
    }
    if (H.fontWeight != undefined) {
        var C = G.createElement("fontWeight");
        C.textContent = H.fontWeight;
        E.appendChild(C)
    }
    if (H.fontStyle != undefined) {
        var D = G.createElement("fontStyle");
        D.textContent = H.fontStyle;
        E.appendChild(D)
    }
    if (H.textDecoration != undefined) {
        var B = G.createElement("textDecoration");
        B.textContent = H.textDecoration;
        E.appendChild(B)
    }
    return E
};
RptXml.prototype.createSerieXmlNode = function (X, B) {
    var K = B.createElement("serie");
    if (X.type != undefined) {
        var g = B.createElement("type");
        g.textContent = X.type;
        K.appendChild(g)
    }
    if (X.column != undefined) {
        var F = B.createElement("column");
        F.textContent = X.column;
        K.appendChild(F);
        if (X.columnValueType != undefined) {
            var W = B.createElement("columnValueType");
            W.textContent = X.columnValueType;
            K.appendChild(W)
        }
    }
    if (X.name != undefined) {
        var n = B.createElement("name");
        n.textContent = X.name;
        K.appendChild(n);
        if (X.nameValueType != undefined) {
            var E = B.createElement("nameValueType");
            E.textContent = X.nameValueType;
            K.appendChild(E)
        }
    }
    if (X.value != undefined) {
        var Y = B.createElement("value");
        Y.textContent = X.value;
        K.appendChild(Y);
        if (X.valueValueType != undefined) {
            var R = B.createElement("valueValueType");
            R.textContent = X.valueValueType;
            K.appendChild(R)
        }
    }
    if (X.total != undefined) {
        var M = B.createElement("total");
        M.textContent = X.total;
        K.appendChild(M);
        if (X.totalValueType != undefined) {
            var D = B.createElement("totalValueType");
            D.textContent = X.totalValueType;
            K.appendChild(D)
        }
    }
    if (X.color != undefined) {
        var k = B.createElement("color");
        k.textContent = X.color;
        K.appendChild(k)
    }
    if (X.opacity != undefined) {
        var C = B.createElement("opacity");
        C.textContent = X.opacity;
        K.appendChild(C)
    }
    if (X.color1 != undefined) {
        var L = B.createElement("color1");
        L.textContent = X.color1;
        K.appendChild(L)
    }
    if (X.barMaxWidth != undefined) {
        var S = B.createElement("barMaxWidth");
        S.textContent = X.barMaxWidth;
        K.appendChild(S)
    }
    if (X.sunburstRadio != undefined) {
        var a = B.createElement("sunburstRadio");
        a.textContent = X.sunburstRadio;
        K.appendChild(a)
    }
    if (X.centerX != undefined) {
        var d = B.createElement("centerX");
        d.textContent = X.centerX;
        K.appendChild(d)
    }
    if (X.centerY != undefined) {
        var j = B.createElement("centerY");
        j.textContent = X.centerY;
        K.appendChild(j)
    }
    if (X.radius != undefined) {
        var l = B.createElement("radius");
        l.textContent = X.radius;
        K.appendChild(l)
    }
    if (X.xyName != undefined) {
        var N = B.createElement("xyName");
        N.textContent = X.xyName;
        K.appendChild(N);
        if (X.xyNameValueType != undefined) {
            var A = B.createElement("xyNameValueType");
            A.textContent = X.xyNameValueType;
            K.appendChild(A)
        }
    }
    if (X.xColumn != undefined) {
        var H = B.createElement("xColumn");
        H.textContent = X.xColumn;
        K.appendChild(H);
        if (X.xColumnValueType != undefined) {
            var P = B.createElement("xColumnValueType");
            P.textContent = X.xColumnValueType;
            K.appendChild(P)
        }
    }
    if (X.yColumn != undefined) {
        var o = B.createElement("yColumn");
        o.textContent = X.yColumn;
        K.appendChild(o);
        if (X.yColumnValueType != undefined) {
            var Q = B.createElement("yColumnValueType");
            Q.textContent = X.yColumnValueType;
            K.appendChild(Q)
        }
    }
    if (X.startDate != undefined) {
        var G = B.createElement("startDate");
        G.textContent = X.startDate;
        K.appendChild(G);
        if (X.startDateValueType != undefined) {
            var T = B.createElement("startDateValueType");
            T.textContent = X.startDateValueType;
            K.appendChild(T)
        }
    }
    if (X.endDate != undefined) {
        var J = B.createElement("endDate");
        J.textContent = X.endDate;
        K.appendChild(J);
        if (X.endDateValueType != undefined) {
            var e = B.createElement("endDateValueType");
            e.textContent = X.endDateValueType;
            K.appendChild(e)
        }
    }
    if (X.id != undefined) {
        var p = B.createElement("id");
        p.textContent = X.id;
        K.appendChild(p);
        if (X.idValueType != undefined) {
            var h = B.createElement("idValueType");
            h.textContent = X.idValueType;
            K.appendChild(h)
        }
    }
    if (X.pId != undefined) {
        var Z = B.createElement("pId");
        Z.textContent = X.pId;
        K.appendChild(Z);
        if (X.pIdValueType != undefined) {
            var V = B.createElement("pIdValueType");
            V.textContent = X.pIdValueType;
            K.appendChild(V)
        }
    }
    if (X.yAxisIndex != undefined && X.yAxisIndex > 0) {
        var U = B.createElement("yAxisIndex");
        U.textContent = X.yAxisIndex;
        K.appendChild(U)
    }
    if (X.unitName != undefined) {
        var i = B.createElement("unitName");
        i.textContent = X.unitName;
        K.appendChild(i)
    }
    if (X.sizeName != undefined) {
        var f = B.createElement("sizeName");
        f.textContent = X.sizeName;
        K.appendChild(f)
    }
    if (X.shadowBlur != undefined && X.shadowBlur > 0) {
        var I = B.createElement("shadowBlur");
        I.textContent = X.shadowBlur;
        K.appendChild(I)
    }
    if (X.shadowColor != undefined) {
        var c = B.createElement("shadowColor");
        c.textContent = X.shadowColor;
        K.appendChild(c)
    }
    if (X.shadowOpacity != undefined && X.shadowOpacity > 0) {
        var b = B.createElement("shadowOpacity");
        b.textContent = X.shadowOpacity;
        K.appendChild(b)
    }
    if (X.label != undefined) {
        var m = this.createLabelNode(X.label, B);
        if (m.childNodes.length > 0) {
            K.appendChild(m)
        }
    }
    if (X.marklines != undefined) {
        var O = this.createMarkLinkesNode(X.marklines, B);
        if (O.childNodes.length > 0) {
            K.appendChild(O)
        }
    }
    return K
};
RptXml.prototype.createMarkLinkesNode = function (F, D) {
    var B = D.createElement("marklines");
    for (var G = 0; G < F.length; G++) {
        var K = F[G];
        var E = D.createElement("markline");
        if (K.valueType != undefined) {
            var A = D.createElement("valueType");
            A.textContent = K.valueType;
            E.appendChild(A)
        }
        if (K.value != undefined) {
            var C = D.createElement("value");
            C.textContent = K.value;
            E.appendChild(C)
        }
        if (K.color != undefined) {
            var L = D.createElement("color");
            L.textContent = K.color;
            E.appendChild(L)
        }
        if (K.width != undefined) {
            var I = D.createElement("width");
            I.textContent = K.width;
            E.appendChild(I)
        }
        if (K.lineStyle != undefined) {
            var J = D.createElement("lineStyle");
            J.textContent = K.lineStyle;
            E.appendChild(J)
        }
        if (K.name != undefined) {
            var H = D.createElement("name");
            H.textContent = K.name;
            E.appendChild(H)
        }
        B.appendChild(E)
    }
    return B
};
RptXml.prototype.createLabelNode = function (H, C) {
    var F = C.createElement("label");
    if ((H.enabled != undefined && H.defaultEnabled != undefined) && (H.enabled != H.defaultEnabled)) {
        var B = C.createElement("enabled");
        B.textContent = H.enabled;
        F.appendChild(B)
    }
    if (H.nameEnabled != undefined) {
        var G = C.createElement("nameEnabled");
        G.textContent = H.nameEnabled;
        F.appendChild(G)
    }
    if (H.align != undefined) {
        var J = C.createElement("align");
        J.textContent = H.align;
        F.appendChild(J)
    }
    if (H.rotation != undefined) {
        var A = C.createElement("rotation");
        A.textContent = H.rotation;
        F.appendChild(A)
    }
    if (H.format != undefined && H.format != "0") {
        var I = C.createElement("format");
        I.textContent = H.format;
        F.appendChild(I)
    }
    if (H.position != undefined) {
        var D = C.createElement("position");
        D.textContent = H.position;
        F.appendChild(D)
    }
    if (H.position != undefined) {
        var D = C.createElement("position");
        D.textContent = H.position;
        F.appendChild(D)
    }
    if (H.textStyle != undefined) {
        var E = this.createTextStyle(H.textStyle, C);
        if (E.childNodes.length > 0) {
            F.appendChild(E)
        }
    }
    return F
};
RptXml.prototype.createTitleNode = function (J, F) {
    var D = F.createElement("title");
    if (J.enabled != undefined && !J.enabled) {
        var E = F.createElement("enabled");
        E.textContent = J.enabled;
        D.appendChild(E)
    }
    if (J.text != undefined && J.text != "") {
        var I = F.createElement("text");
        I.textContent = J.text;
        D.appendChild(I);
        if (J.textValueType != undefined) {
            var L = F.createElement("textValueType");
            L.textContent = J.textValueType;
            D.appendChild(L)
        }
    }
    if (J.align != undefined) {
        var M = F.createElement("align");
        M.textContent = J.align;
        D.appendChild(M)
    }
    if (J.borderWidth != undefined && J.borderWidth > 0) {
        var B = F.createElement("borderWidth");
        B.textContent = J.borderWidth;
        D.appendChild(B)
    }
    if (J.borderColor != undefined) {
        var A = F.createElement("borderColor");
        A.textContent = J.borderColor;
        D.appendChild(A)
    }
    if (J.backgroundColor != undefined && J.backgroundColor != "#ffffff") {
        var K = F.createElement("backgroundColor");
        K.textContent = J.backgroundColor;
        D.appendChild(K)
    }
    if (J.margin != undefined) {
        var H = F.createElement("margin");
        H.textContent = J.margin;
        D.appendChild(H)
    }
    if (J.rotation != undefined) {
        var C = F.createElement("rotation");
        C.textContent = J.rotation;
        D.appendChild(C)
    }
    if (J.textStyle != undefined) {
        var G = this.createTextStyle(J.textStyle, F);
        if (G.childNodes.length > 0) {
            D.appendChild(G)
        }
    }
    return D
};
RptXml.prototype.createValueLineNode = function (F, G) {
    var E = G.createElement("valueLine");
    if (F.value != undefined) {
        var H = G.createElement("value");
        H.textContent = F.value;
        E.appendChild(H)
    }
    if (F.name != undefined) {
        var D = G.createElement("name");
        D.textContent = F.name;
        E.appendChild(D)
    }
    if (F.lineColor != undefined) {
        var A = G.createElement("lineColor");
        A.textContent = F.lineColor;
        E.appendChild(A)
    }
    if (F.lineWidth != undefined) {
        var C = G.createElement("lineWidth");
        C.textContent = F.lineWidth;
        E.appendChild(C)
    }
    if (F.lineStyle != undefined) {
        var B = G.createElement("lineStyle");
        B.textContent = F.lineStyle;
        E.appendChild(B)
    }
    return E
};
RptXml.prototype.createAxisNode = function (F, D, a) {
    var G = a.createElement(D);
    if (F.type != undefined) {
        var Y = a.createElement("type");
        Y.textContent = F.type;
        G.appendChild(Y)
    }
    if (F.axisEnabled != undefined) {
        var H = a.createElement("axisEnabled");
        H.textContent = F.axisEnabled;
        G.appendChild(H)
    }
    if (F.max != undefined) {
        var e = a.createElement("max");
        e.textContent = F.max;
        G.appendChild(e)
    }
    if (F.min != undefined) {
        var J = a.createElement("min");
        J.textContent = F.min;
        G.appendChild(J)
    }
    if (F.step != undefined) {
        var X = a.createElement("step");
        X.textContent = F.step;
        G.appendChild(X)
    }
    if (F.format != undefined && F.type == "datetime") {
        var O = a.createElement("format");
        O.textContent = F.format;
        G.appendChild(O)
    }
    if (F.startTime != undefined && F.type == "datetime") {
        var W = a.createElement("startTime");
        W.textContent = F.startTime;
        G.appendChild(W)
    }
    if (F.endTime != undefined && F.type == "datetime") {
        var K = a.createElement("endTime");
        K.textContent = F.endTime;
        G.appendChild(K)
    }
    if (F.timeTnterval != undefined && F.timeTnterval > 0 && F.type == "datetime") {
        var P = a.createElement("timeTnterval");
        P.textContent = F.timeTnterval;
        G.appendChild(P)
    }
    if (F.intervalUnit != undefined && F.type == "datetime") {
        var U = a.createElement("intervalUnit");
        U.textContent = F.intervalUnit;
        G.appendChild(U)
    }
    if (F.timeSpan != undefined && F.timeSpan > 0 && F.type == "datetime") {
        var S = a.createElement("timeSpan");
        S.textContent = F.timeSpan;
        G.appendChild(S)
    }
    if (F.timeSpanFormat != undefined && F.type == "datetime") {
        var c = a.createElement("timeSpanFormat");
        c.textContent = F.timeSpanFormat;
        G.appendChild(c)
    }
    if (F.lineColor != undefined) {
        var A = a.createElement("lineColor");
        A.textContent = F.lineColor;
        G.appendChild(A)
    }
    if (F.lineWidth != undefined) {
        var L = a.createElement("lineWidth");
        L.textContent = F.lineWidth;
        G.appendChild(L)
    }
    if (F.tickColor != undefined) {
        var C = a.createElement("tickColor");
        C.textContent = F.tickColor;
        G.appendChild(C)
    }
    if (F.tickLength != undefined) {
        var Z = a.createElement("tickLength");
        Z.textContent = F.tickLength;
        G.appendChild(Z)
    }
    if (F.tickWidth != undefined) {
        var N = a.createElement("tickWidth");
        N.textContent = F.tickWidth;
        G.appendChild(N)
    }
    if (F.tickGap != undefined) {
        var b = a.createElement("tickGap");
        b.textContent = F.tickGap;
        G.appendChild(b)
    }
    if (F.splitLineEnabled != undefined) {
        var d = a.createElement("splitLineEnabled");
        d.textContent = F.splitLineEnabled;
        G.appendChild(d)
    }
    if (F.splitLineType != undefined) {
        var M = a.createElement("splitLineType");
        M.textContent = F.splitLineType;
        G.appendChild(M)
    }
    if (F.splitLineColor != undefined) {
        var B = a.createElement("splitLineColor");
        B.textContent = F.splitLineColor;
        G.appendChild(B)
    }
    if (F.splitLineWidth != undefined) {
        var f = a.createElement("splitLineWidth");
        f.textContent = F.splitLineWidth;
        G.appendChild(f)
    }
    if (F.offsetLeft != undefined) {
        var E = a.createElement("offsetLeft");
        E.textContent = F.offsetLeft;
        G.appendChild(E)
    }
    if (F.dataZoomEnabled) {
        var Q = a.createElement("dataZoomEnabled");
        Q.textContent = F.dataZoomEnabled;
        G.appendChild(Q)
    }
    if (F.zoomStart != undefined) {
        var T = a.createElement("zoomStart");
        T.textContent = F.zoomStart;
        G.appendChild(T)
    }
    if (F.zoomEnd != undefined) {
        var I = a.createElement("zoomEnd");
        I.textContent = F.zoomEnd;
        G.appendChild(I)
    }
    if (F.title) {
        var V = this.createTitleNode(F.title, a);
        if (V.childNodes.length > 0) {
            G.appendChild(V)
        }
    }
    if (F.label) {
        var R = this.createLabelNode(F.label, a);
        if (R.childNodes.length > 0) {
            G.appendChild(R)
        }
    }
    return G
};
RptXml.prototype.createImageCellXmlNode = function (B, E) {
    var J = E.createElement("imagecell");
    var C = $(B.o);
    var K = C.width();
    if (K < 0) {
        K = C.children("div").width()
    }
    if (K > 0) {
        J.setAttribute("w", Math.round(K))
    }
    var G = C.height();
    if (G < 0) {
        G = C.children("div").height()
    }
    if (G > 0) {
        J.setAttribute("h", Math.round(G))
    }
    J.setAttribute("rowNum", B.rowNum - 1);
    J.setAttribute("colNum", B.colNum - 1);
    J.setAttribute("rowSpan", B.rowSpan);
    J.setAttribute("colSpan", B.colSpan);
    var I = B.content;
    if (I.disType != undefined) {
        var F = E.createElement("disType");
        F.textContent = I.disType;
        J.appendChild(F)
    }
    if (I.printerFlag != undefined) {
        var L = E.createElement("printerFlag");
        L.textContent = I.printerFlag;
        J.appendChild(L)
    }
    if (I.fileOutFlag != undefined) {
        var D = E.createElement("fileOutFlag");
        D.textContent = I.fileOutFlag;
        J.appendChild(D)
    }
    this.createCellStyle(B, J, E);
    this.setBorderStyle(J, B, E);
    this.setCellLinked(J, B.content, E);
    var H = B.content;
    if (H.imageUrl) {
        var A = E.createElement("imageUrl");
        A.textContent = H.imageUrl;
        J.appendChild(A)
    }
    return J
};
RptXml.prototype.createSubReportCellXmlNode = function (C, G) {
    var P = G.createElement("subreportcell");
    var J = C.content;
    var E = $(C.o);
    var M = E.width();
    if (M < 0) {
        M = E.children("div").width()
    }
    if (M > 0) {
        P.setAttribute("w", Math.round(M))
    }
    var I = E.height();
    if (I < 0) {
        I = E.children("div").height()
    }
    if (I > 0) {
        P.setAttribute("h", Math.round(I))
    }
    P.setAttribute("w", Math.round(E.width()));
    P.setAttribute("h", Math.round(E.height()));
    P.setAttribute("rowNum", C.rowNum - 1);
    P.setAttribute("colNum", C.colNum - 1);
    P.setAttribute("rowSpan", C.rowSpan);
    P.setAttribute("colSpan", C.colSpan);
    var K = C.content;
    if (K.disType != undefined) {
        var H = G.createElement("disType");
        H.textContent = K.disType;
        P.appendChild(H)
    }
    if (K.printerFlag != undefined) {
        var O = G.createElement("printerFlag");
        O.textContent = K.printerFlag;
        P.appendChild(O)
    }
    if (K.fileOutFlag != undefined) {
        var F = G.createElement("fileOutFlag");
        F.textContent = K.fileOutFlag;
        P.appendChild(F)
    }
    if (K.asyncData != undefined) {
        var B = this.createAsyncData(K.asyncData, G);
        P.appendChild(B)
    }
    this.createCellStyle(C, P, G);
    this.setBorderStyle(P, C, G);
    if (J.rptId) {
        var D = G.createElement("rptId");
        D.textContent = J.rptId;
        P.appendChild(D)
    }
    var A = J.argValueMap;
    if (A) {
        for (var N in A) {
            var L = G.createElement("param");
            L.setAttribute("argName", N);
            L.setAttribute("argValue", A[N]);
            P.appendChild(L)
        }
    }
    return P
};
RptXml.prototype.createTableCellXmlNode = function (U, C) {
    var j = C.createElement("tablecell");
    var f = U.content.grid;
    var d = f.getMaxMinCellNum();
    var K = d[0];
    var B = d[1];
    var F = $(U.o);
    var Y = F.width();
    if (Y < 0) {
        Y = F.children("div").width()
    }
    if (Y > 0) {
        j.setAttribute("w", Math.round(Y))
    }
    var h = F.height();
    if (h < 0) {
        h = F.children("div").height()
    }
    if (h > 0) {
        j.setAttribute("h", Math.round(h))
    }
    j.setAttribute("rowNum", U.rowNum - 1);
    j.setAttribute("colNum", U.colNum - 1);
    j.setAttribute("rowSpan", U.rowSpan);
    j.setAttribute("colSpan", U.colSpan);
    var I = U.content;
    if (I.disType != undefined) {
        var k = C.createElement("disType");
        k.textContent = I.disType;
        j.appendChild(k)
    }
    if (I.printerFlag != undefined) {
        var a = C.createElement("printerFlag");
        a.textContent = I.printerFlag;
        j.appendChild(a)
    }
    if (I.fileOutFlag != undefined) {
        var O = C.createElement("fileOutFlag");
        O.textContent = I.fileOutFlag;
        j.appendChild(O)
    }
    if (I.relative != undefined) {
        var M = C.createElement("relative");
        M.textContent = I.relative;
        j.appendChild(M)
    }
    if (I.tableBackground != undefined) {
        var H = C.createElement("tableBackground");
        H.textContent = I.tableBackground;
        j.appendChild(H)
    }
    if (I.tableOpacity != undefined) {
        var W = C.createElement("tableOpacity");
        W.textContent = I.tableOpacity;
        j.appendChild(W)
    }
    if (I.asyncData != undefined) {
        var G = this.createAsyncData(I.asyncData, C);
        j.appendChild(G)
    }
    this.createCellStyle(U, j, C);
    this.setBorderStyle(j, U, C);
    if (I.userPanel != undefined && I.userPanel == 1) {
        var Q = C.createElement("panel");
        if (I.userPanel != undefined) {
            var X = C.createElement("userPanel");
            X.textContent = I.userPanel;
            Q.appendChild(X)
        }
        if (I.title != undefined) {
            var R = C.createElement("title");
            R.textContent = I.title;
            Q.appendChild(R)
        }
        if (I.titleColor != undefined) {
            var e = C.createElement("titleColor");
            e.textContent = I.titleColor;
            Q.appendChild(e)
        }
        if (I.titleFontWeight != undefined) {
            var V = C.createElement("titleFontWeight");
            V.textContent = I.titleFontWeight;
            Q.appendChild(V)
        }
        if (I.titleFontStyle != undefined) {
            var D = C.createElement("titleFontStyle");
            D.textContent = I.titleFontStyle;
            Q.appendChild(D)
        }
        if (I.titleFontSize != undefined) {
            var c = C.createElement("titleFontSize");
            c.textContent = I.titleFontSize;
            Q.appendChild(c)
        }
        if (I.titleHeight != undefined) {
            var l = C.createElement("titleHeight");
            l.textContent = I.titleHeight;
            Q.appendChild(l)
        }
        if (I.panelBorderColor != undefined) {
            var A = C.createElement("panelBorderColor");
            A.textContent = I.panelBorderColor;
            Q.appendChild(A)
        }
        if (I.panelBorderWidth != undefined) {
            var P = C.createElement("panelBorderWidth");
            P.textContent = I.panelBorderWidth;
            Q.appendChild(P)
        }
        if (I.panelBorderRadius != undefined) {
            var J = C.createElement("panelBorderRadius");
            J.textContent = I.panelBorderRadius;
            Q.appendChild(J)
        }
        if (I.titleBottomBorderWidth != undefined) {
            var T = C.createElement("titleBottomBorderWidth");
            T.textContent = I.titleBottomBorderWidth;
            Q.appendChild(T)
        }
        if (I.panelBackground != undefined) {
            var i = C.createElement("panelBackground");
            i.textContent = I.panelBackground;
            Q.appendChild(i)
        }
        j.appendChild(Q)
    }
    var Z = new Report();
    f.setReportType(K, B, Z);
    var L = C.createElement("report");
    var N = C.createElement("reportType");
    N.textContent = Z.rptType != undefined ? Z.rptType : 1;
    L.appendChild(N);
    if (I.reportView) {
        var S = this.createReportViewXmlNode(I.reportView, C);
        if (S.childNodes.length > 0) {
            L.appendChild(S)
        }
    }
    var b = C.createElement("canvas");
    b.appendChild(this.createColumns(K, B, f, C));
    b.appendChild(this.createRows(K, B, f, C));
    L.appendChild(b);
    var E = this.createCellsNode(K, B, f, C);
    if (E.childNodes.length > 0) {
        L.appendChild(E)
    }
    j.appendChild(L);
    return j
};
RptXml.prototype.createPanelCellXmlNode = function (b, W) {
    var T = W.createElement("panelcell");
    T.setAttribute("rowNum", b.rowNum - 1);
    T.setAttribute("colNum", b.colNum - 1);
    T.setAttribute("rowSpan", b.rowSpan);
    T.setAttribute("colSpan", b.colSpan);
    var V = b.content;
    if (V.disType != undefined) {
        var H = W.createElement("disType");
        H.textContent = V.disType;
        T.appendChild(H)
    }
    if (V.printerFlag != undefined) {
        var a = W.createElement("printerFlag");
        a.textContent = V.printerFlag;
        T.appendChild(a)
    }
    if (V.fileOutFlag != undefined) {
        var D = W.createElement("fileOutFlag");
        D.textContent = V.fileOutFlag;
        T.appendChild(D)
    }
    if (V.asyncData != undefined) {
        var Y = this.createAsyncData(V.asyncData, W);
        T.appendChild(Y)
    }
    var L = $(b.o);
    var K = W.createElement("w");
    K.textContent = Math.round(L.width());
    T.appendChild(K);
    var B = W.createElement("h");
    B.textContent = Math.round(L.height());
    T.appendChild(B);
    this.createCellStyle(b, T, W);
    this.setBorderStyle(T, b, W);
    this.setCellLinked(T, b.content, W);
    this.setLinkage(T, b.content, W);
    var C = W.createElement("panel");
    var P = V.cellPanel;
    if (P.mark == 3) {
        C.appendChild(this.createChartXmlNode(P.chartCell, W))
    }
    if (P.mark == 6) {
        var F = P.subReport;
        var O = W.createElement("report");
        var U = W.createElement("rptId");
        U.textContent = F.rptId;
        O.appendChild(U);
        var I = F.argValueMap;
        if (I) {
            for (var d in I) {
                var c = W.createElement("param");
                c.setAttribute("argName", d);
                c.setAttribute("argValue", I[d]);
                O.appendChild(c)
            }
        }
        C.appendChild(O)
    }
    if (V.title != undefined) {
        var S = W.createElement("title");
        S.textContent = V.title;
        C.appendChild(S)
    }
    if (V.titleColor != undefined) {
        var X = W.createElement("titleColor");
        X.textContent = V.titleColor;
        C.appendChild(X)
    }
    if (V.titleFontWeight != undefined) {
        var N = W.createElement("titleFontWeight");
        N.textContent = V.titleFontWeight;
        C.appendChild(N)
    }
    if (V.titleFontStyle != undefined) {
        var E = W.createElement("titleFontStyle");
        E.textContent = V.titleFontStyle;
        C.appendChild(E)
    }
    if (V.titleFontSize != undefined) {
        var J = W.createElement("titleFontSize");
        J.textContent = V.titleFontSize;
        C.appendChild(J)
    }
    if (V.titleHeight != undefined) {
        var R = W.createElement("titleHeight");
        R.textContent = V.titleHeight;
        C.appendChild(R)
    }
    if (V.panelBorderColor != undefined) {
        var Q = W.createElement("panelBorderColor");
        Q.textContent = V.panelBorderColor;
        C.appendChild(Q)
    }
    if (V.panelBorderWidth != undefined) {
        var G = W.createElement("panelBorderWidth");
        G.textContent = V.panelBorderWidth;
        C.appendChild(G)
    }
    if (V.panelBorderRadius != undefined) {
        var A = W.createElement("panelBorderRadius");
        A.textContent = V.panelBorderRadius;
        C.appendChild(A)
    }
    if (V.titleBottomBorderWidth != undefined) {
        var Z = W.createElement("titleBottomBorderWidth");
        Z.textContent = V.titleBottomBorderWidth;
        C.appendChild(Z)
    }
    if (V.panelBackground != undefined) {
        var M = W.createElement("panelBackground");
        M.textContent = V.panelBackground;
        C.appendChild(M)
    }
    T.appendChild(C);
    return T
};
RptXml.prototype.createMapAttrNode = function (g, F) {
    var K = F.createElement("map");
    if (g.areaLabelEnable != undefined) {
        var t = F.createElement("areaLabelEnable");
        t.textContent = g.areaLabelEnable;
        K.appendChild(t)
    }
    if (g.textStyle != undefined) {
        var f = this.createTextStyle(g.textStyle, F);
        if (f.childNodes.length > 0) {
            K.appendChild(f)
        }
    }
    if (g.areaColor != undefined) {
        var o = F.createElement("areaColor");
        o.textContent = g.areaColor;
        K.appendChild(o)
    }
    if (g.areaLineWidth != undefined) {
        var r = F.createElement("areaLineWidth");
        r.textContent = g.areaLineWidth;
        K.appendChild(r)
    }
    if (g.areaLineColor != undefined) {
        var d = F.createElement("areaLineColor");
        d.textContent = g.areaLineColor;
        K.appendChild(d)
    }
    if (g.visualEnabled != undefined) {
        var R = F.createElement("visualEnabled");
        R.textContent = g.visualEnabled;
        K.appendChild(R)
    }
    if (g.visualStartColor != undefined) {
        var Y = F.createElement("visualStartColor");
        Y.textContent = g.visualStartColor;
        K.appendChild(Y)
    }
    if (g.visualMidColor != undefined) {
        var N = F.createElement("visualMidColor");
        N.textContent = g.visualMidColor;
        K.appendChild(N)
    }
    if (g.visualEndColor != undefined) {
        var B = F.createElement("visualEndColor");
        B.textContent = g.visualEndColor;
        K.appendChild(B)
    }
    if (g.orient != undefined) {
        var k = F.createElement("orient");
        k.textContent = g.orient;
        K.appendChild(k)
    }
    if (g.left != undefined) {
        var H = F.createElement("left");
        H.textContent = g.left;
        K.appendChild(H)
    }
    if (g.top != undefined) {
        var b = F.createElement("top");
        b.textContent = g.top;
        K.appendChild(b)
    }
    if (g.zoom != undefined) {
        var q = F.createElement("zoom");
        q.textContent = g.zoom;
        K.appendChild(q)
    }
    if (g.pos != undefined) {
        var h = F.createElement("pos");
        h.textContent = g.pos;
        K.appendChild(h)
    }
    if (g.key != undefined) {
        var p = F.createElement("key");
        p.textContent = g.key;
        K.appendChild(p)
    }
    if (g.waterColor != undefined) {
        var J = F.createElement("waterColor");
        J.textContent = g.waterColor;
        K.appendChild(J)
    }
    if (g.landColor != undefined) {
        var s = F.createElement("landColor");
        s.textContent = g.landColor;
        K.appendChild(s)
    }
    if (g.boundaryColor != undefined) {
        var G = F.createElement("boundaryColor");
        G.textContent = g.boundaryColor;
        K.appendChild(G)
    }
    if (g.boundaryFillColor != undefined) {
        var m = F.createElement("boundaryFillColor");
        m.textContent = g.boundaryFillColor;
        K.appendChild(m)
    }
    if (g.serieScatters != undefined) {
        for (var v = 0; v < g.serieScatters.length; v++) {
            var O = g.serieScatters[v];
            var X = F.createElement("serieScatter");
            if (O.size != undefined) {
                var I = F.createElement("size");
                I.textContent = O.size;
                X.appendChild(I)
            }
            if (O.type != undefined) {
                var A = F.createElement("type");
                A.textContent = O.type;
                X.appendChild(A)
            }
            if (O.sortType != undefined) {
                var C = F.createElement("sortType");
                C.textContent = O.sortType;
                X.appendChild(C)
            }
            if (O.sortNum != undefined) {
                var L = F.createElement("sortNum");
                L.textContent = O.sortNum;
                X.appendChild(L)
            }
            if (O.color != undefined) {
                var n = F.createElement("color");
                n.textContent = O.color;
                X.appendChild(n)
            }
            if (O.scatterLabel != undefined) {
                var e = O.scatterLabel;
                var u = F.createElement("label");
                if (e.nameEnabled != undefined) {
                    var V = F.createElement("nameEnabled");
                    V.textContent = e.nameEnabled;
                    u.appendChild(V)
                }
                if (e.valueEnabled != undefined) {
                    var a = F.createElement("valueEnabled");
                    a.textContent = e.valueEnabled;
                    u.appendChild(a)
                }
                if (e.sizeEnabled != undefined) {
                    var D = F.createElement("sizeEnabled");
                    D.textContent = e.sizeEnabled;
                    u.appendChild(D)
                }
                if (e.textStyle != undefined) {
                    var f = this.createTextStyle(e.textStyle, F);
                    if (f.childNodes.length > 0) {
                        u.appendChild(f)
                    }
                }
                X.appendChild(u)
            }
            K.appendChild(X)
        }
    }
    if (g.nameMap != undefined) {
        var Q = g.nameMap;
        var l = F.createElement("nameMap");
        for (var Z in Q) {
            var M = F.createElement("map");
            M.setAttribute("key", Z);
            M.setAttribute("value", Q[Z]);
            l.appendChild(M)
        }
        K.appendChild(l)
    }
    var c = g.items;
    if (c != undefined) {
        var W = F.createElement("items");
        for (var v = 0; v < c.length; v++) {
            var j = c[v];
            var T = F.createElement("item");
            T.setAttribute("pos", j.pos);
            T.setAttribute("name", j.name);
            W.appendChild(T)
        }
        K.appendChild(W)
    }
    if (g.movelines != undefined) {
        var P = g.movelines;
        var E = F.createElement("moveline");
        for (var v = 0; v < P.length; v++) {
            var S = P[v];
            var U = F.createElement("line");
            U.setAttribute("fromName", S.fromName);
            U.setAttribute("toName", S.toName);
            E.appendChild(U)
        }
        K.appendChild(E)
    }
    return K
};
RptXml.prototype.createChartThemeNode = function (F, G) {
    var H = G.createElement("chartTheme");
    if (F.name != undefined) {
        var C = G.createElement("name");
        C.textContent = F.name;
        H.appendChild(C)
    }
    if (F.colors != undefined) {
        var A = G.createElement("color");
        var B = F.colors;
        var E = "";
        for (var D = 0; D < B.length; D++) {
            E += B[D];
            if (D < B.length - 1) {
                E += ","
            }
        }
        A.textContent = E;
        H.appendChild(A)
    }
    return H
};
RptXml.prototype.createStyleMapNode = function (I, D) {
    var B = D.createElement("styleMap");
    var E = I.data;
    if (E != undefined && E.length > 0) {
        var C = D.createElement("data");
        for (var F = 0; F < E.length; F++) {
            var J = E[F];
            var A = D.createElement("item");
            A.setAttribute("key", J.key);
            A.setAttribute("data", J.data);
            C.appendChild(A)
        }
        B.appendChild(C)
    }
    var H = I.items;
    if (H != undefined) {
        var G = D.createElement("items");
        for (var F = 0; F < H.length; F++) {
            var J = H[F];
            var A = D.createElement("item");
            A.setAttribute("pos", J.pos);
            A.setAttribute("name", J.name);
            G.appendChild(A)
        }
        B.appendChild(G)
    }
    return B
};
RptXml.prototype.parse = function (J) {
    if (J == "") {
        return
    }
    if (!J.startsWith("<?xml")) {
        J = '<?xml version="1.0" encoding="UTF-8"?>' + J
    }
    var N = new Array();
    var L = new Array();
    var G = JSXML.fromString(J);
    var M = G.childNodes;
    var A = M[0];
    var O = A.childNodes;
    for (var I = 0; I < O.length; I++) {
        var D = O[I];
        if (D.nodeName == "name") {
            report.name = D.textContent
        } else {
            if (D.nodeName == "pageSize") {
                report.pageSize = this.getNodeInt(D)
            } else {
                if (D.nodeName == "exportFlag") {
                    report.exportFlag = this.getNodeInt(D)
                } else {
                    if (D.nodeName == "loadMode") {
                        report.loadMode = this.getNodeInt(D)
                    } else {
                        if (D.nodeName == "reportType") {
                            report.reportType = this.getNodeInt(D)
                        } else {
                            if (D.nodeName == "offset") {
                                report.offset = this.getNodeInt(D)
                            } else {
                                if (D.nodeName == "bgEnabled") {
                                    report.bgEnabled = this.getNodeInt(D)
                                } else {
                                    if (D.nodeName == "bgColor") {
                                        report.bgColor = D.textContent
                                    } else {
                                        if (D.nodeName == "bgImage") {
                                            report.bgImage = D.textContent
                                        } else {
                                            if (D.nodeName == "bgPrinterOut") {
                                                report.bgPrinterOut = this.getNodeInt(D)
                                            } else {
                                                if (D.nodeName == "style") {
                                                    report.style = this.parseRptStyle(D)
                                                } else {
                                                    if (D.nodeName == "relative") {
                                                        report.relative = this.getNodeInt(D)
                                                    } else {
                                                        if (D.nodeName == "developer") {
                                                            report.developer = this.parseDeveloper(D)
                                                        } else {
                                                            if (D.nodeName == "printerAttr") {
                                                                report.printerAttr = this.parsePrinterAttr(D)
                                                            } else {
                                                                if (D.nodeName == "async") {
                                                                    report.asyncData = this.parseAsync(D)
                                                                } else {
                                                                    if (D.nodeName == "extendUnits") {
                                                                        report.extendUnits = this.parseExtendUnits(D)
                                                                    } else {
                                                                        if (D.nodeName == "cells") {
                                                                            this.parseCells(D, grid)
                                                                        } else {
                                                                            if (D.nodeName == "canvas") {
                                                                                this.parseCanvas(D, grid, N, L)
                                                                            } else {
                                                                                if (D.nodeName == "datasets") {
                                                                                    this.parseDatasets(D)
                                                                                } else {
                                                                                    if (D.nodeName == "args") {
                                                                                        this.parseArgs(D)
                                                                                    } else {
                                                                                        if (D.nodeName == "view") {
                                                                                            this.parseView(D, report)
                                                                                        } else {
                                                                                            if (D.nodeName == "div") {
                                                                                                this.parseDiv(D)
                                                                                            } else {
                                                                                                if (D.nodeName == "panel") {
                                                                                                    this.parsePanel(D)
                                                                                                } else {
                                                                                                    if (D.nodeName == "chartTheme") {
                                                                                                        report.chartTheme = this.parseChartTheme(D)
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
    if (report.extendUnits) {
        grid.drawExtendUnitsBorder(report.extendUnits)
    }
    grid.resetResizable();
    argGrid.resetResizable();
    var K = grid.tb.children();
    for (var I = 1; I < K.length; I++) {
        var H = $(K[I]).children("td");
        for (var F = 1; F < H.length; F++) {
            var E = $(H[F]);
            var C = E.data("gc");
            grid.tdBorderColor(C)
        }
    }
    var K = argGrid.tb.children();
    for (var I = 1; I < K.length; I++) {
        var H = $(K[I]).children("td");
        for (var F = 1; F < H.length; F++) {
            var E = $(H[F]);
            var C = E.data("gc");
            argGrid.tdBorderColor(C)
        }
    }
    if (report.style != undefined) {
        var B = report.style;
        anyExcel.initReportStyle(B)
    }
    this.syncGridRowDivsHeight(grid, N);
    this.syncGridColDivsWidth(grid, L)
};
RptXml.prototype.syncGridRowDivsHeight = function (A, C) {
    if (C == null) {
        return
    }
    for (var B = 0; B < C.length; B++) {
        var D = A.getGridCell(B, -1, 1, 1);
        var E = $(D.o);
        A.syncGridRowDivs(E, C[B])
    }
    A.syncGrids()
};
RptXml.prototype.syncGridColDivsWidth = function (B, A) {
    if (A == null) {
        return
    }
    for (var C = 0; C < A.length; C++) {
        var D = B.getGridCell(-1, C, 1, 1);
        var E = $(D.o);
        B.syncGridColDivs(E, A[C])
    }
    B.syncGrids()
};
RptXml.prototype.parseRptStyle = function (E) {
    var D = {};
    var A = E.childNodes;
    for (var C = 0; C < A.length; C++) {
        var B = A[C];
        var F = B.nodeName;
        if (F == "tgBackground") {
            D.tgBackground = B.textContent
        } else {
            if (F == "tgType") {
                D.tgType = this.getNodeInt(B)
            }
        }
    }
    return D
};
RptXml.prototype.parsePrinterAttr = function (D) {
    var E = {};
    var A = D.childNodes;
    for (var C = 0; C < A.length; C++) {
        var B = A[C];
        var F = B.nodeName;
        if (F == "zoom") {
            E.zoom = this.getNodeNumber(B)
        } else {
            if (F == "hTOut") {
                E.hTOut = this.getNodeInt(B)
            } else {
                if (F == "num") {
                    E.num = this.getNodeInt(B)
                } else {
                    if (F == "area") {
                        E.area = B.textContent
                    } else {
                        if (F == "rotate") {
                            E.rotate = this.getNodeInt(B)
                        } else {
                            if (F == "marginLeft") {
                                E.marginLeft = this.getNodeNumber(B)
                            } else {
                                if (F == "marginTop") {
                                    E.marginTop = this.getNodeNumber(B)
                                } else {
                                    if (F == "marginRight") {
                                        E.marginRight = this.getNodeNumber(B)
                                    } else {
                                        if (F == "marginBottom") {
                                            E.marginBottom = this.getNodeNumber(B)
                                        } else {
                                            if (F == "cellBgOut") {
                                                E.cellBgOut = this.getNodeInt(B)
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
    return E
};
RptXml.prototype.parseDeveloper = function (G) {
    var E = {};
    var F = new Array();
    var A = G.childNodes;
    for (var D = 0; D < A.length; D++) {
        var C = A[D];
        var H = C.nodeName;
        if (H == "jsCode") {
            E.jsCode = C.textContent
        } else {
            if (H == "cssCode") {
                E.cssCode = C.textContent
            } else {
                if (H == "file") {
                    var B = {};
                    B.jslib = C.getAttribute("jslib");
                    B.jsPath = C.getAttribute("jsPath");
                    F.push(B)
                }
            }
        }
    }
    if (F.length > 0) {
        E.files = F
    }
    return E
};
RptXml.prototype.parseShareDataSet = function (D) {
    var E = JSXML.fromString(D);
    var C = E.childNodes;
    var B = C[0];
    var A = B.childNodes[0];
    return this.parseDataset(A)
};
RptXml.prototype.parseTemplateArg = function (C) {
    var D = JSXML.fromString(C);
    var A = D.childNodes;
    var B = A[0];
    if (B.childNodes.length > 0) {
        this.parseArgs(B.childNodes[0])
    }
};
RptXml.prototype.parseDatasets = function (C) {
    var F = C.childNodes;
    var D = {};
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        if (A.nodeName == "dataset") {
            var E = this.parseDataset(A);
            D[E.name] = E
        }
    }
    report.ds = D;
    anyExcel.initLeftDatasetTree()
};
RptXml.prototype.parseDataset = function (Q) {
    var P = {};
    var O = Q.childNodes;
    for (var S = 0; S < O.length; S++) {
        var G = O[S];
        var A = G.nodeName;
        if (A == "name") {
            P.name = G.textContent
        } else {
            if (A == "source") {
                P.sourceName = G.textContent
            } else {
                if (A == "sql") {
                    P.sql = G.textContent
                } else {
                    if (A == "pageSize") {
                        P.pageSize = this.getNodeInt(G)
                    } else {
                        if (A == "type") {
                            P.type = this.getNodeInt(G)
                        } else {
                            if (A == "parser") {
                                P.parser = this.getNodeInt(G)
                            } else {
                                if (A == "startRow") {
                                    P.startRow = this.getNodeInt(G)
                                } else {
                                    if (A == "files") {
                                        P.files = this.parseDatasetFiles(G)
                                    } else {
                                        if (A == "url") {
                                            P.url = G.textContent
                                        } else {
                                            if (A == "reqMethod") {
                                                P.reqMethod = this.getNodeInt(G)
                                            } else {
                                                if (A == "returnMethod") {
                                                    P.returnMethod = this.getNodeInt(G)
                                                } else {
                                                    if (A == "readTimeout") {
                                                        P.readTimeout = this.getNodeInt(G)
                                                    } else {
                                                        if (A == "connectTimeout") {
                                                            P.connectTimeout = this.getNodeInt(G)
                                                        } else {
                                                            if (A == "className") {
                                                                P.className = G.textContent
                                                            } else {
                                                                if (A == "columns") {
                                                                    var J = G.childNodes;
                                                                    var C = new Array();
                                                                    for (var R = 0; R < J.length; R++) {
                                                                        var V = J[R];
                                                                        if (V.hasAttribute("type")) {
                                                                            var F = {};
                                                                            F.name = V.textContent;
                                                                            F.type = V.getAttribute("type");
                                                                            if (V.hasAttribute("dateFormat")) {
                                                                                F.dateFormat = V.getAttribute("dateFormat")
                                                                            }
                                                                            C.push(F)
                                                                        } else {
                                                                            C.push(V.textContent)
                                                                        }
                                                                    }
                                                                    P.columns = C
                                                                } else {
                                                                    if (A == "datas") {
                                                                        var N = G.childNodes;
                                                                        var U = new Array();
                                                                        for (var R = 0; R < N.length; R++) {
                                                                            var D = N[R];
                                                                            var W = D.childNodes;
                                                                            var M = new Array();
                                                                            for (var T = 0; T < W.length; T++) {
                                                                                var L = W[T];
                                                                                M.push(L.textContent)
                                                                            }
                                                                            U.push(M)
                                                                        }
                                                                        P.datas = U
                                                                    } else {
                                                                        if (A == "args") {
                                                                            var B = G.childNodes;
                                                                            var E = new Array();
                                                                            for (var R = 0; R < B.length; R++) {
                                                                                var K = {};
                                                                                var H = B[R];
                                                                                var I = H.childNodes;
                                                                                for (var T = 0; T < I.length; T++) {
                                                                                    var X = I[T];
                                                                                    if (X.nodeName == "name") {
                                                                                        K.name = X.textContent
                                                                                    } else {
                                                                                        if (X.nodeName == "dataType") {
                                                                                            K.dataType = this.getNodeInt(X)
                                                                                        } else {
                                                                                            if (X.nodeName == "value") {
                                                                                                K.value = X.textContent
                                                                                            } else {
                                                                                                if (X.nodeName == "modelType") {
                                                                                                    K.modelType = X.textContent
                                                                                                } else {
                                                                                                    if (X.nodeName == "dateFormat") {
                                                                                                        K.dateFormat = X.textContent
                                                                                                    } else {
                                                                                                        if (X.nodeName == "defaultValueType") {
                                                                                                            K.defaultValueType = this.getNodeInt(X)
                                                                                                        } else {
                                                                                                            if (X.nodeName == "defaultValue") {
                                                                                                                K.defaultValue = X.textContent
                                                                                                            } else {
                                                                                                                if (X.nodeName == "dsDefaultValue") {
                                                                                                                    K.dsDefaultValue = X.textContent
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                                E.push(K)
                                                                            }
                                                                            P.args = E
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
    return P
};
RptXml.prototype.parseDatasetFiles = function (B) {
    var A = new Array();
    var K = B.childNodes;
    for (var G = 0; G < K.length; G++) {
        var I = K[G];
        var D = I.nodeName;
        if (D == "file") {
            var C = {};
            var H = I.childNodes;
            for (var E = 0; E < H.length; E++) {
                var J = H[E];
                var F = J.nodeName;
                if (F == "name") {
                    C.name = J.textContent
                } else {
                    if (F == "filePath") {
                        C.filePath = J.textContent
                    } else {
                        if (F == "fileTime") {
                            C.fileTime = J.textContent
                        }
                    }
                }
            }
            A.push(C)
        }
    }
    return A
};
RptXml.prototype.parseAsync = function (B) {
    var D = {};
    var F = B.childNodes;
    for (var A = 0; A < F.length; A++) {
        var C = F[A];
        var E = C.nodeName;
        if (E == "usable") {
            D.usable = this.getNodeInt(C)
        } else {
            if (E == "interval") {
                D.interval = this.getNodeInt(C)
            } else {
                if (E == "timeType") {
                    D.timeType = this.getNodeInt(C)
                }
            }
        }
    }
    return D
};
RptXml.prototype.parseExtendUnits = function (B) {
    var G = new Array();
    var F = B.childNodes;
    for (var E = 0; E < F.length; E++) {
        var H = {};
        var J = F[E];
        if (J.nodeName == "#text") {
            continue
        }
        var D = J.childNodes;
        for (var C = 0; C < D.length; C++) {
            var A = D[C];
            var I = A.nodeName;
            if (I == "sourceRowCol") {
                H.sourceRowCol = A.textContent
            } else {
                if (I == "destRowCol") {
                    H.destRowCol = A.textContent
                }
            }
        }
        G.push(H)
    }
    return G
};
RptXml.prototype.parseCells = function (E, D) {
    var B = E.childNodes;
    for (var C = 0; C < B.length; C++) {
        var A = B[C];
        if (A.nodeName == "htmlcell") {
            this.parseHtmlCell(A, D)
        } else {
            if (A.nodeName == "columncell") {
                this.parseColumnCell(A, D)
            } else {
                if (A.nodeName == "chartcell") {
                    this.parseChartCell(A, D)
                } else {
                    if (A.nodeName == "imagecell") {
                        this.parseImageCell(A, D)
                    } else {
                        if (A.nodeName == "subreportcell") {
                            this.parseSubreportCell(A, D)
                        } else {
                            if (A.nodeName == "tablecell") {
                                this.parseTableCell(A)
                            } else {
                                if (A.nodeName == "panelcell") {
                                    this.parsePanelCell(A)
                                } else {
                                    if (A.nodeName == "conditioncell") {
                                        this.parseConditionCell(A, D)
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
RptXml.prototype.parseCanvas = function (E, B, A, F) {
    var H = E.childNodes;
    for (var D = 0; D < H.length; D++) {
        var C = H[D];
        var G = C.nodeName;
        if (G == "columns") {
            this.parseColumns(C, B, F)
        } else {
            if (G == "rows") {
                this.parseRows(C, B, A)
            }
        }
    }
};
RptXml.prototype.parseColumns = function (E, B, I) {
    var H = E.childNodes;
    var C = 0;
    for (var G = 0; G < H.length; G++) {
        var A = H[G];
        if (A.nodeName == "column") {
            var J = parseInt(A.getAttribute("w"));
            var D = B.getGridCell(-1, C, 1, 1);
            var F = $(D.o);
            F.outerWidth(J);
            I.push(J);
            C++
        }
    }
};
RptXml.prototype.parseRows = function (D, B, I) {
    var H = D.childNodes;
    for (var F = 0; F < H.length; F++) {
        var A = H[F];
        if (A.nodeName == "row") {
            var G = parseInt(A.getAttribute("h"));
            I.push(G);
            var C = B.getGridCell(F, -1, 1, 1);
            var E = $(C.o);
            E.parent().height(G)
        }
    }
};
RptXml.prototype.parseHtmlCell = function (O, D) {
    var S = parseInt(O.getAttribute("rowNum"));
    var J = parseInt(O.getAttribute("colNum"));
    var E = parseInt(O.getAttribute("rowSpan"));
    var K = parseInt(O.getAttribute("colSpan"));
    var T = D.getGridCell(S, J, E, K);
    T.mark = 0;
    var P = T.content;
    var L = $(T.o);
    var G = O.childNodes;
    for (var R = 0; R < G.length; R++) {
        var I = G[R];
        if (I.nodeName == "#text") {
            continue
        }
        if (I.nodeName == "name") {
            T.name = I.textContent;
            T.setOnlyText(T.name)
        } else {
            if (I.nodeName == "contentType") {
                P.contentType = this.getNodeInt(I)
            } else {
                if (I.nodeName == "point") {
                    var N = parseInt(I.getAttribute("x"));
                    var M = parseInt(I.getAttribute("y"));
                    D.startDrawCellLine(T, N, M)
                } else {
                    if (I.nodeName == "disType") {
                        P.disType = this.getNodeInt(I)
                    } else {
                        if (I.nodeName == "joinType") {
                            P.joinType = this.getNodeInt(I)
                        } else {
                            if (I.nodeName == "printerFlag") {
                                P.printerFlag = this.getNodeInt(I)
                            } else {
                                if (I.nodeName == "fileOutFlag") {
                                    P.fileOutFlag = this.getNodeInt(I)
                                } else {
                                    if (I.nodeName == "upperCell") {
                                        P.upperCell = I.textContent
                                    } else {
                                        if (I.nodeName == "hiddenCondtion") {
                                            P.hiddenCondtion = I.textContent
                                        } else {
                                            if (I.nodeName == "cellLinked") {
                                                P.cellLinked = this.parseCellLinked(I)
                                            } else {
                                                if (I.nodeName == "imageLinked") {
                                                    P.cellImageLinked = this.parseCellImageLinked(I)
                                                } else {
                                                    if (I.nodeName == "fileLinked") {
                                                        P.cellFileLinked = this.parseCellFileLinked(I)
                                                    } else {
                                                        if (I.nodeName == "conditionFormat") {
                                                            P.conditionFormat = this.parseConditionForamt(I)
                                                        } else {
                                                            if (I.nodeName == "selectStyle") {
                                                                P.cellSelectStyle = this.parseSelectStyle(I)
                                                            } else {
                                                                if (I.nodeName == "linkages") {
                                                                    P.linkages = this.parseLinkages(I)
                                                                } else {
                                                                    if (I.nodeName == "dataBar") {
                                                                        P.dataBar = this.parseDataBar(I)
                                                                    } else {
                                                                        if (I.nodeName == "diffBar") {
                                                                            P.diffBar = this.parseDiffBar(I)
                                                                        } else {
                                                                            if (I.nodeName == "barCode") {
                                                                                P.barCode = this.parseBarCode(I)
                                                                            } else {
                                                                                if (I.nodeName == "cellFold") {
                                                                                    P.cellFold = this.parseCellFold(I)
                                                                                } else {
                                                                                    if (I.nodeName == "orderBy") {
                                                                                        P.orderBy = this.parseOrderBy(I)
                                                                                    } else {
                                                                                        if (I.nodeName == "iconStyle") {
                                                                                            P.iconStyle = this.parseIconStyle(I)
                                                                                        } else {
                                                                                            if (I.nodeName == "async") {
                                                                                                P.asyncData = this.parseAsync(I)
                                                                                            } else {
                                                                                                if (I.nodeName == "border") {
                                                                                                    var B = T.borderColor ? T.borderColor : {};
                                                                                                    var F = I.getAttribute("side");
                                                                                                    var U = I.getAttribute("color");
                                                                                                    var C = I.getAttribute("borderStyle");
                                                                                                    var W = I.getAttribute("borderWidth");
                                                                                                    var V = {};
                                                                                                    V.color = U;
                                                                                                    V.borderStyle = C;
                                                                                                    V.borderWidth = W;
                                                                                                    B[F] = V;
                                                                                                    T.borderColor = B
                                                                                                } else {
                                                                                                    this.parseStyle(I, T)
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
    if (P.disType != undefined) {
        T.setDisType(P.disType)
    }
    if (P.cellFold != undefined) {
        var Q = P.cellFold.foldType == 0 ? "<i class='icon iconfont icon-zhedie-jiahao fa-lg'></i>" : "<i class='icon iconfont icon-delete1 fa-lg'></i>";
        T.setIcon(Q, false)
    }
    if (P.orderBy != undefined && P.orderBy.dyn != 1) {
        var Q = "<i class='icon iconfont icon-paixu fa-lg fa-lg'></i>";
        T.setIcon(Q, true)
    }
    if (P.iconStyle != undefined) {
        var H = P.iconStyle;
        var Q = "<i class='" + H.iconString + "' style='";
        if (H.color != undefined) {
            Q += "color:" + H.color + ";"
        }
        Q += "font-size:" + H.size + ";";
        Q += "'></i>";
        var A = false;
        if (H.align == "right") {
            A = true
        }
        T.setIcon(Q, A)
    }
};
RptXml.prototype.parseColumnCell = function (L, O) {
    var P = parseInt(L.getAttribute("rowNum"));
    var H = parseInt(L.getAttribute("colNum"));
    var E = parseInt(L.getAttribute("rowSpan"));
    var J = parseInt(L.getAttribute("colSpan"));
    var Q = O.getGridCell(P, H, E, J);
    Q.mark = 1;
    var G = Q.content;
    var K = $(Q.o);
    var I = L.childNodes;
    for (var N = 0; N < I.length; N++) {
        var D = I[N];
        var A = D.nodeName;
        if (A == "#text") {
            continue
        }
        if (A == "contentType") {
            G.contentType = this.getNodeInt(D)
        } else {
            if (A == "joinType") {
                G.joinType = this.getNodeInt(D)
            } else {
                if (A == "visible") {
                    G.visible = this.getNodeInt(D)
                } else {
                    if (A == "exportVisible") {
                        G.exportVisible = this.getNodeInt(D)
                    } else {
                        if (A == "formatId") {
                            G.formatId = D.textContent
                        } else {
                            if (A == "localeUs") {
                                G.localeUs = this.getNodeBoolean(D)
                            } else {
                                if (A == "orgName") {
                                    G.orgName = D.textContent
                                } else {
                                    if (A == "name") {
                                        Q.name = D.textContent
                                    } else {
                                        if (A == "expression") {
                                            G.expression = D.textContent
                                        } else {
                                            if (A == "disType") {
                                                G.disType = this.getNodeInt(D)
                                            } else {
                                                if (A == "treeType") {
                                                    G.treeType = this.getNodeInt(D)
                                                } else {
                                                    if (A == "printerFlag") {
                                                        G.printerFlag = this.getNodeInt(D)
                                                    } else {
                                                        if (A == "fileOutFlag") {
                                                            G.fileOutFlag = this.getNodeInt(D)
                                                        } else {
                                                            if (A == "upperCell") {
                                                                G.upperCell = D.textContent
                                                            } else {
                                                                if (A == "conditionFormat") {
                                                                    G.conditionFormat = this.parseConditionForamt(D)
                                                                } else {
                                                                    if (A == "dataFilter") {
                                                                        G.dataFilter = this.parseDataFilter(D)
                                                                    } else {
                                                                        if (A == "logicValue") {
                                                                            G.logicMap = this.parseLogicValue(D)
                                                                        } else {
                                                                            if (A == "cellLinked") {
                                                                                G.cellLinked = this.parseCellLinked(D)
                                                                            } else {
                                                                                if (A == "imageLinked") {
                                                                                    G.cellImageLinked = this.parseCellImageLinked(D)
                                                                                } else {
                                                                                    if (A == "fileLinked") {
                                                                                        G.cellFileLinked = this.parseCellFileLinked(D)
                                                                                    } else {
                                                                                        if (A == "selectStyle") {
                                                                                            G.cellSelectStyle = this.parseSelectStyle(D)
                                                                                        } else {
                                                                                            if (A == "linkages") {
                                                                                                G.linkages = this.parseLinkages(D)
                                                                                            } else {
                                                                                                if (A == "dataBar") {
                                                                                                    G.dataBar = this.parseDataBar(D)
                                                                                                } else {
                                                                                                    if (A == "diffBar") {
                                                                                                        G.diffBar = this.parseDiffBar(D)
                                                                                                    } else {
                                                                                                        if (A == "barCode") {
                                                                                                            G.barCode = this.parseBarCode(D)
                                                                                                        } else {
                                                                                                            if (A == "orderBy") {
                                                                                                                G.orderBy = this.parseOrderBy(D)
                                                                                                            } else {
                                                                                                                if (A == "cellFold") {
                                                                                                                    G.cellFold = this.parseCellFold(D)
                                                                                                                } else {
                                                                                                                    if (A == "iconStyle") {
                                                                                                                        G.iconStyle = this.parseIconStyle(D)
                                                                                                                    } else {
                                                                                                                        if (A == "async") {
                                                                                                                            G.asyncData = this.parseAsync(D)
                                                                                                                        } else {
                                                                                                                            if (A == "border") {
                                                                                                                                var B = Q.borderColor ? Q.borderColor : {};
                                                                                                                                var F = D.getAttribute("side");
                                                                                                                                var R = D.getAttribute("color");
                                                                                                                                var C = D.getAttribute("borderStyle");
                                                                                                                                var T = D.getAttribute("borderWidth");
                                                                                                                                var S = {};
                                                                                                                                S.color = R;
                                                                                                                                S.borderStyle = C;
                                                                                                                                S.borderWidth = T;
                                                                                                                                B[F] = S;
                                                                                                                                Q.borderColor = B
                                                                                                                            } else {
                                                                                                                                this.parseStyle(D, Q)
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
    if (G.orgName != undefined) {
        Q.setOnlyText(G.orgName)
    }
    if (G.disType != undefined) {
        Q.setDisType(G.disType)
    }
    if (G.cellFold != undefined) {
        var M = G.cellFold.foldType == 0 ? "<i class='icon iconfont icon-zhedie-jiahao fa-lg'></i>" : "<i class='icon iconfont icon-delete1 fa-lg'></i>";
        Q.setIcon(M, false)
    }
    if (G.orderBy != undefined && G.orderBy.dyn != 1) {
        var M = "<i class='icon iconfont icon-paixu fa-lg fa-lg'></i>";
        Q.setIcon(M, true)
    }
};
RptXml.prototype.parseArgs = function (B) {
    var I = new Array();
    var G = new Array();
    var E = B.childNodes;
    for (var C = 0; C < E.length; C++) {
        var A = E[C];
        var H = A.nodeName;
        if (H == "canvas") {
            this.parseCanvas(A, argGrid, I, G)
        } else {
            if (H == "attr") {
                this.parseArgAttr(A)
            } else {
                if (H == "developer") {
                    report.argDeveloper = this.parseDeveloper(A)
                } else {
                    if (H == "htmlcell") {
                        this.parseHtmlCell(A, argGrid)
                    } else {
                        if (H == "conditioncell") {
                            this.parseConditionCell(A, argGrid)
                        } else {
                            if (H == "hidden") {
                                var F = report.reportArg ? report.reportArg : {};
                                var D = F.hiddens ? F.hiddens : new Array();
                                D.push(this.parseHidden(A));
                                F.hiddens = D;
                                report.reportArg = F
                            }
                        }
                    }
                }
            }
        }
    }
    this.syncGridRowDivsHeight(argGrid, I);
    this.syncGridColDivsWidth(argGrid, G)
};
RptXml.prototype.parseArgAttr = function (D) {
    var C = report.reportArg ? report.reportArg : {};
    var F = D.childNodes;
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "relative") {
            C.relative = this.getNodeInt(A)
        }
    }
};
RptXml.prototype.parseHidden = function (C) {
    var D = {};
    var F = C.childNodes;
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "name") {
            D.name = A.textContent
        } else {
            if (E == "dataType") {
                D.dataType = this.getNodeInt(A)
            } else {
                if (E == "dateFormat") {
                    D.dateFormat = A.textContent
                } else {
                    if (E == "defaultValueType") {
                        D.defaultValueType = this.getNodeInt(A)
                    } else {
                        if (E == "defaultValue") {
                            D.defaultValue = A.textContent
                        }
                    }
                }
            }
        }
    }
    return D
};
RptXml.prototype.parseConditionCell = function (L, A) {
    var O = parseInt(L.getAttribute("rowNum"));
    var F = parseInt(L.getAttribute("colNum"));
    var E = parseInt(L.getAttribute("rowSpan"));
    var I = parseInt(L.getAttribute("colSpan"));
    var Q = A.getGridCell(O, F, E, I);
    Q.mark = 2;
    var K = Q.content;
    var G = L.childNodes;
    for (var N = 0; N < G.length; N++) {
        var D = G[N];
        var B = D.nodeName;
        if (B == "name") {
            K.name = D.textContent
        } else {
            if (B == "width") {
                K.width = this.getNodeInt(D)
            } else {
                if (B == "height") {
                    K.height = this.getNodeInt(D)
                } else {
                    if (B == "widthUnit") {
                        K.widthUnit = D.textContent
                    } else {
                        if (B == "heightUnit") {
                            K.heightUnit = D.textContent
                        } else {
                            if (B == "hiddenCondtion") {
                                K.hiddenCondtion = D.textContent
                            } else {
                                if (B == "dataType") {
                                    K.dataType = this.getNodeInt(D)
                                } else {
                                    if (B == "defaultValue") {
                                        K.defaultValue = D.textContent
                                    } else {
                                        if (B == "defaultValueType") {
                                            K.defaultValueType = this.getNodeInt(D)
                                        } else {
                                            if (B == "editStyle") {
                                                K.editStyle = this.getNodeInt(D)
                                            } else {
                                                if (B == "dateFormat") {
                                                    K.dateFormat = D.textContent
                                                } else {
                                                    if (B == "linkCondName") {
                                                        K.linkCondName = D.textContent
                                                    } else {
                                                        if (B == "useLike") {
                                                            K.useLike = this.getNodeInt(D)
                                                        } else {
                                                            if (B == "likeType") {
                                                                K.likeType = this.getNodeInt(D)
                                                            } else {
                                                                if (B == "triggerQuery") {
                                                                    K.triggerQuery = this.getNodeInt(D)
                                                                } else {
                                                                    if (B == "dateRange") {
                                                                        K.dateRange = this.getNodeInt(D)
                                                                    } else {
                                                                        if (B == "startName") {
                                                                            K.startName = D.textContent
                                                                        } else {
                                                                            if (B == "endName") {
                                                                                K.endName = D.textContent
                                                                            } else {
                                                                                if (B == "select") {
                                                                                    this.parseSelect(D, K)
                                                                                } else {
                                                                                    if (B == "tree") {
                                                                                        this.parseTree(D, K)
                                                                                    } else {
                                                                                        if (B == "group") {
                                                                                            this.parseGroup(D, K)
                                                                                        } else {
                                                                                            if (B == "cmpStyle") {
                                                                                                K.cmpStyle = this.parseCmpStyle(D)
                                                                                            } else {
                                                                                                if (B == "button") {
                                                                                                    var R = K.data ? K.data : {};
                                                                                                    var J = {};
                                                                                                    J.type = D.getAttribute("type");
                                                                                                    var P = R.datas ? R.datas : new Array();
                                                                                                    P.push(J);
                                                                                                    R.datas = P;
                                                                                                    K.data = R
                                                                                                } else {
                                                                                                    if (B == "linkages") {
                                                                                                        K.linkages = this.parseLinkages(D)
                                                                                                    } else {
                                                                                                        if (B == "cellLinked") {
                                                                                                            K.cellLinked = this.parseCellLinked(D)
                                                                                                        } else {
                                                                                                            this.parseStyle(D, Q)
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
    if (K.editStyle == 16) {
        var M = {};
        M.name = K.name;
        M.dataType = K.dataType;
        M.dateFormat = K.dateFormat;
        M.defaultValueType = K.defaultValueType;
        M.defaultValue = K.defaultValue;
        var H = report.reportArg ? report.reportArg : {};
        var C = H.hiddens ? H.hiddens : new Array();
        C.push(M);
        H.hiddens = C;
        report.reportArg = H;
        return
    }
    anyExcel.initComponent(Q)
};
RptXml.prototype.parseCmpStyle = function (D) {
    var C = {};
    var F = D.childNodes;
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "background") {
            C.background = A.textContent
        } else {
            if (E == "borderColor") {
                C.borderColor = A.textContent
            } else {
                if (E == "iconColor") {
                    C.iconColor = A.textContent
                }
            }
        }
    }
    return C
};
RptXml.prototype.parseChartCell = function (L, N) {
    var O = parseInt(L.getAttribute("rowNum"));
    var H = parseInt(L.getAttribute("colNum"));
    var F = parseInt(L.getAttribute("rowSpan"));
    var J = parseInt(L.getAttribute("colSpan"));
    var P = N.getGridCell(O, H, F, J);
    P.mark = 3;
    var E = P.content;
    var K = $(P.o);
    var I = L.childNodes;
    for (var M = 0; M < I.length; M++) {
        var D = I[M];
        var A = D.nodeName;
        if (A == "chart") {
            this.parseAllChart(D, E)
        } else {
            if (A == "cellLinked") {
                E.cellLinked = this.parseCellLinked(D)
            } else {
                if (A == "imageLinked") {
                    E.cellImageLinked = this.parseCellImageLinked(D)
                } else {
                    if (A == "linkages") {
                        E.linkages = this.parseLinkages(D)
                    } else {
                        if (A == "dataFilter") {
                            E.dataFilter = this.parseDataFilter(D)
                        } else {
                            if (A == "border") {
                                var B = P.borderColor ? P.borderColor : {};
                                var G = D.getAttribute("side");
                                var Q = D.getAttribute("color");
                                var C = D.getAttribute("borderStyle");
                                var S = D.getAttribute("borderWidth");
                                var R = {};
                                R.color = Q;
                                R.borderStyle = C;
                                R.borderWidth = S;
                                B[G] = R;
                                P.borderColor = B
                            } else {
                                if (A == "disType") {
                                    E.disType = this.getNodeInt(D)
                                } else {
                                    if (A == "printerFlag") {
                                        E.printerFlag = this.getNodeInt(D)
                                    } else {
                                        if (A == "fileOutFlag") {
                                            E.fileOutFlag = this.getNodeInt(D)
                                        } else {
                                            if (A == "upperCell") {
                                                E.upperCell = D.textContent
                                            } else {
                                                if (A == "async") {
                                                    E.asyncData = this.parseAsync(D)
                                                } else {
                                                    this.parseStyle(D, P)
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
    anyExcel.initChart(P)
};
RptXml.prototype.parseSelect = function (B, H) {
    var E = {};
    if (B.hasAttribute("datatype")) {
        E.type = parseInt(B.getAttribute("datatype"))
    }
    if (B.hasAttribute("multiselect")) {
        E.multiselect = parseInt(B.getAttribute("multiselect"))
    }
    if (B.hasAttribute("supportSearch")) {
        E.supportSearch = parseInt(B.getAttribute("supportSearch"))
    }
    var G = B.childNodes;
    if (E.type == 1) {
        var J = {};
        for (var F = 0; F < G.length; F++) {
            var C = G[F];
            if (C.nodeName == "#text") {
                continue
            }
            var K = C.getAttribute("value");
            var L = C.textContent;
            J[K] = L
        }
        E.dataMap = J
    } else {
        var A = {};
        for (var D = 0; D < G.length; D++) {
            var M = G[D];
            var I = M.nodeName;
            if (I == "code") {
                A.code = M.textContent
            } else {
                if (I == "label") {
                    A.label = M.textContent
                } else {
                    if (I == "pcode") {
                        A.pcode = M.textContent
                    } else {
                        if (I == "dsName") {
                            A.dsName = M.textContent
                        }
                    }
                }
            }
        }
        E.conditionSql = A
    }
    H.data = E
};
RptXml.prototype.parseTree = function (A, E) {
    var C = {};
    var I = {};
    if (A.hasAttribute("multiselect")) {
        C.multiselect = parseInt(A.getAttribute("multiselect"))
    }
    if (A.hasAttribute("treeType")) {
        C.treeType = parseInt(A.getAttribute("treeType"))
    }
    var D = A.childNodes;
    for (var B = 0; B < D.length; B++) {
        var K = D[B];
        var G = K.nodeName;
        if (G == "code") {
            I.code = K.textContent
        } else {
            if (G == "label") {
                I.label = K.textContent
            } else {
                if (G == "pcode") {
                    I.pcode = K.textContent
                } else {
                    if (G == "queryCode") {
                        I.queryCode = K.textContent
                    } else {
                        if (G == "dsName") {
                            I.dsName = K.textContent
                        } else {
                            if (G == "option") {
                                var F = C.dataMap != undefined ? C.dataMap : {};
                                var H = K.getAttribute("value");
                                var J = K.textContent;
                                F[H] = J;
                                C.dataMap = F
                            }
                        }
                    }
                }
            }
        }
    }
    C.conditionSql = I;
    E.data = C
};
RptXml.prototype.parseGroup = function (A, E) {
    var B = {};
    var D = A.childNodes;
    var F = {};
    for (var C = 0; C < D.length; C++) {
        var G = D[C];
        if (G.nodeName == "#text") {
            continue
        }
        var I = G.getAttribute("value");
        var H = G.getAttribute("label");
        F[I] = H
    }
    if ($.isEmptyObject(F)) {
        F[""] = ""
    }
    B.dataMap = F;
    E.data = B
};
RptXml.prototype.parseImageCell = function (L, N) {
    var O = parseInt(L.getAttribute("rowNum"));
    var H = parseInt(L.getAttribute("colNum"));
    var F = parseInt(L.getAttribute("rowSpan"));
    var J = parseInt(L.getAttribute("colSpan"));
    var Q = N.getGridCell(O, H, F, J);
    Q.mark = 5;
    var E = Q.content;
    var K = $(Q.o);
    var P = Q.content;
    var I = L.childNodes;
    for (var M = 0; M < I.length; M++) {
        var D = I[M];
        var A = D.nodeName;
        if (A == "imageUrl") {
            P.imageUrl = D.textContent
        } else {
            if (A == "border") {
                var B = Q.borderColor ? Q.borderColor : {};
                var G = D.getAttribute("side");
                var R = D.getAttribute("color");
                var C = D.getAttribute("borderStyle");
                var U = D.getAttribute("borderWidth");
                var T = {};
                T.color = R;
                T.borderStyle = C;
                T.borderWidth = U;
                B[G] = T;
                Q.borderColor = B
            } else {
                if (A == "cellLinked") {
                    P.cellLinked = this.parseCellLinked(D)
                } else {
                    if (A == "disType") {
                        P.disType = this.getNodeInt(D)
                    } else {
                        if (A == "printerFlag") {
                            P.printerFlag = this.getNodeInt(D)
                        } else {
                            if (A == "fileOutFlag") {
                                P.fileOutFlag = this.getNodeInt(D)
                            }
                        }
                    }
                }
            }
        }
    }
    if (P.imageUrl != undefined) {
        var S = $("<img>", {src: P.imageUrl});
        S.width(K.width()).height(K.height());
        Q.setImage(S, K.width(), K.height())
    }
};
RptXml.prototype.parseSubreportCell = function (O, Q) {
    var R = parseInt(O.getAttribute("rowNum"));
    var J = parseInt(O.getAttribute("colNum"));
    var G = parseInt(O.getAttribute("rowSpan"));
    var L = parseInt(O.getAttribute("colSpan"));
    var S = Q.getGridCell(R, J, G, L);
    S.mark = 6;
    var M = $(S.o);
    var E = S.content;
    var I = {};
    var K = O.childNodes;
    for (var P = 0; P < K.length; P++) {
        var F = K[P];
        var A = F.nodeName;
        if (A == "rptId") {
            E.rptId = F.textContent
        } else {
            if (A == "param") {
                var N = F.getAttribute("argName");
                var D = F.getAttribute("argValue");
                I[N] = D
            } else {
                if (A == "border") {
                    var B = S.borderColor ? S.borderColor : {};
                    var H = F.getAttribute("side");
                    var T = F.getAttribute("color");
                    var C = F.getAttribute("borderStyle");
                    var V = F.getAttribute("borderWidth");
                    var U = {};
                    U.color = T;
                    U.borderStyle = C;
                    U.borderWidth = V;
                    B[H] = U;
                    S.borderColor = B
                } else {
                    if (A == "disType") {
                        E.disType = this.getNodeInt(F)
                    } else {
                        if (A == "printerFlag") {
                            E.printerFlag = this.getNodeInt(F)
                        } else {
                            if (A == "fileOutFlag") {
                                E.fileOutFlag = this.getNodeInt(F)
                            } else {
                                if (A == "async") {
                                    E.asyncData = this.parseAsync(F)
                                } else {
                                    this.parseStyle(F, S)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    E.argValueMap = I;
    S.setSubReportImage()
};
RptXml.prototype.parseTableCell = function (F) {
    var N = parseInt(F.getAttribute("rowNum"));
    var C = parseInt(F.getAttribute("colNum"));
    var L = parseInt(F.getAttribute("rowSpan"));
    var I = parseInt(F.getAttribute("colSpan"));
    var D = grid.getGridCell(N, C, L, I);
    D.mark = 7;
    D.setTableIcon();
    anyExcel.initInsertTable(D);
    var J = D.content;
    var K = F.childNodes;
    for (var H = 0; H < K.length; H++) {
        var B = K[H];
        var M = B.nodeName;
        if (M == "border") {
            var E = D.borderColor ? D.borderColor : {};
            var O = B.getAttribute("side");
            var A = B.getAttribute("color");
            var P = B.getAttribute("borderStyle");
            var G = B.getAttribute("borderWidth");
            var Q = {};
            Q.color = A;
            Q.borderStyle = P;
            Q.borderWidth = G;
            E[O] = Q;
            D.borderColor = E
        } else {
            if (M == "disType") {
                J.disType = this.getNodeInt(B)
            } else {
                if (M == "printerFlag") {
                    J.printerFlag = this.getNodeInt(B)
                } else {
                    if (M == "fileOutFlag") {
                        J.fileOutFlag = this.getNodeInt(B)
                    } else {
                        if (M == "relative") {
                            J.relative = this.getNodeInt(B)
                        } else {
                            if (M == "tableBackground") {
                                J.tableBackground = B.textContent
                            } else {
                                if (M == "tableOpacity") {
                                    J.tableOpacity = this.getNodeNumber(B)
                                } else {
                                    if (M == "panel") {
                                        this.parseTablePanel(B, J)
                                    } else {
                                        if (M == "report") {
                                            this.parseTableReport(B, J)
                                        } else {
                                            if (M == "async") {
                                                J.asyncData = this.parseAsync(B)
                                            } else {
                                                this.parseStyle(B, D)
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
    $(".tab-report-list").tab("show")
};
RptXml.prototype.parseTableReport = function (C, L) {
    var F = new Array();
    var D = new Array();
    var J = L.grid;
    var M = C.childNodes;
    for (var I = 0; I < M.length; I++) {
        var A = M[I];
        var N = A.nodeName;
        if (N == "canvas") {
            this.parseCanvas(A, J, F, D)
        } else {
            if (N == "cells") {
                this.parseCells(A, J)
            } else {
                if (N == "view") {
                    this.parseView(A, L)
                }
            }
        }
    }
    var K = J.tb.children();
    for (var I = 1; I < K.length; I++) {
        var H = $(K[I]).children("td");
        for (var G = 1; G < H.length; G++) {
            var E = $(H[G]);
            var B = E.data("gc");
            J.tdBorderColor(B)
        }
    }
    J.resetResizable();
    this.syncGridRowDivsHeight(J, F);
    this.syncGridColDivsWidth(J, D)
};
RptXml.prototype.parseTablePanel = function (C, F) {
    var E = C.childNodes;
    for (var B = 0; B < E.length; B++) {
        var A = E[B];
        var D = A.nodeName;
        if (D == "userPanel") {
            F.userPanel = this.getNodeInt(A)
        } else {
            if (D == "title") {
                F.title = A.textContent
            } else {
                if (D == "titleColor") {
                    F.titleColor = A.textContent
                } else {
                    if (D == "titleFontWeight") {
                        F.titleFontWeight = A.textContent
                    } else {
                        if (D == "titleFontStyle") {
                            F.titleFontStyle = A.textContent
                        } else {
                            if (D == "titleFontSize") {
                                F.titleFontSize = this.getNodeInt(A)
                            } else {
                                if (D == "titleHeight") {
                                    F.titleHeight = this.getNodeInt(A)
                                } else {
                                    if (D == "panelBorderColor") {
                                        F.panelBorderColor = A.textContent
                                    } else {
                                        if (D == "panelBorderWidth") {
                                            F.panelBorderWidth = this.getNodeInt(A)
                                        } else {
                                            if (D == "panelBorderRadius") {
                                                F.panelBorderRadius = this.getNodeInt(A)
                                            } else {
                                                if (D == "titleBottomBorderWidth") {
                                                    F.titleBottomBorderWidth = this.getNodeInt(A)
                                                } else {
                                                    if (D == "panelBackground") {
                                                        F.panelBackground = A.textContent
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
RptXml.prototype.parseLogicValue = function (G) {
    var F = G.childNodes;
    var A = {};
    for (var B = 0; B < F.length; B++) {
        var E = F[B];
        var C = E.getAttribute("code");
        var D = E.getAttribute("value");
        A[C] = D
    }
    return A
};
RptXml.prototype.parseCellLinked = function (D) {
    var I = {};
    var F = D.childNodes;
    var B = {};
    for (var E = 0; E < F.length; E++) {
        var C = F[E];
        var H = C.nodeName;
        if (H == "type") {
            I.type = this.getNodeInt(C)
        } else {
            if (H == "targetType") {
                I.targetType = this.getNodeInt(C)
            } else {
                if (H == "width") {
                    I.width = this.getNodeInt(C)
                } else {
                    if (H == "height") {
                        I.height = this.getNodeInt(C)
                    } else {
                        if (H == "url") {
                            I.url = C.textContent
                        } else {
                            if (H == "param") {
                                var A = C.getAttribute("argName");
                                var G = C.getAttribute("argValue");
                                B[A] = G
                            } else {
                                if (H == "logicCondition") {
                                    I.logicCondition = this.parseLogicCondition(C)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    I.argValueMap = B;
    return I
};
RptXml.prototype.parseLogicCondition = function (C) {
    var G = C.childNodes;
    var D = new Array();
    for (var B = 0; B < G.length; B++) {
        var A = G[B];
        var F = A.nodeName;
        if (F == "content") {
            D.push(this.parseConditionContent(A))
        }
    }
    var E = {};
    E.conditions = D;
    return E
};
RptXml.prototype.parseCellImageLinked = function (D) {
    var A = {};
    A.filePath = D.getAttribute("filePath");
    var F = D.childNodes;
    for (var C = 0; C < F.length; C++) {
        var B = F[C];
        var E = B.nodeName;
        if (E == "serverPath") {
            A.serverPath = B.textContent
        } else {
            if (E == "imgWidth") {
                A.imgWidth = this.getNodeInt(B)
            } else {
                if (E == "imgHeight") {
                    A.imgHeight = this.getNodeInt(B)
                }
            }
        }
    }
    return A
};
RptXml.prototype.parseCellFileLinked = function (A) {
    var B = {};
    B.filePath = A.getAttribute("filePath");
    return B
};
RptXml.prototype.parseConditionForamt = function (N) {
    var B = {};
    var F = new Array();
    var L = N.childNodes;
    for (var J = 0; J < L.length; J++) {
        var I = L[J];
        if (I.nodeName == "#text") {
            continue
        }
        var D = {};
        var E = I.childNodes;
        var G = new Array();
        var C = new Array();
        for (var H = 0; H < E.length; H++) {
            var A = E[H];
            var M = A.nodeName;
            if (M == "fontColor") {
                D.fontColor = A.textContent
            } else {
                if (M == "background") {
                    D.background = A.textContent
                } else {
                    if (M == "bold") {
                        D.isBold = this.getNodeBoolean(A)
                    } else {
                        if (M == "italic") {
                            D.isItalic = this.getNodeBoolean(A)
                        } else {
                            if (M == "underline") {
                                D.isUnderline = this.getNodeBoolean(A)
                            } else {
                                if (M == "fontSize") {
                                    D.fontSize = this.getNodeInt(A)
                                } else {
                                    if (M == "content") {
                                        G.push(this.parseConditionContent(A))
                                    } else {
                                        if (M == "styleImage") {
                                            var K = {};
                                            K.filePath = A.getAttribute("filePath");
                                            K.remote = A.getAttribute("remote");
                                            C.push(K)
                                        } else {
                                            if (M == "desc") {
                                                D.desc = A.textContent
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
        D.contents = G;
        if (C.length > 0) {
            D.styleImages = C
        }
        F.push(D)
    }
    B.cformats = F;
    return B
};
RptXml.prototype.parseDataFilter = function (B) {
    var G = B.childNodes;
    var F = new Array();
    for (var C = 0; C < G.length; C++) {
        var A = G[C];
        if (A.nodeName == "#text") {
            continue
        }
        var D = this.parseConditionContent(A);
        F.push(D)
    }
    var E = {};
    if (B.hasAttribute("type")) {
        E.type = B.getAttribute("type")
    }
    E.conditions = F;
    return E
};
RptXml.prototype.parseConditionContent = function (A) {
    var D = {};
    var F = A.childNodes;
    for (var C = 0; C < F.length; C++) {
        var B = F[C];
        var E = B.nodeName;
        if (E == "symbol") {
            D.symbol = this.getNodeInt(B)
        } else {
            if (E == "column") {
                D.column = B.textContent
            } else {
                if (E == "type") {
                    D.type = this.getNodeInt(B)
                } else {
                    if (E == "logic") {
                        D.logic = this.getNodeInt(B)
                    } else {
                        if (E == "value") {
                            D.value = B.textContent
                        }
                    }
                }
            }
        }
    }
    return D
};
RptXml.prototype.parseSelectStyle = function (A) {
    var B = {};
    var F = A.childNodes;
    for (var D = 0; D < F.length; D++) {
        var C = F[D];
        var E = C.nodeName;
        if (E == "oddBackgroundColor") {
            B.oddBackgroundColor = C.textContent
        } else {
            if (E == "evenBackgroundColor") {
                B.evenBackgroundColor = C.textContent
            }
        }
    }
    return B
};
RptXml.prototype.parseLinkages = function (L) {
    var N = {};
    var I = new Array();
    var H = L.childNodes;
    for (var G = 0; G < H.length; G++) {
        var C = H[G];
        if (C.nodeName == "#text") {
            continue
        }
        var D = {};
        var E = {};
        var J = C.childNodes;
        for (var F = 0; F < J.length; F++) {
            var B = J[F];
            var M = B.nodeName;
            if (M == "name") {
                D.name = B.textContent
            } else {
                if (M == "type") {
                    D.type = this.getNodeInt(B)
                } else {
                    if (M == "targetId") {
                        D.targetId = B.textContent
                    } else {
                        if (M == "param") {
                            var A = B.getAttribute("argName");
                            var K = B.getAttribute("argValue");
                            E[A] = K
                        }
                    }
                }
            }
        }
        if (!$.isEmptyObject(E)) {
            D.params = E
        }
        I.push(D)
    }
    N.linkages = I;
    return N
};
RptXml.prototype.parseDataBar = function (D) {
    var A = {};
    var F = D.childNodes;
    for (var C = 0; C < F.length; C++) {
        var B = F[C];
        var E = B.nodeName;
        if (E == "onlyBar") {
            A.onlyBar = this.getNodeBoolean(B)
        } else {
            if (E == "min") {
                A.min = B.textContent
            } else {
                if (E == "max") {
                    A.max = B.textContent
                } else {
                    if (E == "height") {
                        A.height = this.getNodeInt(B)
                    } else {
                        if (E == "maxWidth") {
                            A.maxWidth = this.getNodeInt(B)
                        } else {
                            if (E == "backgroundColor") {
                                A.backgroundColor = B.textContent
                            }
                        }
                    }
                }
            }
        }
    }
    return A
};
RptXml.prototype.parseDiffBar = function (A) {
    var B = {};
    var F = A.childNodes;
    for (var D = 0; D < F.length; D++) {
        var C = F[D];
        var E = C.nodeName;
        if (E == "onlyBar") {
            B.onlyBar = this.getNodeBoolean(C)
        } else {
            if (E == "column") {
                B.columnValue = C.textContent
            } else {
                if (E == "mid") {
                    B.midValue = C.textContent
                } else {
                    if (E == "height") {
                        B.height = this.getNodeInt(C)
                    } else {
                        if (E == "maxWidth") {
                            B.maxWidth = this.getNodeInt(C)
                        }
                    }
                }
            }
        }
    }
    return B
};
RptXml.prototype.parseBarCode = function (C) {
    var F = {};
    var E = C.childNodes;
    for (var B = 0; B < E.length; B++) {
        var A = E[B];
        var D = A.nodeName;
        if (D == "type") {
            F.type = A.textContent
        } else {
            if (D == "height") {
                F.height = this.getNodeInt(A)
            } else {
                if (D == "width") {
                    F.width = this.getNodeInt(A)
                } else {
                    if (D == "textEnabled") {
                        F.textEnabled = this.getNodeInt(A)
                    }
                }
            }
        }
    }
    return F
};
RptXml.prototype.parseStyle = function (G, F) {
    var C = $(F.o);
    if (G.nodeName == "fontWeight") {
        if (G.textContent == "bold") {
            C.addClass("bold")
        }
    } else {
        if (G.nodeName == "fontStyle") {
            if (G.textContent == "italic") {
                C.addClass("italic")
            }
        } else {
            if (G.nodeName == "textDecoration") {
                if (G.textContent == "underline") {
                    C.addClass("underline")
                }
            } else {
                if (G.nodeName == "fontSize") {
                    var E = this.getNodeInt(G, 12);
                    C.css("font-size", E)
                } else {
                    if (G.nodeName == "verticalAlign") {
                        var B = G.textContent;
                        C.attr("valign", B);
                        if (B == "top") {
                            C.addClass("vtop")
                        } else {
                            if (B == "middle") {
                                C.addClass("vmiddle")
                            } else {
                                if (B == "bottom") {
                                    C.addClass("vbottom")
                                }
                            }
                        }
                    } else {
                        if (G.nodeName == "horizontalAlign") {
                            C.attr("align", G.textContent)
                        } else {
                            if (G.nodeName == "backgroundColor") {
                                var D = G.textContent.startsWith("#") ? G.textContent : "#" + G.textContent;
                                C.css("background", D)
                            } else {
                                if (G.nodeName == "color") {
                                    var A = G.textContent.startsWith("#") ? G.textContent : "#" + G.textContent;
                                    C.css("color", A)
                                } else {
                                    if (G.nodeName == "paddingLeft") {
                                        F.content.paddingLeft = this.getNodeInt(G)
                                    } else {
                                        if (G.nodeName == "paddingTop") {
                                            F.content.paddingTop = this.getNodeInt(G)
                                        } else {
                                            if (G.nodeName == "paddingRight") {
                                                F.content.paddingRight = this.getNodeInt(G)
                                            } else {
                                                if (G.nodeName == "paddingBottom") {
                                                    F.content.paddingBottom = this.getNodeInt(G)
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
RptXml.prototype.parseAllChart = function (D, A) {
    var F = D.childNodes;
    for (var C = 0; C < F.length; C++) {
        var B = F[C];
        var E = B.nodeName;
        if (E == "type") {
            A.chartType = this.getNodeInt(B)
        } else {
            if (E == "chart") {
                A.chart = this.parseChart(B)
            } else {
                if (E == "title") {
                    A.title = this.parseTitle(B)
                } else {
                    if (E == "tooltip") {
                        A.tooltip = this.parseTooltip(B)
                    } else {
                        if (E == "legend") {
                            A.legend = this.parseLegend(B)
                        } else {
                            if (E == "series") {
                                A.series = this.parseSeries(B, A)
                            } else {
                                if (E == "xaxis") {
                                    A.xAxis = this.parseXaxis(B)
                                } else {
                                    if (E == "yaxis") {
                                        A.yAxis = this.parseXaxis(B)
                                    } else {
                                        if (E == "yrightaxis") {
                                            A.yRightAxis = this.parseXaxis(B)
                                        } else {
                                            if (E == "axis") {
                                                A.axis = this.parseXaxis(B)
                                            } else {
                                                if (E == "map") {
                                                    A.map = this.parseMapAttr(B)
                                                } else {
                                                    if (E == "styleMap") {
                                                        A.styleMap = this.parseStyleMap(B)
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
RptXml.prototype.parseChart = function (D) {
    var C = {};
    var E = {};
    var G = D.childNodes;
    for (var B = 0; B < G.length; B++) {
        var A = G[B];
        var F = A.nodeName;
        if (F == "marginLeft") {
            C.marginLeft = this.getNodeInt(A)
        } else {
            if (F == "marginRight") {
                C.marginRight = this.getNodeInt(A)
            } else {
                if (F == "marginTop") {
                    C.marginTop = this.getNodeInt(A)
                } else {
                    if (F == "marginBottom") {
                        C.marginBottom = this.getNodeInt(A)
                    } else {
                        if (F == "margin") {
                            C.margin = this.getNodeInt(A)
                        } else {
                            if (F == "borderWidth") {
                                C.borderWidth = this.getNodeInt(A)
                            } else {
                                if (F == "backgroundColor") {
                                    C.backgroundColor = A.textContent
                                } else {
                                    if (F == "bgColor") {
                                        C.bgColor = A.textContent
                                    } else {
                                        if (F == "borderColor") {
                                            C.borderColor = A.textContent
                                        } else {
                                            if (F == "borderOpacity") {
                                                C.borderOpacity = this.getNodeNumber(A)
                                            } else {
                                                if (F == "bgOpacity") {
                                                    C.bgOpacity = this.getNodeNumber(A)
                                                } else {
                                                    if (F == "width") {
                                                        C.width = this.getNodeInt(A)
                                                    } else {
                                                        if (F == "height") {
                                                            C.height = this.getNodeInt(A)
                                                        } else {
                                                            if (F == "borderRadius") {
                                                                C.borderRadius = this.getNodeInt(A)
                                                            } else {
                                                                if (F == "type") {
                                                                    C.type = A.textContent
                                                                } else {
                                                                    if (F == "layout") {
                                                                        C.layout = A.textContent
                                                                    } else {
                                                                        if (F == "enable3D") {
                                                                            C.enable3D = this.getNodeBoolean(A)
                                                                        } else {
                                                                            if (F == "interval") {
                                                                                E.interval = this.getNodeInt(A)
                                                                            } else {
                                                                                if (F == "timeType") {
                                                                                    E.timeType = this.getNodeInt(A)
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
    if (!$.isEmptyObject(E)) {
        C.asyncData = E
    }
    return C
};
RptXml.prototype.parseSeries = function (F, A) {
    var E = {};
    var B = new Array();
    var H = F.childNodes;
    for (var D = 0; D < H.length; D++) {
        var C = H[D];
        var G = C.nodeName;
        if (G == "gap") {
            E.gap = this.getNodeInt(C)
        } else {
            if (G == "column") {
                E.column = C.textContent
            } else {
                if (G == "columnValueType") {
                    E.columnValueType = this.getNodeInt(C)
                } else {
                    if (G == "startAngle") {
                        E.startAngle = this.getNodeNumber(C)
                    } else {
                        if (G == "endAngle") {
                            E.endAngle = this.getNodeNumber(C)
                        } else {
                            if (G == "barGap") {
                                E.barGap = C.textContent
                            } else {
                                if (G == "barCategoryGap") {
                                    E.barCategoryGap = C.textContent
                                } else {
                                    if (G == "unitName") {
                                        E.unitName = C.textContent
                                    } else {
                                        if (G == "rowCount") {
                                            E.rowCount = this.getNodeInt(C)
                                        } else {
                                            if (G == "label") {
                                                E.label = this.parseLabel(C, false)
                                            } else {
                                                if (G == "structType") {
                                                    E.structType = this.getNodeInt(C)
                                                } else {
                                                    if (G == "serie") {
                                                        B.push(this.parseSerie(C, A))
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
    E.series = B;
    return E
};
RptXml.prototype.parseSerie = function (B, I) {
    var D = {};
    var F = this.labelEnableDefaultValue(I.chartType);
    var E = B.childNodes;
    for (var C = 0; C < E.length; C++) {
        var A = E[C];
        var H = A.nodeName;
        if (H == "type") {
            D.type = A.textContent
        } else {
            if (H == "name") {
                D.name = A.textContent
            } else {
                if (H == "nameValueType") {
                    D.nameValueType = this.getNodeInt(A)
                } else {
                    if (H == "column") {
                        D.column = A.textContent
                    } else {
                        if (H == "columnValueType") {
                            D.columnValueType = this.getNodeInt(A)
                        } else {
                            if (H == "value") {
                                D.value = A.textContent
                            } else {
                                if (H == "valueValueType") {
                                    D.valueValueType = this.getNodeInt(A)
                                } else {
                                    if (H == "total") {
                                        D.total = A.textContent
                                    } else {
                                        if (H == "totalValueType") {
                                            D.totalValueType = this.getNodeInt(A)
                                        } else {
                                            if (H == "color") {
                                                D.color = A.textContent
                                            } else {
                                                if (H == "opacity") {
                                                    D.opacity = this.getNodeNumber(A)
                                                } else {
                                                    if (H == "color1") {
                                                        D.color1 = A.textContent
                                                    } else {
                                                        if (H == "barMaxWidth") {
                                                            D.barMaxWidth = this.getNodeInt(A)
                                                        } else {
                                                            if (H == "xyName") {
                                                                D.xyName = A.textContent
                                                            } else {
                                                                if (H == "xyNameValueType") {
                                                                    D.xyNameValueType = this.getNodeInt(A)
                                                                } else {
                                                                    if (H == "xColumn") {
                                                                        D.xColumn = A.textContent
                                                                    } else {
                                                                        if (H == "xColumnValueType") {
                                                                            D.xColumnValueType = this.getNodeInt(A)
                                                                        } else {
                                                                            if (H == "yColumn") {
                                                                                D.yColumn = A.textContent
                                                                            } else {
                                                                                if (H == "yColumnValueType") {
                                                                                    D.yColumnValueType = this.getNodeInt(A)
                                                                                } else {
                                                                                    if (H == "startDate") {
                                                                                        D.startDate = A.textContent
                                                                                    } else {
                                                                                        if (H == "startDateValueType") {
                                                                                            D.startDateValueType = this.getNodeInt(A)
                                                                                        } else {
                                                                                            if (H == "endDate") {
                                                                                                D.endDate = A.textContent
                                                                                            } else {
                                                                                                if (H == "endDateValueType") {
                                                                                                    D.endDateValueType = this.getNodeInt(A)
                                                                                                } else {
                                                                                                    if (H == "id") {
                                                                                                        D.id = A.textContent
                                                                                                    } else {
                                                                                                        if (H == "idValueType") {
                                                                                                            D.idValueType = this.getNodeInt(A)
                                                                                                        } else {
                                                                                                            if (H == "pId") {
                                                                                                                D.pId = A.textContent
                                                                                                            } else {
                                                                                                                if (H == "pIdValueType") {
                                                                                                                    D.pIdValueType = this.getNodeInt(A)
                                                                                                                } else {
                                                                                                                    if (H == "yAxisIndex") {
                                                                                                                        D.yAxisIndex = this.getNodeInt(A)
                                                                                                                    } else {
                                                                                                                        if (H == "unitName") {
                                                                                                                            D.unitName = A.textContent
                                                                                                                        } else {
                                                                                                                            if (H == "shadowBlur") {
                                                                                                                                D.shadowBlur = this.getNodeInt(A)
                                                                                                                            } else {
                                                                                                                                if (H == "shadowColor") {
                                                                                                                                    D.shadowColor = A.textContent
                                                                                                                                } else {
                                                                                                                                    if (H == "shadowOpacity") {
                                                                                                                                        D.shadowOpacity = this.getNodeNumber(A)
                                                                                                                                    } else {
                                                                                                                                        if (H == "sunburstRadio") {
                                                                                                                                            D.sunburstRadio = this.getNodeInt(A)
                                                                                                                                        } else {
                                                                                                                                            if (H == "centerX") {
                                                                                                                                                D.centerX = A.textContent
                                                                                                                                            } else {
                                                                                                                                                if (H == "centerY") {
                                                                                                                                                    D.centerY = A.textContent
                                                                                                                                                } else {
                                                                                                                                                    if (H == "radius") {
                                                                                                                                                        D.radius = A.textContent
                                                                                                                                                    } else {
                                                                                                                                                        if (H == "label") {
                                                                                                                                                            D.label = this.parseLabel(A, F)
                                                                                                                                                        } else {
                                                                                                                                                            if (H == "marklines") {
                                                                                                                                                                D.marklines = this.parseMarklines(A)
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
                            }
                        }
                    }
                }
            }
        }
    }
    if (D.label == undefined) {
        var G = {};
        G.defaultEnabled = F;
        G.enabled = F;
        D.label = G
    }
    return D
};
RptXml.prototype.parseMarklines = function (B) {
    var G = B.childNodes;
    var D = new Array();
    for (var F = 0; F < G.length; F++) {
        var A = G[F];
        var J = {};
        var H = A.childNodes;
        for (var E = 0; E < H.length; E++) {
            var C = H[E];
            var I = C.nodeName;
            if (I == "valueType") {
                J.valueType = this.getNodeInt(C)
            } else {
                if (I == "value") {
                    J.value = C.textContent
                } else {
                    if (I == "color") {
                        J.color = C.textContent
                    } else {
                        if (I == "width") {
                            J.width = this.getNodeInt(C)
                        } else {
                            if (I == "lineStyle") {
                                J.lineStyle = C.textContent
                            } else {
                                if (I == "name") {
                                    J.name = C.textContent
                                }
                            }
                        }
                    }
                }
            }
        }
        D.push(J)
    }
    return D
};
RptXml.prototype.labelEnableDefaultValue = function (A) {
    switch (A) {
        case 7:
        case 8:
        case 9:
        case 19:
        case 20:
        case 21:
        case 22:
        case 31:
        case 30:
        case 50:
        case 51:
        case 55:
        case 56:
            return true;
        default:
            return false
    }
};
RptXml.prototype.parseXaxis = function (C) {
    var F = {};
    var E = C.childNodes;
    for (var B = 0; B < E.length; B++) {
        var A = E[B];
        var D = A.nodeName;
        if (D == "type") {
            F.type = A.textContent
        } else {
            if (D == "axisEnabled") {
                F.axisEnabled = this.getNodeBoolean(A)
            } else {
                if (D == "max") {
                    F.max = this.getNodeNumber(A)
                } else {
                    if (D == "min") {
                        F.min = this.getNodeNumber(A)
                    } else {
                        if (D == "step") {
                            F.step = this.getNodeNumber(A)
                        } else {
                            if (D == "startTime") {
                                F.startTime = A.textContent
                            } else {
                                if (D == "endTime") {
                                    F.endTime = A.textContent
                                } else {
                                    if (D == "timeTnterval") {
                                        F.timeTnterval = this.getNodeInt(A)
                                    } else {
                                        if (D == "intervalUnit") {
                                            F.intervalUnit = A.textContent
                                        } else {
                                            if (D == "timeSpan") {
                                                F.timeSpan = this.getNodeInt(A)
                                            } else {
                                                if (D == "timeSpanFormat") {
                                                    F.timeSpanFormat = A.textContent
                                                } else {
                                                    if (D == "lineColor") {
                                                        F.lineColor = A.textContent
                                                    } else {
                                                        if (D == "lineWidth") {
                                                            F.lineWidth = this.getNodeNumber(A)
                                                        } else {
                                                            if (D == "tickColor") {
                                                                F.tickColor = A.textContent
                                                            } else {
                                                                if (D == "tickLength") {
                                                                    F.tickLength = this.getNodeNumber(A)
                                                                } else {
                                                                    if (D == "tickWidth") {
                                                                        F.tickWidth = this.getNodeNumber(A)
                                                                    } else {
                                                                        if (D == "tickGap") {
                                                                            F.tickGap = this.getNodeNumber(A)
                                                                        } else {
                                                                            if (D == "splitLineEnabled") {
                                                                                F.splitLineEnabled = this.getNodeBoolean(A)
                                                                            } else {
                                                                                if (D == "splitLineType") {
                                                                                    F.splitLineType = A.textContent
                                                                                } else {
                                                                                    if (D == "splitLineColor") {
                                                                                        F.splitLineColor = A.textContent
                                                                                    } else {
                                                                                        if (D == "splitLineWidth") {
                                                                                            F.splitLineWidth = this.getNodeNumber(A)
                                                                                        } else {
                                                                                            if (D == "offsetLeft") {
                                                                                                F.offsetLeft = this.getNodeNumber(A)
                                                                                            } else {
                                                                                                if (D == "dataZoomEnabled") {
                                                                                                    F.dataZoomEnabled = this.getNodeBoolean(A)
                                                                                                } else {
                                                                                                    if (D == "zoomStart") {
                                                                                                        F.zoomStart = this.getNodeNumber(A)
                                                                                                    } else {
                                                                                                        if (D == "zoomEnd") {
                                                                                                            F.zoomEnd = this.getNodeNumber(A)
                                                                                                        } else {
                                                                                                            if (D == "title") {
                                                                                                                F.title = this.parseTitle(A)
                                                                                                            } else {
                                                                                                                if (D == "label") {
                                                                                                                    F.label = this.parseLabel(A, true)
                                                                                                                } else {
                                                                                                                    if (D == "valueLine") {
                                                                                                                        F.valueLine = this.parseValueLine(A)
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
    return F
};
RptXml.prototype.parseValueLine = function (D) {
    var C = {};
    var F = D.childNodes;
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "name") {
            C.name = A.textContent
        } else {
            if (E == "value") {
                C.value = this.getNodeNumber(A)
            } else {
                if (E == "lineColor") {
                    C.lineColor = A.textContent
                } else {
                    if (E == "lineWidth") {
                        C.lineWidth = this.getNodeInt(A)
                    } else {
                        if (E == "lineStyle") {
                            C.lineStyle = A.textContent
                        }
                    }
                }
            }
        }
    }
    return C
};
RptXml.prototype.parseTitle = function (C) {
    var D = {};
    var F = C.childNodes;
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "enabled") {
            D.enabled = this.getNodeBoolean(A)
        } else {
            if (E == "text") {
                D.text = A.textContent
            } else {
                if (E == "textValueType") {
                    D.textValueType = this.getNodeInt(A)
                } else {
                    if (E == "align") {
                        D.align = A.textContent
                    } else {
                        if (E == "borderWidth") {
                            D.borderWidth = this.getNodeInt(A)
                        } else {
                            if (E == "borderColor") {
                                D.borderColor = A.textContent
                            } else {
                                if (E == "backgroundColor") {
                                    D.backgroundColor = A.textContent
                                } else {
                                    if (E == "margin") {
                                        D.margin = this.getNodeInt(A)
                                    } else {
                                        if (E == "rotation") {
                                            D.rotation = this.getNodeInt(A)
                                        } else {
                                            if (E == "textStyle") {
                                                D.textStyle = this.parseTextStyle(A)
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
    return D
};
RptXml.prototype.parseTooltip = function (C) {
    var D = {};
    var F = C.childNodes;
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "enabled") {
            D.enabled = this.getNodeBoolean(A)
        } else {
            if (E == "format") {
                D.format = A.textContent
            } else {
                if (E == "align") {
                    D.align = A.textContent
                } else {
                    if (E == "padding") {
                        D.padding = this.getNodeInt(A)
                    } else {
                        if (E == "borderColor") {
                            D.borderColor = A.textContent
                        } else {
                            if (E == "borderWidth") {
                                D.borderWidth = this.getNodeInt(A)
                            } else {
                                if (E == "backgroundColor") {
                                    D.backgroundColor = A.textContent
                                } else {
                                    if (E == "borderRadius") {
                                        D.borderRadius = this.getNodeInt(A)
                                    } else {
                                        if (E == "textStyle") {
                                            D.textStyle = this.parseTextStyle(A)
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
    return D
};
RptXml.prototype.parseLegend = function (D) {
    var C = {};
    var F = D.childNodes;
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "enabled") {
            C.enabled = this.getNodeBoolean(A)
        } else {
            if (E == "align") {
                C.align = A.textContent
            } else {
                if (E == "verticalAlign") {
                    C.verticalAlign = A.textContent
                } else {
                    if (E == "layout") {
                        C.layout = A.textContent
                    } else {
                        if (E == "itemGap") {
                            C.itemGap = this.getNodeNumber(A)
                        } else {
                            if (E == "textStyle") {
                                C.textStyle = this.parseTextStyle(A)
                            }
                        }
                    }
                }
            }
        }
    }
    return C
};
RptXml.prototype.parseMapAttr = function (N) {
    var U = {};
    var H = N.childNodes;
    for (var Q = 0; Q < H.length; Q++) {
        var F = H[Q];
        var A = F.nodeName;
        if (A == "areaLabelEnable") {
            U.areaLabelEnable = this.getNodeBoolean(F)
        } else {
            if (A == "areaColor") {
                U.areaColor = F.textContent
            } else {
                if (A == "areaLineWidth") {
                    U.areaLineWidth = F.textContent
                } else {
                    if (A == "areaLineColor") {
                        U.areaLineColor = F.textContent
                    } else {
                        if (A == "visualEnabled") {
                            U.visualEnabled = this.getNodeBoolean(F)
                        } else {
                            if (A == "visualStartColor") {
                                U.visualStartColor = F.textContent
                            } else {
                                if (A == "visualMidColor") {
                                    U.visualMidColor = F.textContent
                                } else {
                                    if (A == "visualEndColor") {
                                        U.visualEndColor = F.textContent
                                    } else {
                                        if (A == "orient") {
                                            U.orient = F.textContent
                                        } else {
                                            if (A == "left") {
                                                U.left = F.textContent
                                            } else {
                                                if (A == "top") {
                                                    U.top = F.textContent
                                                } else {
                                                    if (A == "textStyle") {
                                                        U.textStyle = this.parseTextStyle(F)
                                                    } else {
                                                        if (A == "zoom") {
                                                            U.zoom = this.getNodeNumber(F)
                                                        } else {
                                                            if (A == "pos") {
                                                                U.pos = F.textContent
                                                            } else {
                                                                if (A == "key") {
                                                                    U.key = F.textContent
                                                                } else {
                                                                    if (A == "waterColor") {
                                                                        U.waterColor = F.textContent
                                                                    } else {
                                                                        if (A == "landColor") {
                                                                            U.landColor = F.textContent
                                                                        } else {
                                                                            if (A == "boundaryColor") {
                                                                                U.boundaryColor = F.textContent
                                                                            } else {
                                                                                if (A == "boundaryFillColor") {
                                                                                    U.boundaryFillColor = F.textContent
                                                                                } else {
                                                                                    if (A == "serieScatter") {
                                                                                        var L = U.serieScatters != undefined ? U.serieScatters : new Array();
                                                                                        var O = this.parseSerieScatter(F);
                                                                                        L.push(O);
                                                                                        U.serieScatters = L
                                                                                    } else {
                                                                                        if (A == "nameMap") {
                                                                                            var R = {};
                                                                                            var M = F.childNodes;
                                                                                            for (var P = 0; P < M.length; P++) {
                                                                                                var G = M[P];
                                                                                                R[G.getAttribute("key")] = G.getAttribute("value")
                                                                                            }
                                                                                            U.nameMap = R
                                                                                        } else {
                                                                                            if (A == "items") {
                                                                                                var K = new Array();
                                                                                                var T = F.childNodes;
                                                                                                for (var P = 0; P < T.length; P++) {
                                                                                                    var J = T[P];
                                                                                                    var B = J.nodeName;
                                                                                                    if (B == "item") {
                                                                                                        var S = {};
                                                                                                        S.pos = J.getAttribute("pos");
                                                                                                        S.name = J.getAttribute("name");
                                                                                                        K.push(S)
                                                                                                    }
                                                                                                }
                                                                                                U.items = K
                                                                                            } else {
                                                                                                if (A == "moveline") {
                                                                                                    var E = new Array();
                                                                                                    var D = F.childNodes;
                                                                                                    for (var P = 0; P < D.length; P++) {
                                                                                                        var I = D[P];
                                                                                                        var C = {};
                                                                                                        C.fromName = I.getAttribute("fromName");
                                                                                                        C.toName = I.getAttribute("toName");
                                                                                                        E.push(C)
                                                                                                    }
                                                                                                    U.movelines = E
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
    return U
};
RptXml.prototype.parseSerieScatter = function (C) {
    var F = C.childNodes;
    var D = {};
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "size") {
            D.size = this.getNodeInt(A)
        } else {
            if (E == "type") {
                D.type = A.textContent
            } else {
                if (E == "sortType") {
                    D.sortType = A.textContent
                } else {
                    if (E == "sortNum") {
                        D.sortNum = this.getNodeInt(A)
                    } else {
                        if (E == "color") {
                            D.color = A.textContent
                        } else {
                            if (E == "label") {
                                D.scatterLabel = this.parseScatterLable(A)
                            }
                        }
                    }
                }
            }
        }
    }
    return D
};
RptXml.prototype.parseScatterLable = function (D) {
    var F = D.childNodes;
    var C = {};
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "nameEnabled") {
            C.nameEnabled = this.getNodeBoolean(A)
        } else {
            if (E == "valueEnabled") {
                C.valueEnabled = this.getNodeBoolean(A)
            } else {
                if (E == "sizeEnabled") {
                    C.sizeEnabled = this.getNodeBoolean(A)
                } else {
                    if (E == "textStyle") {
                        C.textStyle = this.parseTextStyle(A)
                    }
                }
            }
        }
    }
    return C
};
RptXml.prototype.parseLabel = function (E, A) {
    var B = {};
    B.defaultEnabled = A;
    B.enabled = A;
    var G = E.childNodes;
    for (var D = 0; D < G.length; D++) {
        var C = G[D];
        var F = C.nodeName;
        if (F == "enabled") {
            B.enabled = this.getNodeBoolean(C)
        } else {
            if (F == "nameEnabled") {
                B.nameEnabled = this.getNodeBoolean(C)
            } else {
                if (F == "align") {
                    B.align = C.textContent
                } else {
                    if (F == "rotation") {
                        B.rotation = this.getNodeInt(C)
                    } else {
                        if (F == "format") {
                            B.format = C.textContent
                        } else {
                            if (F == "position") {
                                B.position = C.textContent
                            } else {
                                if (F == "textStyle") {
                                    B.textStyle = this.parseTextStyle(C)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return B
};
RptXml.prototype.parseTextStyle = function (C) {
    var F = C.childNodes;
    var D = {};
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "fontSize") {
            D.fontSize = this.getNodeInt(A)
        } else {
            if (E == "color") {
                D.color = A.textContent
            } else {
                if (E == "fontWeight") {
                    D.fontWeight = A.textContent
                } else {
                    if (E == "fontStyle") {
                        D.fontStyle = A.textContent
                    } else {
                        if (E == "textDecoration") {
                            D.textDecoration = A.textContent
                        }
                    }
                }
            }
        }
    }
    return D
};
RptXml.prototype.parseDiv = function (B) {
    var I = parseInt(B.getAttribute("x"));
    var G = parseInt(B.getAttribute("y"));
    var K = parseInt(B.getAttribute("w"));
    var E = parseInt(B.getAttribute("h"));
    var L = {};
    L.x = I;
    L.y = G;
    L.w = K;
    L.h = E;
    var F = B.childNodes;
    for (var D = 0; D < F.length; D++) {
        var A = F[D];
        var H = A.nodeName;
        if (H == "id") {
            if (A.textContent.startsWith("div")) {
                L.id = parseInt(A.textContent.substr("div".length))
            } else {
                L.id = this.getNodeInt(A, 0)
            }
            continue
        }
        if (H == "name") {
            L.name = A.textContent;
            continue
        }
        if (H == "printerFlag") {
            L.printerFlag = this.getNodeInt(A);
            continue
        }
        if (H == "fileOutFlag") {
            L.fileOutFlag = this.getNodeInt(A);
            continue
        }
        if (H == "text") {
            var C = {};
            C.orgName = A.textContent;
            L.content = C;
            L.mark = 0;
            continue
        }
        if (H == "chart") {
            var J = {};
            this.parseAllChart(A, J);
            L.content = J;
            L.mark = 3;
            continue
        }
        if (H == "linkages") {
            L.content.linkages = this.parseLinkages(A);
            continue
        }
        if (H == "cellLinked") {
            L.content.cellLinked = this.parseCellLinked(A);
            continue
        }
        if (H == "async") {
            L.content.asyncData = this.parseAsync(A);
            continue
        }
    }
    if (L.mark == 0) {
        divCoor.initDiv(L)
    } else {
        if (L.mark == 3) {
            divCoor.initChartDiv(L)
        }
    }
};
RptXml.prototype.parseView = function (P, L) {
    var F = P.childNodes;
    for (var Q = 0; Q < F.length; Q++) {
        var D = F[Q];
        var A = D.nodeName;
        if (A == "fixed") {
            this.parseFixed(D, L)
        } else {
            if (A == "hidden") {
                this.parseHiddenCell(D, L)
            } else {
                if (A == "header") {
                    this.parseHeaderCell(D, L)
                } else {
                    if (A == "tail") {
                        this.parseTailCell(D, L)
                    } else {
                        if (A == "repeat") {
                            this.parseRepeatCell(D, L)
                        } else {
                            if (A == "divide") {
                                var E = L.reportView ? L.reportView : {};
                                var N = this.parseDivide(D);
                                E.columnDivide = N;
                                L.reportView = E
                            }
                        }
                    }
                }
            }
        }
    }
    if (!L.reportView) {
        return
    }
    if (L.reportView.fixedCell) {
        var C = L.reportView.fixedCell;
        var I = C.rows;
        if (I != undefined && I.length > 0) {
            for (var Q = 0; Q < I.length; Q++) {
                var R = grid.getGridCell(I[Q] - 1, -1, 1, 1);
                var H = $(R.o);
                H.find("div").append("<i class='icon iconfont icon-dongjiexing icon-size-12'></i>")
            }
        }
        var B = C.columns;
        if (B != undefined && B.length > 0) {
            for (var Q = 0; Q < B.length; Q++) {
                var R = grid.getGridCell(-1, B[Q] - 1, 1, 1);
                var H = $(R.o);
                H.find("div").append("<i class='icon iconfont icon-liedongjie- icon-size-12'></i>")
            }
        }
    }
    if (L.reportView.hiddenCell) {
        var M = L.reportView.hiddenCell;
        var I = M.rows;
        if (I != undefined && I.length > 0) {
            for (var Q = 0; Q < I.length; Q++) {
                var R = grid.getGridCell(I[Q] - 1, -1, 1, 1);
                var H = $(R.o);
                H.find("div").append("<i class='icon iconfont icon-hidden icon-size-12'></i>")
            }
        }
        var J = M.cols;
        if (J != undefined && J.length > 0) {
            for (var Q = 0; Q < J.length; Q++) {
                var R = grid.getGridCell(-1, J[Q] - 1, 1, 1);
                var H = $(R.o);
                H.find("div").append("<i class='icon iconfont icon-hidden icon-size-12'></i>")
            }
        }
    }
    if (L.reportView.headerCell) {
        var O = L.reportView.headerCell;
        var I = O.rows;
        if (I != undefined && I.length > 0) {
            for (var Q = 0; Q < I.length; Q++) {
                var R = grid.getGridCell(I[Q] - 1, -1, 1, 1);
                var H = $(R.o);
                H.find("div").append("<i class='icon iconfont icon-header icon-size-12'></i>")
            }
        }
    }
    if (L.reportView.tailCell) {
        var K = L.reportView.tailCell;
        var I = K.rows;
        if (I != undefined && I.length > 0) {
            for (var Q = 0; Q < I.length; Q++) {
                var R = grid.getGridCell(I[Q] - 1, -1, 1, 1);
                var H = $(R.o);
                H.find("div").append("<i class='icon iconfont icon-T icon-size-12'></i>")
            }
        }
    }
    if (L.reportView.repeatCell) {
        var G = L.reportView.repeatCell;
        var I = G.rows;
        if (I != undefined && I.length > 0) {
            for (var Q = 0; Q < I.length; Q++) {
                var R = grid.getGridCell(I[Q] - 1, -1, 1, 1);
                var H = $(R.o);
                H.find("div").append("<i class='icon iconfont icon-zhongfujilu icon-size-12'></i>")
            }
        }
        var J = G.cols;
        if (J != undefined && J.length > 0) {
            for (var Q = 0; Q < J.length; Q++) {
                var R = grid.getGridCell(-1, J[Q] - 1, 1, 1);
                var H = $(R.o);
                H.find("div").append("<i class='icon iconfont icon-zhongfujilu icon-size-12'></i>")
            }
        }
    }
};
RptXml.prototype.parseFixed = function (K, J) {
    var G = K.childNodes;
    for (var M = 0; M < G.length; M++) {
        var D = G[M];
        var A = D.nodeName;
        if (A == "rows") {
            var R = D.textContent;
            var Q = R.split(",");
            for (var L = 0; L < Q.length; L++) {
                var N = parseInt(Q[L]);
                var E = J.reportView ? J.reportView : {};
                var C = E.fixedCell ? E.fixedCell : {};
                var H = C.rows ? C.rows : new Array();
                H.push(N + 1);
                C.rows = H;
                E.fixedCell = C;
                J.reportView = E
            }
        } else {
            if (A == "cols") {
                var O = D.textContent;
                var I = O.split(",");
                for (var P = 0; P < I.length; P++) {
                    var F = parseInt(I[P]);
                    var E = J.reportView ? J.reportView : {};
                    var C = E.fixedCell ? E.fixedCell : {};
                    var B = C.columns ? C.columns : new Array();
                    B.push(F + 1);
                    C.columns = B;
                    E.fixedCell = C;
                    J.reportView = E
                }
            }
        }
    }
};
RptXml.prototype.parseHiddenCell = function (D, A) {
    var I = D.childNodes;
    for (var G = 0; G < I.length; G++) {
        var B = I[G];
        var N = B.nodeName;
        if (N == "rows") {
            var J = B.textContent;
            var P = J.split(",");
            for (var F = 0; F < P.length; F++) {
                var M = parseInt(P[F]);
                var H = A.reportView ? A.reportView : {};
                var O = H.hiddenCell ? H.hiddenCell : {};
                var Q = O.rows ? O.rows : new Array();
                Q.push(M + 1);
                O.rows = Q;
                H.hiddenCell = O;
                A.reportView = H
            }
        } else {
            if (N == "cols") {
                var E = B.textContent;
                var L = E.split(",");
                for (var K = 0; K < L.length; K++) {
                    var C = parseInt(L[K]);
                    var H = A.reportView ? A.reportView : {};
                    var O = H.hiddenCell ? H.hiddenCell : {};
                    var L = O.cols ? O.cols : new Array();
                    L.push(C + 1);
                    O.cols = L;
                    H.hiddenCell = O;
                    A.reportView = H
                }
            }
        }
    }
};
RptXml.prototype.parseRepeatCell = function (E, A) {
    var J = E.childNodes;
    for (var H = 0; H < J.length; H++) {
        var B = J[H];
        var O = B.nodeName;
        if (O == "rows") {
            var K = B.textContent;
            var P = K.split(",");
            for (var G = 0; G < P.length; G++) {
                var N = parseInt(P[G]);
                var I = A.reportView ? A.reportView : {};
                var D = I.repeatCell ? I.repeatCell : {};
                var Q = D.rows ? D.rows : new Array();
                Q.push(N + 1);
                D.rows = Q;
                I.repeatCell = D;
                A.reportView = I
            }
        } else {
            if (O == "cols") {
                var F = B.textContent;
                var M = F.split(",");
                for (var L = 0; L < M.length; L++) {
                    var C = parseInt(M[L]);
                    var I = A.reportView ? A.reportView : {};
                    var D = I.repeatCell ? I.repeatCell : {};
                    var M = D.cols ? D.cols : new Array();
                    M.push(C + 1);
                    D.cols = M;
                    I.repeatCell = D;
                    A.reportView = I
                }
            }
        }
    }
};
RptXml.prototype.parseHeaderCell = function (C, A) {
    var H = C.childNodes;
    for (var F = 0; F < H.length; F++) {
        var B = H[F];
        var K = B.nodeName;
        if (K == "rows") {
            var I = B.textContent;
            var L = I.split(",");
            for (var D = 0; D < L.length; D++) {
                var J = parseInt(L[D]);
                var G = A.reportView ? A.reportView : {};
                var E = G.headerCell ? G.headerCell : {};
                var M = E.rows ? E.rows : new Array();
                M.push(J + 1);
                E.rows = M;
                G.headerCell = E;
                A.reportView = G
            }
        }
    }
};
RptXml.prototype.parseTailCell = function (C, A) {
    var G = C.childNodes;
    for (var E = 0; E < G.length; E++) {
        var B = G[E];
        var K = B.nodeName;
        if (K == "rows") {
            var H = B.textContent;
            var L = H.split(",");
            for (var D = 0; D < L.length; D++) {
                var J = parseInt(L[D]);
                var F = A.reportView ? A.reportView : {};
                var I = F.tailCell ? F.tailCell : {};
                var M = I.rows ? I.rows : new Array();
                M.push(J + 1);
                I.rows = M;
                F.tailCell = I;
                A.reportView = F
            }
        }
    }
};
RptXml.prototype.parseDivide = function (C) {
    var F = C.childNodes;
    var D = {};
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "type") {
            D.type = this.getNodeInt(A)
        } else {
            if (E == "num") {
                D.num = this.getNodeInt(A)
            } else {
                if (E == "gap") {
                    D.gap = this.getNodeInt(A)
                } else {
                    if (E == "area") {
                        D.area = A.textContent
                    }
                }
            }
        }
    }
    return D
};
RptXml.prototype.parsePanel = function (C) {
    var J = parseInt(C.getAttribute("x"));
    var H = parseInt(C.getAttribute("y"));
    var L = parseInt(C.getAttribute("w"));
    var E = parseInt(C.getAttribute("h"));
    var B = {};
    B.x = J;
    B.y = H;
    B.w = L;
    B.h = E;
    var G = C.childNodes;
    for (var D = 0; D < G.length; D++) {
        var A = G[D];
        var I = A.nodeName;
        if (I == "id") {
            if (A.textContent.startsWith("panel")) {
                B.id = parseInt(A.textContent.substr("panel".length))
            } else {
                B.id = this.getNodeInt(A, 0)
            }
            continue
        }
        if (I == "name") {
            B.name = A.textContent;
            continue
        }
        if (I == "title") {
            B.title = A.textContent;
            continue
        }
        if (I == "printerFlag") {
            B.printerFlag = this.getNodeInt(A);
            continue
        }
        if (I == "fileOutFlag") {
            B.fileOutFlag = this.getNodeInt(A);
            continue
        }
        if (I == "chart") {
            var K = {};
            this.parseAllChart(A, K);
            B.content = K;
            B.mark = 3;
            continue
        }
        if (I == "report") {
            var F = {};
            this.paresePanelReport(A, F);
            B.content = F;
            B.mark = 6;
            continue
        }
        if (I == "linkages") {
            B.content.linkages = this.parseLinkages(A);
            continue
        }
        if (I == "cellLinked") {
            B.content.cellLinked = this.parseCellLinked(A);
            continue
        }
        if (I == "async") {
            B.content.asyncData = this.parseAsync(A);
            continue
        }
    }
    if (B.mark == 3) {
        divCoor.initChartPanel(B)
    } else {
        if (B.mark == 6) {
            divCoor.initSubReportPanel(B)
        }
    }
};
RptXml.prototype.paresePanelReport = function (D, F) {
    var G = D.childNodes;
    var B = {};
    for (var E = 0; E < G.length; E++) {
        var C = G[E];
        var I = C.nodeName;
        if (I == "rptId") {
            F.rptId = C.textContent
        } else {
            if (I == "param") {
                var A = C.getAttribute("argName");
                var H = C.getAttribute("argValue");
                B[A] = H
            }
        }
    }
    F.argValueMap = B
};
RptXml.prototype.parsePanelCell = function (F) {
    var N = parseInt(F.getAttribute("rowNum"));
    var C = parseInt(F.getAttribute("colNum"));
    var L = parseInt(F.getAttribute("rowSpan"));
    var I = parseInt(F.getAttribute("colSpan"));
    var D = grid.getGridCell(N, C, L, I);
    D.mark = 8;
    var K = D.content;
    var J = F.childNodes;
    for (var H = 0; H < J.length; H++) {
        var B = J[H];
        var M = B.nodeName;
        if (M == "border") {
            var E = D.borderColor ? D.borderColor : {};
            var O = B.getAttribute("side");
            var A = B.getAttribute("color");
            var P = B.getAttribute("borderStyle");
            var G = B.getAttribute("borderWidth");
            var Q = {};
            Q.color = A;
            Q.borderStyle = P;
            Q.borderWidth = G;
            E[O] = Q;
            D.borderColor = E
        } else {
            if (M == "disType") {
                K.disType = this.getNodeInt(B)
            } else {
                if (M == "printerFlag") {
                    K.printerFlag = this.getNodeInt(B)
                } else {
                    if (M == "fileOutFlag") {
                        K.fileOutFlag = this.getNodeInt(B)
                    } else {
                        if (M == "panel") {
                            this.parseCellPanelContent(B, K)
                        } else {
                            if (M == "cellLinked") {
                                K.cellLinked = this.parseCellLinked(B)
                            } else {
                                if (M == "linkages") {
                                    K.linkages = this.parseLinkages(B)
                                } else {
                                    if (M == "async") {
                                        K.asyncData = this.parseAsync(B)
                                    } else {
                                        this.parseStyle(B, D)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    anyExcel.initCellPanel(D)
};
RptXml.prototype.parseCellPanelContent = function (C, G) {
    var F = C.childNodes;
    var B = {};
    for (var D = 0; D < F.length; D++) {
        var A = F[D];
        var H = A.nodeName;
        if (H == "title") {
            G.title = A.textContent
        } else {
            if (H == "titleColor") {
                G.titleColor = A.textContent
            } else {
                if (H == "titleFontWeight") {
                    G.titleFontWeight = A.textContent
                } else {
                    if (H == "titleFontStyle") {
                        G.titleFontStyle = A.textContent
                    } else {
                        if (H == "titleFontSize") {
                            G.titleFontSize = this.getNodeInt(A)
                        } else {
                            if (H == "titleHeight") {
                                G.titleHeight = this.getNodeInt(A)
                            } else {
                                if (H == "panelBorderColor") {
                                    G.panelBorderColor = A.textContent
                                } else {
                                    if (H == "panelBorderWidth") {
                                        G.panelBorderWidth = this.getNodeInt(A)
                                    } else {
                                        if (H == "panelBorderRadius") {
                                            G.panelBorderRadius = this.getNodeInt(A)
                                        } else {
                                            if (H == "titleBottomBorderWidth") {
                                                G.titleBottomBorderWidth = this.getNodeInt(A)
                                            } else {
                                                if (H == "panelBackground") {
                                                    G.panelBackground = A.textContent
                                                } else {
                                                    if (H == "chart") {
                                                        var I = {};
                                                        this.parseAllChart(A, I);
                                                        B.chartCell = I;
                                                        B.mark = 3
                                                    } else {
                                                        if (H == "report") {
                                                            var E = {};
                                                            this.paresePanelReport(A, E);
                                                            B.subReport = E;
                                                            B.mark = 6
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
    G.cellPanel = B
};
RptXml.prototype.parseCellFold = function (A) {
    var D = {};
    var F = A.childNodes;
    for (var C = 0; C < F.length; C++) {
        var B = F[C];
        var E = B.nodeName;
        if (E == "foldType") {
            D.foldType = this.getNodeInt(B)
        }
    }
    return D
};
RptXml.prototype.parseOrderBy = function (D) {
    var E = {};
    var G = D.childNodes;
    var C = new Array();
    for (var B = 0; B < G.length; B++) {
        var A = G[B];
        var F = A.nodeName;
        if (F == "type") {
            E.type = this.getNodeInt(A)
        } else {
            if (F == "dyn") {
                E.dyn = this.getNodeInt(A)
            } else {
                if (F == "column") {
                    C.push(A.textContent);
                    E.columns = C
                }
            }
        }
    }
    return E
};
RptXml.prototype.parseIconStyle = function (C) {
    var D = {};
    var F = C.childNodes;
    for (var B = 0; B < F.length; B++) {
        var A = F[B];
        var E = A.nodeName;
        if (E == "color") {
            D.color = A.textContent
        } else {
            if (E == "size") {
                D.size = this.getNodeInt(A)
            } else {
                if (E == "align") {
                    D.align = A.textContent
                } else {
                    if (E == "iconString") {
                        D.iconString = A.textContent
                    }
                }
            }
        }
    }
    return D
};
RptXml.prototype.parseChartTheme = function (D) {
    var E = {};
    var G = D.childNodes;
    for (var C = 0; C < G.length; C++) {
        var B = G[C];
        var F = B.nodeName;
        if (F == "name") {
            E.name = B.textContent
        } else {
            if (F == "color") {
                var A = B.textContent;
                E.colors = A.split(",")
            }
        }
    }
    return E
};
RptXml.prototype.parseStyleMap = function (D) {
    var K = {};
    var H = D.childNodes;
    for (var G = 0; G < H.length; G++) {
        var A = H[G];
        var L = A.nodeName;
        if (L == "data") {
            var F = new Array();
            var M = A.childNodes;
            for (var E = 0; E < M.length; E++) {
                var C = M[E];
                var J = C.nodeName;
                if (J == "item") {
                    var N = {};
                    N.key = C.getAttribute("key");
                    N.data = C.getAttribute("data");
                    F.push(N)
                }
            }
            K.data = F
        } else {
            if (L == "items") {
                var I = new Array();
                var B = A.childNodes;
                for (var E = 0; E < B.length; E++) {
                    var C = B[E];
                    var J = C.nodeName;
                    if (J == "item") {
                        var N = {};
                        N.pos = C.getAttribute("pos");
                        N.name = C.getAttribute("name");
                        I.push(N)
                    }
                }
                K.items = I
            }
        }
    }
    return K
};
RptXml.prototype.getNodeInt = function (C, B) {
    var A = parseInt(C.textContent);
    if (isNaN(A)) {
        return B != undefined ? B : 0
    }
    return A
};
RptXml.prototype.getNodeNumber = function (C, B) {
    var A = parseFloat(C.textContent);
    if (isNaN(A)) {
        return B != undefined ? B : 0
    }
    return A
};
RptXml.prototype.getNodeBoolean = function (C, B) {
    var A = C.textContent;
    if (A == "true") {
        return true
    }
    if (A == "") {
        return B != undefined ? B : false
    }
    return false
}