(window.webpackJsonp = window.webpackJsonp || []).push([
    [1],
    [, , function(e, t, r) {
        "use strict";
        var n = Object.prototype.hasOwnProperty;

        function s(e, t) {
            return !!e && n.call(e, t)
        }
        var o = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

        function i(e) {
            return !(e >= 55296 && e <= 57343) && (!(e >= 64976 && e <= 65007) && (65535 != (65535 & e) && 65534 != (65535 & e) && (!(e >= 0 && e <= 8) && (11 !== e && (!(e >= 14 && e <= 31) && (!(e >= 127 && e <= 159) && !(e > 1114111)))))))
        }

        function a(e) {
            if (e > 65535) {
                var t = 55296 + ((e -= 65536) >> 10),
                    r = 56320 + (1023 & e);
                return String.fromCharCode(t, r)
            }
            return String.fromCharCode(e)
        }
        var l = /&([a-z#][a-z0-9]{1,31});/gi,
            c = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,
            u = r(9);

        function p(e, t) {
            var r = 0;
            return s(u, t) ? u[t] : 35 === t.charCodeAt(0) && c.test(t) && i(r = "x" === t[1].toLowerCase() ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10)) ? a(r) : e
        }
        var h = /[&<>"]/,
            f = /[&<>"]/g,
            g = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;"
            };

        function d(e) {
            return g[e]
        }
        t.assign = function(e) {
                var t = [].slice.call(arguments, 1);
                return t.forEach((function(t) {
                        if (t) {
                            if ("object" != typeof t)
                                throw new TypeError(t + "must be object");
                            Object.keys(t).forEach((function(r) {
                                e[r] = t[r]
                            }))
                        }
                    })),
                    e
            },
            t.isString = function(e) {
                return "[object String]" === function(e) {
                    return Object.prototype.toString.call(e)
                }(e)
            },
            t.has = s,
            t.unescapeMd = function(e) {
                return e.indexOf("\\") < 0 ? e : e.replace(o, "$1")
            },
            t.isValidEntityCode = i,
            t.fromCodePoint = a,
            t.replaceEntities = function(e) {
                return e.indexOf("&") < 0 ? e : e.replace(l, p)
            },
            t.escapeHtml = function(e) {
                return h.test(e) ? e.replace(f, d) : e
            }
    }, , , function(e, t, r) {
        "use strict";

        function n() {
            this.__rules__ = [],
                this.__cache__ = null
        }
        n.prototype.__find__ = function(e) {
                for (var t = this.__rules__.length, r = -1; t--;)
                    if (this.__rules__[++r].name === e)
                        return r;
                return -1
            },
            n.prototype.__compile__ = function() {
                var e = this,
                    t = [""];
                e.__rules__.forEach((function(e) {
                        e.enabled && e.alt.forEach((function(e) {
                            t.indexOf(e) < 0 && t.push(e)
                        }))
                    })),
                    e.__cache__ = {},
                    t.forEach((function(t) {
                        e.__cache__[t] = [],
                            e.__rules__.forEach((function(r) {
                                r.enabled && (t && r.alt.indexOf(t) < 0 || e.__cache__[t].push(r.fn))
                            }))
                    }))
            },
            n.prototype.at = function(e, t, r) {
                var n = this.__find__(e),
                    s = r || {};
                if (-1 === n)
                    throw new Error("Parser rule not found: " + e);
                this.__rules__[n].fn = t,
                    this.__rules__[n].alt = s.alt || [],
                    this.__cache__ = null
            },
            n.prototype.before = function(e, t, r, n) {
                var s = this.__find__(e),
                    o = n || {};
                if (-1 === s)
                    throw new Error("Parser rule not found: " + e);
                this.__rules__.splice(s, 0, {
                        name: t,
                        enabled: !0,
                        fn: r,
                        alt: o.alt || []
                    }),
                    this.__cache__ = null
            },
            n.prototype.after = function(e, t, r, n) {
                var s = this.__find__(e),
                    o = n || {};
                if (-1 === s)
                    throw new Error("Parser rule not found: " + e);
                this.__rules__.splice(s + 1, 0, {
                        name: t,
                        enabled: !0,
                        fn: r,
                        alt: o.alt || []
                    }),
                    this.__cache__ = null
            },
            n.prototype.push = function(e, t, r) {
                var n = r || {};
                this.__rules__.push({
                        name: e,
                        enabled: !0,
                        fn: t,
                        alt: n.alt || []
                    }),
                    this.__cache__ = null
            },
            n.prototype.enable = function(e, t) {
                e = Array.isArray(e) ? e : [e],
                    t && this.__rules__.forEach((function(e) {
                        e.enabled = !1
                    })),
                    e.forEach((function(e) {
                        var t = this.__find__(e);
                        if (t < 0)
                            throw new Error("Rules manager: invalid rule name " + e);
                        this.__rules__[t].enabled = !0
                    }), this),
                    this.__cache__ = null
            },
            n.prototype.disable = function(e) {
                (e = Array.isArray(e) ? e : [e]).forEach((function(e) {
                        var t = this.__find__(e);
                        if (t < 0)
                            throw new Error("Rules manager: invalid rule name " + e);
                        this.__rules__[t].enabled = !1
                    }), this),
                    this.__cache__ = null
            },
            n.prototype.getRules = function(e) {
                return null === this.__cache__ && this.__compile__(),
                    this.__cache__[e] || []
            },
            e.exports = n
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            var r, n, s, o = -1,
                i = e.posMax,
                a = e.pos,
                l = e.isInLabel;
            if (e.isInLabel)
                return -1;
            if (e.labelUnmatchedScopes)
                return e.labelUnmatchedScopes--, -1;
            for (e.pos = t + 1,
                e.isInLabel = !0,
                r = 1; e.pos < i;) {
                if (91 === (s = e.src.charCodeAt(e.pos)))
                    r++;
                else if (93 === s && 0 === --r) {
                    n = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return n ? (o = e.pos,
                    e.labelUnmatchedScopes = 0) : e.labelUnmatchedScopes = r - 1,
                e.pos = a,
                e.isInLabel = l,
                o
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = r(16)
    }, function(e, t, r) {
        "use strict";

        function n(e, t, r, n, s) {
            this.src = e,
                this.env = n,
                this.options = r,
                this.parser = t,
                this.tokens = s,
                this.pos = 0,
                this.posMax = this.src.length,
                this.level = 0,
                this.pending = "",
                this.pendingLevel = 0,
                this.cache = [],
                this.isInLabel = !1,
                this.linkLevel = 0,
                this.linkContent = "",
                this.labelUnmatchedScopes = 0
        }
        n.prototype.pushPending = function() {
                this.tokens.push({
                        type: "text",
                        content: this.pending,
                        level: this.pendingLevel
                    }),
                    this.pending = ""
            },
            n.prototype.push = function(e) {
                this.pending && this.pushPending(),
                    this.tokens.push(e),
                    this.pendingLevel = this.level
            },
            n.prototype.cacheSet = function(e, t) {
                for (var r = this.cache.length; r <= e; r++)
                    this.cache.push(0);
                this.cache[e] = t
            },
            n.prototype.cacheGet = function(e) {
                return e < this.cache.length ? this.cache[e] : 0
            },
            e.exports = n
    }, function(e, t, r) {
        "use strict";
        e.exports = {
            Aacute: "Á",
            aacute: "á",
            Abreve: "Ă",
            abreve: "ă",
            ac: "∾",
            acd: "∿",
            acE: "∾̳",
            Acirc: "Â",
            acirc: "â",
            acute: "´",
            Acy: "А",
            acy: "а",
            AElig: "Æ",
            aelig: "æ",
            af: "⁡",
            Afr: "𝔄",
            afr: "𝔞",
            Agrave: "À",
            agrave: "à",
            alefsym: "ℵ",
            aleph: "ℵ",
            Alpha: "Α",
            alpha: "α",
            Amacr: "Ā",
            amacr: "ā",
            amalg: "⨿",
            AMP: "&",
            amp: "&",
            And: "⩓",
            and: "∧",
            andand: "⩕",
            andd: "⩜",
            andslope: "⩘",
            andv: "⩚",
            ang: "∠",
            ange: "⦤",
            angle: "∠",
            angmsd: "∡",
            angmsdaa: "⦨",
            angmsdab: "⦩",
            angmsdac: "⦪",
            angmsdad: "⦫",
            angmsdae: "⦬",
            angmsdaf: "⦭",
            angmsdag: "⦮",
            angmsdah: "⦯",
            angrt: "∟",
            angrtvb: "⊾",
            angrtvbd: "⦝",
            angsph: "∢",
            angst: "Å",
            angzarr: "⍼",
            Aogon: "Ą",
            aogon: "ą",
            Aopf: "𝔸",
            aopf: "𝕒",
            ap: "≈",
            apacir: "⩯",
            apE: "⩰",
            ape: "≊",
            apid: "≋",
            apos: "'",
            ApplyFunction: "⁡",
            approx: "≈",
            approxeq: "≊",
            Aring: "Å",
            aring: "å",
            Ascr: "𝒜",
            ascr: "𝒶",
            Assign: "≔",
            ast: "*",
            asymp: "≈",
            asympeq: "≍",
            Atilde: "Ã",
            atilde: "ã",
            Auml: "Ä",
            auml: "ä",
            awconint: "∳",
            awint: "⨑",
            backcong: "≌",
            backepsilon: "϶",
            backprime: "‵",
            backsim: "∽",
            backsimeq: "⋍",
            Backslash: "∖",
            Barv: "⫧",
            barvee: "⊽",
            Barwed: "⌆",
            barwed: "⌅",
            barwedge: "⌅",
            bbrk: "⎵",
            bbrktbrk: "⎶",
            bcong: "≌",
            Bcy: "Б",
            bcy: "б",
            bdquo: "„",
            becaus: "∵",
            Because: "∵",
            because: "∵",
            bemptyv: "⦰",
            bepsi: "϶",
            bernou: "ℬ",
            Bernoullis: "ℬ",
            Beta: "Β",
            beta: "β",
            beth: "ℶ",
            between: "≬",
            Bfr: "𝔅",
            bfr: "𝔟",
            bigcap: "⋂",
            bigcirc: "◯",
            bigcup: "⋃",
            bigodot: "⨀",
            bigoplus: "⨁",
            bigotimes: "⨂",
            bigsqcup: "⨆",
            bigstar: "★",
            bigtriangledown: "▽",
            bigtriangleup: "△",
            biguplus: "⨄",
            bigvee: "⋁",
            bigwedge: "⋀",
            bkarow: "⤍",
            blacklozenge: "⧫",
            blacksquare: "▪",
            blacktriangle: "▴",
            blacktriangledown: "▾",
            blacktriangleleft: "◂",
            blacktriangleright: "▸",
            blank: "␣",
            blk12: "▒",
            blk14: "░",
            blk34: "▓",
            block: "█",
            bne: "=⃥",
            bnequiv: "≡⃥",
            bNot: "⫭",
            bnot: "⌐",
            Bopf: "𝔹",
            bopf: "𝕓",
            bot: "⊥",
            bottom: "⊥",
            bowtie: "⋈",
            boxbox: "⧉",
            boxDL: "╗",
            boxDl: "╖",
            boxdL: "╕",
            boxdl: "┐",
            boxDR: "╔",
            boxDr: "╓",
            boxdR: "╒",
            boxdr: "┌",
            boxH: "═",
            boxh: "─",
            boxHD: "╦",
            boxHd: "╤",
            boxhD: "╥",
            boxhd: "┬",
            boxHU: "╩",
            boxHu: "╧",
            boxhU: "╨",
            boxhu: "┴",
            boxminus: "⊟",
            boxplus: "⊞",
            boxtimes: "⊠",
            boxUL: "╝",
            boxUl: "╜",
            boxuL: "╛",
            boxul: "┘",
            boxUR: "╚",
            boxUr: "╙",
            boxuR: "╘",
            boxur: "└",
            boxV: "║",
            boxv: "│",
            boxVH: "╬",
            boxVh: "╫",
            boxvH: "╪",
            boxvh: "┼",
            boxVL: "╣",
            boxVl: "╢",
            boxvL: "╡",
            boxvl: "┤",
            boxVR: "╠",
            boxVr: "╟",
            boxvR: "╞",
            boxvr: "├",
            bprime: "‵",
            Breve: "˘",
            breve: "˘",
            brvbar: "¦",
            Bscr: "ℬ",
            bscr: "𝒷",
            bsemi: "⁏",
            bsim: "∽",
            bsime: "⋍",
            bsol: "\\",
            bsolb: "⧅",
            bsolhsub: "⟈",
            bull: "•",
            bullet: "•",
            bump: "≎",
            bumpE: "⪮",
            bumpe: "≏",
            Bumpeq: "≎",
            bumpeq: "≏",
            Cacute: "Ć",
            cacute: "ć",
            Cap: "⋒",
            cap: "∩",
            capand: "⩄",
            capbrcup: "⩉",
            capcap: "⩋",
            capcup: "⩇",
            capdot: "⩀",
            CapitalDifferentialD: "ⅅ",
            caps: "∩︀",
            caret: "⁁",
            caron: "ˇ",
            Cayleys: "ℭ",
            ccaps: "⩍",
            Ccaron: "Č",
            ccaron: "č",
            Ccedil: "Ç",
            ccedil: "ç",
            Ccirc: "Ĉ",
            ccirc: "ĉ",
            Cconint: "∰",
            ccups: "⩌",
            ccupssm: "⩐",
            Cdot: "Ċ",
            cdot: "ċ",
            cedil: "¸",
            Cedilla: "¸",
            cemptyv: "⦲",
            cent: "¢",
            CenterDot: "·",
            centerdot: "·",
            Cfr: "ℭ",
            cfr: "𝔠",
            CHcy: "Ч",
            chcy: "ч",
            check: "✓",
            checkmark: "✓",
            Chi: "Χ",
            chi: "χ",
            cir: "○",
            circ: "ˆ",
            circeq: "≗",
            circlearrowleft: "↺",
            circlearrowright: "↻",
            circledast: "⊛",
            circledcirc: "⊚",
            circleddash: "⊝",
            CircleDot: "⊙",
            circledR: "®",
            circledS: "Ⓢ",
            CircleMinus: "⊖",
            CirclePlus: "⊕",
            CircleTimes: "⊗",
            cirE: "⧃",
            cire: "≗",
            cirfnint: "⨐",
            cirmid: "⫯",
            cirscir: "⧂",
            ClockwiseContourIntegral: "∲",
            CloseCurlyDoubleQuote: "”",
            CloseCurlyQuote: "’",
            clubs: "♣",
            clubsuit: "♣",
            Colon: "∷",
            colon: ":",
            Colone: "⩴",
            colone: "≔",
            coloneq: "≔",
            comma: ",",
            commat: "@",
            comp: "∁",
            compfn: "∘",
            complement: "∁",
            complexes: "ℂ",
            cong: "≅",
            congdot: "⩭",
            Congruent: "≡",
            Conint: "∯",
            conint: "∮",
            ContourIntegral: "∮",
            Copf: "ℂ",
            copf: "𝕔",
            coprod: "∐",
            Coproduct: "∐",
            COPY: "©",
            copy: "©",
            copysr: "℗",
            CounterClockwiseContourIntegral: "∳",
            crarr: "↵",
            Cross: "⨯",
            cross: "✗",
            Cscr: "𝒞",
            cscr: "𝒸",
            csub: "⫏",
            csube: "⫑",
            csup: "⫐",
            csupe: "⫒",
            ctdot: "⋯",
            cudarrl: "⤸",
            cudarrr: "⤵",
            cuepr: "⋞",
            cuesc: "⋟",
            cularr: "↶",
            cularrp: "⤽",
            Cup: "⋓",
            cup: "∪",
            cupbrcap: "⩈",
            CupCap: "≍",
            cupcap: "⩆",
            cupcup: "⩊",
            cupdot: "⊍",
            cupor: "⩅",
            cups: "∪︀",
            curarr: "↷",
            curarrm: "⤼",
            curlyeqprec: "⋞",
            curlyeqsucc: "⋟",
            curlyvee: "⋎",
            curlywedge: "⋏",
            curren: "¤",
            curvearrowleft: "↶",
            curvearrowright: "↷",
            cuvee: "⋎",
            cuwed: "⋏",
            cwconint: "∲",
            cwint: "∱",
            cylcty: "⌭",
            Dagger: "‡",
            dagger: "†",
            daleth: "ℸ",
            Darr: "↡",
            dArr: "⇓",
            darr: "↓",
            dash: "‐",
            Dashv: "⫤",
            dashv: "⊣",
            dbkarow: "⤏",
            dblac: "˝",
            Dcaron: "Ď",
            dcaron: "ď",
            Dcy: "Д",
            dcy: "д",
            DD: "ⅅ",
            dd: "ⅆ",
            ddagger: "‡",
            ddarr: "⇊",
            DDotrahd: "⤑",
            ddotseq: "⩷",
            deg: "°",
            Del: "∇",
            Delta: "Δ",
            delta: "δ",
            demptyv: "⦱",
            dfisht: "⥿",
            Dfr: "𝔇",
            dfr: "𝔡",
            dHar: "⥥",
            dharl: "⇃",
            dharr: "⇂",
            DiacriticalAcute: "´",
            DiacriticalDot: "˙",
            DiacriticalDoubleAcute: "˝",
            DiacriticalGrave: "`",
            DiacriticalTilde: "˜",
            diam: "⋄",
            Diamond: "⋄",
            diamond: "⋄",
            diamondsuit: "♦",
            diams: "♦",
            die: "¨",
            DifferentialD: "ⅆ",
            digamma: "ϝ",
            disin: "⋲",
            div: "÷",
            divide: "÷",
            divideontimes: "⋇",
            divonx: "⋇",
            DJcy: "Ђ",
            djcy: "ђ",
            dlcorn: "⌞",
            dlcrop: "⌍",
            dollar: "$",
            Dopf: "𝔻",
            dopf: "𝕕",
            Dot: "¨",
            dot: "˙",
            DotDot: "⃜",
            doteq: "≐",
            doteqdot: "≑",
            DotEqual: "≐",
            dotminus: "∸",
            dotplus: "∔",
            dotsquare: "⊡",
            doublebarwedge: "⌆",
            DoubleContourIntegral: "∯",
            DoubleDot: "¨",
            DoubleDownArrow: "⇓",
            DoubleLeftArrow: "⇐",
            DoubleLeftRightArrow: "⇔",
            DoubleLeftTee: "⫤",
            DoubleLongLeftArrow: "⟸",
            DoubleLongLeftRightArrow: "⟺",
            DoubleLongRightArrow: "⟹",
            DoubleRightArrow: "⇒",
            DoubleRightTee: "⊨",
            DoubleUpArrow: "⇑",
            DoubleUpDownArrow: "⇕",
            DoubleVerticalBar: "∥",
            DownArrow: "↓",
            Downarrow: "⇓",
            downarrow: "↓",
            DownArrowBar: "⤓",
            DownArrowUpArrow: "⇵",
            DownBreve: "̑",
            downdownarrows: "⇊",
            downharpoonleft: "⇃",
            downharpoonright: "⇂",
            DownLeftRightVector: "⥐",
            DownLeftTeeVector: "⥞",
            DownLeftVector: "↽",
            DownLeftVectorBar: "⥖",
            DownRightTeeVector: "⥟",
            DownRightVector: "⇁",
            DownRightVectorBar: "⥗",
            DownTee: "⊤",
            DownTeeArrow: "↧",
            drbkarow: "⤐",
            drcorn: "⌟",
            drcrop: "⌌",
            Dscr: "𝒟",
            dscr: "𝒹",
            DScy: "Ѕ",
            dscy: "ѕ",
            dsol: "⧶",
            Dstrok: "Đ",
            dstrok: "đ",
            dtdot: "⋱",
            dtri: "▿",
            dtrif: "▾",
            duarr: "⇵",
            duhar: "⥯",
            dwangle: "⦦",
            DZcy: "Џ",
            dzcy: "џ",
            dzigrarr: "⟿",
            Eacute: "É",
            eacute: "é",
            easter: "⩮",
            Ecaron: "Ě",
            ecaron: "ě",
            ecir: "≖",
            Ecirc: "Ê",
            ecirc: "ê",
            ecolon: "≕",
            Ecy: "Э",
            ecy: "э",
            eDDot: "⩷",
            Edot: "Ė",
            eDot: "≑",
            edot: "ė",
            ee: "ⅇ",
            efDot: "≒",
            Efr: "𝔈",
            efr: "𝔢",
            eg: "⪚",
            Egrave: "È",
            egrave: "è",
            egs: "⪖",
            egsdot: "⪘",
            el: "⪙",
            Element: "∈",
            elinters: "⏧",
            ell: "ℓ",
            els: "⪕",
            elsdot: "⪗",
            Emacr: "Ē",
            emacr: "ē",
            empty: "∅",
            emptyset: "∅",
            EmptySmallSquare: "◻",
            emptyv: "∅",
            EmptyVerySmallSquare: "▫",
            emsp: " ",
            emsp13: " ",
            emsp14: " ",
            ENG: "Ŋ",
            eng: "ŋ",
            ensp: " ",
            Eogon: "Ę",
            eogon: "ę",
            Eopf: "𝔼",
            eopf: "𝕖",
            epar: "⋕",
            eparsl: "⧣",
            eplus: "⩱",
            epsi: "ε",
            Epsilon: "Ε",
            epsilon: "ε",
            epsiv: "ϵ",
            eqcirc: "≖",
            eqcolon: "≕",
            eqsim: "≂",
            eqslantgtr: "⪖",
            eqslantless: "⪕",
            Equal: "⩵",
            equals: "=",
            EqualTilde: "≂",
            equest: "≟",
            Equilibrium: "⇌",
            equiv: "≡",
            equivDD: "⩸",
            eqvparsl: "⧥",
            erarr: "⥱",
            erDot: "≓",
            Escr: "ℰ",
            escr: "ℯ",
            esdot: "≐",
            Esim: "⩳",
            esim: "≂",
            Eta: "Η",
            eta: "η",
            ETH: "Ð",
            eth: "ð",
            Euml: "Ë",
            euml: "ë",
            euro: "€",
            excl: "!",
            exist: "∃",
            Exists: "∃",
            expectation: "ℰ",
            ExponentialE: "ⅇ",
            exponentiale: "ⅇ",
            fallingdotseq: "≒",
            Fcy: "Ф",
            fcy: "ф",
            female: "♀",
            ffilig: "ﬃ",
            fflig: "ﬀ",
            ffllig: "ﬄ",
            Ffr: "𝔉",
            ffr: "𝔣",
            filig: "ﬁ",
            FilledSmallSquare: "◼",
            FilledVerySmallSquare: "▪",
            fjlig: "fj",
            flat: "♭",
            fllig: "ﬂ",
            fltns: "▱",
            fnof: "ƒ",
            Fopf: "𝔽",
            fopf: "𝕗",
            ForAll: "∀",
            forall: "∀",
            fork: "⋔",
            forkv: "⫙",
            Fouriertrf: "ℱ",
            fpartint: "⨍",
            frac12: "½",
            frac13: "⅓",
            frac14: "¼",
            frac15: "⅕",
            frac16: "⅙",
            frac18: "⅛",
            frac23: "⅔",
            frac25: "⅖",
            frac34: "¾",
            frac35: "⅗",
            frac38: "⅜",
            frac45: "⅘",
            frac56: "⅚",
            frac58: "⅝",
            frac78: "⅞",
            frasl: "⁄",
            frown: "⌢",
            Fscr: "ℱ",
            fscr: "𝒻",
            gacute: "ǵ",
            Gamma: "Γ",
            gamma: "γ",
            Gammad: "Ϝ",
            gammad: "ϝ",
            gap: "⪆",
            Gbreve: "Ğ",
            gbreve: "ğ",
            Gcedil: "Ģ",
            Gcirc: "Ĝ",
            gcirc: "ĝ",
            Gcy: "Г",
            gcy: "г",
            Gdot: "Ġ",
            gdot: "ġ",
            gE: "≧",
            ge: "≥",
            gEl: "⪌",
            gel: "⋛",
            geq: "≥",
            geqq: "≧",
            geqslant: "⩾",
            ges: "⩾",
            gescc: "⪩",
            gesdot: "⪀",
            gesdoto: "⪂",
            gesdotol: "⪄",
            gesl: "⋛︀",
            gesles: "⪔",
            Gfr: "𝔊",
            gfr: "𝔤",
            Gg: "⋙",
            gg: "≫",
            ggg: "⋙",
            gimel: "ℷ",
            GJcy: "Ѓ",
            gjcy: "ѓ",
            gl: "≷",
            gla: "⪥",
            glE: "⪒",
            glj: "⪤",
            gnap: "⪊",
            gnapprox: "⪊",
            gnE: "≩",
            gne: "⪈",
            gneq: "⪈",
            gneqq: "≩",
            gnsim: "⋧",
            Gopf: "𝔾",
            gopf: "𝕘",
            grave: "`",
            GreaterEqual: "≥",
            GreaterEqualLess: "⋛",
            GreaterFullEqual: "≧",
            GreaterGreater: "⪢",
            GreaterLess: "≷",
            GreaterSlantEqual: "⩾",
            GreaterTilde: "≳",
            Gscr: "𝒢",
            gscr: "ℊ",
            gsim: "≳",
            gsime: "⪎",
            gsiml: "⪐",
            GT: ">",
            Gt: "≫",
            gt: ">",
            gtcc: "⪧",
            gtcir: "⩺",
            gtdot: "⋗",
            gtlPar: "⦕",
            gtquest: "⩼",
            gtrapprox: "⪆",
            gtrarr: "⥸",
            gtrdot: "⋗",
            gtreqless: "⋛",
            gtreqqless: "⪌",
            gtrless: "≷",
            gtrsim: "≳",
            gvertneqq: "≩︀",
            gvnE: "≩︀",
            Hacek: "ˇ",
            hairsp: " ",
            half: "½",
            hamilt: "ℋ",
            HARDcy: "Ъ",
            hardcy: "ъ",
            hArr: "⇔",
            harr: "↔",
            harrcir: "⥈",
            harrw: "↭",
            Hat: "^",
            hbar: "ℏ",
            Hcirc: "Ĥ",
            hcirc: "ĥ",
            hearts: "♥",
            heartsuit: "♥",
            hellip: "…",
            hercon: "⊹",
            Hfr: "ℌ",
            hfr: "𝔥",
            HilbertSpace: "ℋ",
            hksearow: "⤥",
            hkswarow: "⤦",
            hoarr: "⇿",
            homtht: "∻",
            hookleftarrow: "↩",
            hookrightarrow: "↪",
            Hopf: "ℍ",
            hopf: "𝕙",
            horbar: "―",
            HorizontalLine: "─",
            Hscr: "ℋ",
            hscr: "𝒽",
            hslash: "ℏ",
            Hstrok: "Ħ",
            hstrok: "ħ",
            HumpDownHump: "≎",
            HumpEqual: "≏",
            hybull: "⁃",
            hyphen: "‐",
            Iacute: "Í",
            iacute: "í",
            ic: "⁣",
            Icirc: "Î",
            icirc: "î",
            Icy: "И",
            icy: "и",
            Idot: "İ",
            IEcy: "Е",
            iecy: "е",
            iexcl: "¡",
            iff: "⇔",
            Ifr: "ℑ",
            ifr: "𝔦",
            Igrave: "Ì",
            igrave: "ì",
            ii: "ⅈ",
            iiiint: "⨌",
            iiint: "∭",
            iinfin: "⧜",
            iiota: "℩",
            IJlig: "Ĳ",
            ijlig: "ĳ",
            Im: "ℑ",
            Imacr: "Ī",
            imacr: "ī",
            image: "ℑ",
            ImaginaryI: "ⅈ",
            imagline: "ℐ",
            imagpart: "ℑ",
            imath: "ı",
            imof: "⊷",
            imped: "Ƶ",
            Implies: "⇒",
            in: "∈",
            incare: "℅",
            infin: "∞",
            infintie: "⧝",
            inodot: "ı",
            Int: "∬",
            int: "∫",
            intcal: "⊺",
            integers: "ℤ",
            Integral: "∫",
            intercal: "⊺",
            Intersection: "⋂",
            intlarhk: "⨗",
            intprod: "⨼",
            InvisibleComma: "⁣",
            InvisibleTimes: "⁢",
            IOcy: "Ё",
            iocy: "ё",
            Iogon: "Į",
            iogon: "į",
            Iopf: "𝕀",
            iopf: "𝕚",
            Iota: "Ι",
            iota: "ι",
            iprod: "⨼",
            iquest: "¿",
            Iscr: "ℐ",
            iscr: "𝒾",
            isin: "∈",
            isindot: "⋵",
            isinE: "⋹",
            isins: "⋴",
            isinsv: "⋳",
            isinv: "∈",
            it: "⁢",
            Itilde: "Ĩ",
            itilde: "ĩ",
            Iukcy: "І",
            iukcy: "і",
            Iuml: "Ï",
            iuml: "ï",
            Jcirc: "Ĵ",
            jcirc: "ĵ",
            Jcy: "Й",
            jcy: "й",
            Jfr: "𝔍",
            jfr: "𝔧",
            jmath: "ȷ",
            Jopf: "𝕁",
            jopf: "𝕛",
            Jscr: "𝒥",
            jscr: "𝒿",
            Jsercy: "Ј",
            jsercy: "ј",
            Jukcy: "Є",
            jukcy: "є",
            Kappa: "Κ",
            kappa: "κ",
            kappav: "ϰ",
            Kcedil: "Ķ",
            kcedil: "ķ",
            Kcy: "К",
            kcy: "к",
            Kfr: "𝔎",
            kfr: "𝔨",
            kgreen: "ĸ",
            KHcy: "Х",
            khcy: "х",
            KJcy: "Ќ",
            kjcy: "ќ",
            Kopf: "𝕂",
            kopf: "𝕜",
            Kscr: "𝒦",
            kscr: "𝓀",
            lAarr: "⇚",
            Lacute: "Ĺ",
            lacute: "ĺ",
            laemptyv: "⦴",
            lagran: "ℒ",
            Lambda: "Λ",
            lambda: "λ",
            Lang: "⟪",
            lang: "⟨",
            langd: "⦑",
            langle: "⟨",
            lap: "⪅",
            Laplacetrf: "ℒ",
            laquo: "«",
            Larr: "↞",
            lArr: "⇐",
            larr: "←",
            larrb: "⇤",
            larrbfs: "⤟",
            larrfs: "⤝",
            larrhk: "↩",
            larrlp: "↫",
            larrpl: "⤹",
            larrsim: "⥳",
            larrtl: "↢",
            lat: "⪫",
            lAtail: "⤛",
            latail: "⤙",
            late: "⪭",
            lates: "⪭︀",
            lBarr: "⤎",
            lbarr: "⤌",
            lbbrk: "❲",
            lbrace: "{",
            lbrack: "[",
            lbrke: "⦋",
            lbrksld: "⦏",
            lbrkslu: "⦍",
            Lcaron: "Ľ",
            lcaron: "ľ",
            Lcedil: "Ļ",
            lcedil: "ļ",
            lceil: "⌈",
            lcub: "{",
            Lcy: "Л",
            lcy: "л",
            ldca: "⤶",
            ldquo: "“",
            ldquor: "„",
            ldrdhar: "⥧",
            ldrushar: "⥋",
            ldsh: "↲",
            lE: "≦",
            le: "≤",
            LeftAngleBracket: "⟨",
            LeftArrow: "←",
            Leftarrow: "⇐",
            leftarrow: "←",
            LeftArrowBar: "⇤",
            LeftArrowRightArrow: "⇆",
            leftarrowtail: "↢",
            LeftCeiling: "⌈",
            LeftDoubleBracket: "⟦",
            LeftDownTeeVector: "⥡",
            LeftDownVector: "⇃",
            LeftDownVectorBar: "⥙",
            LeftFloor: "⌊",
            leftharpoondown: "↽",
            leftharpoonup: "↼",
            leftleftarrows: "⇇",
            LeftRightArrow: "↔",
            Leftrightarrow: "⇔",
            leftrightarrow: "↔",
            leftrightarrows: "⇆",
            leftrightharpoons: "⇋",
            leftrightsquigarrow: "↭",
            LeftRightVector: "⥎",
            LeftTee: "⊣",
            LeftTeeArrow: "↤",
            LeftTeeVector: "⥚",
            leftthreetimes: "⋋",
            LeftTriangle: "⊲",
            LeftTriangleBar: "⧏",
            LeftTriangleEqual: "⊴",
            LeftUpDownVector: "⥑",
            LeftUpTeeVector: "⥠",
            LeftUpVector: "↿",
            LeftUpVectorBar: "⥘",
            LeftVector: "↼",
            LeftVectorBar: "⥒",
            lEg: "⪋",
            leg: "⋚",
            leq: "≤",
            leqq: "≦",
            leqslant: "⩽",
            les: "⩽",
            lescc: "⪨",
            lesdot: "⩿",
            lesdoto: "⪁",
            lesdotor: "⪃",
            lesg: "⋚︀",
            lesges: "⪓",
            lessapprox: "⪅",
            lessdot: "⋖",
            lesseqgtr: "⋚",
            lesseqqgtr: "⪋",
            LessEqualGreater: "⋚",
            LessFullEqual: "≦",
            LessGreater: "≶",
            lessgtr: "≶",
            LessLess: "⪡",
            lesssim: "≲",
            LessSlantEqual: "⩽",
            LessTilde: "≲",
            lfisht: "⥼",
            lfloor: "⌊",
            Lfr: "𝔏",
            lfr: "𝔩",
            lg: "≶",
            lgE: "⪑",
            lHar: "⥢",
            lhard: "↽",
            lharu: "↼",
            lharul: "⥪",
            lhblk: "▄",
            LJcy: "Љ",
            ljcy: "љ",
            Ll: "⋘",
            ll: "≪",
            llarr: "⇇",
            llcorner: "⌞",
            Lleftarrow: "⇚",
            llhard: "⥫",
            lltri: "◺",
            Lmidot: "Ŀ",
            lmidot: "ŀ",
            lmoust: "⎰",
            lmoustache: "⎰",
            lnap: "⪉",
            lnapprox: "⪉",
            lnE: "≨",
            lne: "⪇",
            lneq: "⪇",
            lneqq: "≨",
            lnsim: "⋦",
            loang: "⟬",
            loarr: "⇽",
            lobrk: "⟦",
            LongLeftArrow: "⟵",
            Longleftarrow: "⟸",
            longleftarrow: "⟵",
            LongLeftRightArrow: "⟷",
            Longleftrightarrow: "⟺",
            longleftrightarrow: "⟷",
            longmapsto: "⟼",
            LongRightArrow: "⟶",
            Longrightarrow: "⟹",
            longrightarrow: "⟶",
            looparrowleft: "↫",
            looparrowright: "↬",
            lopar: "⦅",
            Lopf: "𝕃",
            lopf: "𝕝",
            loplus: "⨭",
            lotimes: "⨴",
            lowast: "∗",
            lowbar: "_",
            LowerLeftArrow: "↙",
            LowerRightArrow: "↘",
            loz: "◊",
            lozenge: "◊",
            lozf: "⧫",
            lpar: "(",
            lparlt: "⦓",
            lrarr: "⇆",
            lrcorner: "⌟",
            lrhar: "⇋",
            lrhard: "⥭",
            lrm: "‎",
            lrtri: "⊿",
            lsaquo: "‹",
            Lscr: "ℒ",
            lscr: "𝓁",
            Lsh: "↰",
            lsh: "↰",
            lsim: "≲",
            lsime: "⪍",
            lsimg: "⪏",
            lsqb: "[",
            lsquo: "‘",
            lsquor: "‚",
            Lstrok: "Ł",
            lstrok: "ł",
            LT: "<",
            Lt: "≪",
            lt: "<",
            ltcc: "⪦",
            ltcir: "⩹",
            ltdot: "⋖",
            lthree: "⋋",
            ltimes: "⋉",
            ltlarr: "⥶",
            ltquest: "⩻",
            ltri: "◃",
            ltrie: "⊴",
            ltrif: "◂",
            ltrPar: "⦖",
            lurdshar: "⥊",
            luruhar: "⥦",
            lvertneqq: "≨︀",
            lvnE: "≨︀",
            macr: "¯",
            male: "♂",
            malt: "✠",
            maltese: "✠",
            Map: "⤅",
            map: "↦",
            mapsto: "↦",
            mapstodown: "↧",
            mapstoleft: "↤",
            mapstoup: "↥",
            marker: "▮",
            mcomma: "⨩",
            Mcy: "М",
            mcy: "м",
            mdash: "—",
            mDDot: "∺",
            measuredangle: "∡",
            MediumSpace: " ",
            Mellintrf: "ℳ",
            Mfr: "𝔐",
            mfr: "𝔪",
            mho: "℧",
            micro: "µ",
            mid: "∣",
            midast: "*",
            midcir: "⫰",
            middot: "·",
            minus: "−",
            minusb: "⊟",
            minusd: "∸",
            minusdu: "⨪",
            MinusPlus: "∓",
            mlcp: "⫛",
            mldr: "…",
            mnplus: "∓",
            models: "⊧",
            Mopf: "𝕄",
            mopf: "𝕞",
            mp: "∓",
            Mscr: "ℳ",
            mscr: "𝓂",
            mstpos: "∾",
            Mu: "Μ",
            mu: "μ",
            multimap: "⊸",
            mumap: "⊸",
            nabla: "∇",
            Nacute: "Ń",
            nacute: "ń",
            nang: "∠⃒",
            nap: "≉",
            napE: "⩰̸",
            napid: "≋̸",
            napos: "ŉ",
            napprox: "≉",
            natur: "♮",
            natural: "♮",
            naturals: "ℕ",
            nbsp: " ",
            nbump: "≎̸",
            nbumpe: "≏̸",
            ncap: "⩃",
            Ncaron: "Ň",
            ncaron: "ň",
            Ncedil: "Ņ",
            ncedil: "ņ",
            ncong: "≇",
            ncongdot: "⩭̸",
            ncup: "⩂",
            Ncy: "Н",
            ncy: "н",
            ndash: "–",
            ne: "≠",
            nearhk: "⤤",
            neArr: "⇗",
            nearr: "↗",
            nearrow: "↗",
            nedot: "≐̸",
            NegativeMediumSpace: "​",
            NegativeThickSpace: "​",
            NegativeThinSpace: "​",
            NegativeVeryThinSpace: "​",
            nequiv: "≢",
            nesear: "⤨",
            nesim: "≂̸",
            NestedGreaterGreater: "≫",
            NestedLessLess: "≪",
            NewLine: "\n",
            nexist: "∄",
            nexists: "∄",
            Nfr: "𝔑",
            nfr: "𝔫",
            ngE: "≧̸",
            nge: "≱",
            ngeq: "≱",
            ngeqq: "≧̸",
            ngeqslant: "⩾̸",
            nges: "⩾̸",
            nGg: "⋙̸",
            ngsim: "≵",
            nGt: "≫⃒",
            ngt: "≯",
            ngtr: "≯",
            nGtv: "≫̸",
            nhArr: "⇎",
            nharr: "↮",
            nhpar: "⫲",
            ni: "∋",
            nis: "⋼",
            nisd: "⋺",
            niv: "∋",
            NJcy: "Њ",
            njcy: "њ",
            nlArr: "⇍",
            nlarr: "↚",
            nldr: "‥",
            nlE: "≦̸",
            nle: "≰",
            nLeftarrow: "⇍",
            nleftarrow: "↚",
            nLeftrightarrow: "⇎",
            nleftrightarrow: "↮",
            nleq: "≰",
            nleqq: "≦̸",
            nleqslant: "⩽̸",
            nles: "⩽̸",
            nless: "≮",
            nLl: "⋘̸",
            nlsim: "≴",
            nLt: "≪⃒",
            nlt: "≮",
            nltri: "⋪",
            nltrie: "⋬",
            nLtv: "≪̸",
            nmid: "∤",
            NoBreak: "⁠",
            NonBreakingSpace: " ",
            Nopf: "ℕ",
            nopf: "𝕟",
            Not: "⫬",
            not: "¬",
            NotCongruent: "≢",
            NotCupCap: "≭",
            NotDoubleVerticalBar: "∦",
            NotElement: "∉",
            NotEqual: "≠",
            NotEqualTilde: "≂̸",
            NotExists: "∄",
            NotGreater: "≯",
            NotGreaterEqual: "≱",
            NotGreaterFullEqual: "≧̸",
            NotGreaterGreater: "≫̸",
            NotGreaterLess: "≹",
            NotGreaterSlantEqual: "⩾̸",
            NotGreaterTilde: "≵",
            NotHumpDownHump: "≎̸",
            NotHumpEqual: "≏̸",
            notin: "∉",
            notindot: "⋵̸",
            notinE: "⋹̸",
            notinva: "∉",
            notinvb: "⋷",
            notinvc: "⋶",
            NotLeftTriangle: "⋪",
            NotLeftTriangleBar: "⧏̸",
            NotLeftTriangleEqual: "⋬",
            NotLess: "≮",
            NotLessEqual: "≰",
            NotLessGreater: "≸",
            NotLessLess: "≪̸",
            NotLessSlantEqual: "⩽̸",
            NotLessTilde: "≴",
            NotNestedGreaterGreater: "⪢̸",
            NotNestedLessLess: "⪡̸",
            notni: "∌",
            notniva: "∌",
            notnivb: "⋾",
            notnivc: "⋽",
            NotPrecedes: "⊀",
            NotPrecedesEqual: "⪯̸",
            NotPrecedesSlantEqual: "⋠",
            NotReverseElement: "∌",
            NotRightTriangle: "⋫",
            NotRightTriangleBar: "⧐̸",
            NotRightTriangleEqual: "⋭",
            NotSquareSubset: "⊏̸",
            NotSquareSubsetEqual: "⋢",
            NotSquareSuperset: "⊐̸",
            NotSquareSupersetEqual: "⋣",
            NotSubset: "⊂⃒",
            NotSubsetEqual: "⊈",
            NotSucceeds: "⊁",
            NotSucceedsEqual: "⪰̸",
            NotSucceedsSlantEqual: "⋡",
            NotSucceedsTilde: "≿̸",
            NotSuperset: "⊃⃒",
            NotSupersetEqual: "⊉",
            NotTilde: "≁",
            NotTildeEqual: "≄",
            NotTildeFullEqual: "≇",
            NotTildeTilde: "≉",
            NotVerticalBar: "∤",
            npar: "∦",
            nparallel: "∦",
            nparsl: "⫽⃥",
            npart: "∂̸",
            npolint: "⨔",
            npr: "⊀",
            nprcue: "⋠",
            npre: "⪯̸",
            nprec: "⊀",
            npreceq: "⪯̸",
            nrArr: "⇏",
            nrarr: "↛",
            nrarrc: "⤳̸",
            nrarrw: "↝̸",
            nRightarrow: "⇏",
            nrightarrow: "↛",
            nrtri: "⋫",
            nrtrie: "⋭",
            nsc: "⊁",
            nsccue: "⋡",
            nsce: "⪰̸",
            Nscr: "𝒩",
            nscr: "𝓃",
            nshortmid: "∤",
            nshortparallel: "∦",
            nsim: "≁",
            nsime: "≄",
            nsimeq: "≄",
            nsmid: "∤",
            nspar: "∦",
            nsqsube: "⋢",
            nsqsupe: "⋣",
            nsub: "⊄",
            nsubE: "⫅̸",
            nsube: "⊈",
            nsubset: "⊂⃒",
            nsubseteq: "⊈",
            nsubseteqq: "⫅̸",
            nsucc: "⊁",
            nsucceq: "⪰̸",
            nsup: "⊅",
            nsupE: "⫆̸",
            nsupe: "⊉",
            nsupset: "⊃⃒",
            nsupseteq: "⊉",
            nsupseteqq: "⫆̸",
            ntgl: "≹",
            Ntilde: "Ñ",
            ntilde: "ñ",
            ntlg: "≸",
            ntriangleleft: "⋪",
            ntrianglelefteq: "⋬",
            ntriangleright: "⋫",
            ntrianglerighteq: "⋭",
            Nu: "Ν",
            nu: "ν",
            num: "#",
            numero: "№",
            numsp: " ",
            nvap: "≍⃒",
            nVDash: "⊯",
            nVdash: "⊮",
            nvDash: "⊭",
            nvdash: "⊬",
            nvge: "≥⃒",
            nvgt: ">⃒",
            nvHarr: "⤄",
            nvinfin: "⧞",
            nvlArr: "⤂",
            nvle: "≤⃒",
            nvlt: "<⃒",
            nvltrie: "⊴⃒",
            nvrArr: "⤃",
            nvrtrie: "⊵⃒",
            nvsim: "∼⃒",
            nwarhk: "⤣",
            nwArr: "⇖",
            nwarr: "↖",
            nwarrow: "↖",
            nwnear: "⤧",
            Oacute: "Ó",
            oacute: "ó",
            oast: "⊛",
            ocir: "⊚",
            Ocirc: "Ô",
            ocirc: "ô",
            Ocy: "О",
            ocy: "о",
            odash: "⊝",
            Odblac: "Ő",
            odblac: "ő",
            odiv: "⨸",
            odot: "⊙",
            odsold: "⦼",
            OElig: "Œ",
            oelig: "œ",
            ofcir: "⦿",
            Ofr: "𝔒",
            ofr: "𝔬",
            ogon: "˛",
            Ograve: "Ò",
            ograve: "ò",
            ogt: "⧁",
            ohbar: "⦵",
            ohm: "Ω",
            oint: "∮",
            olarr: "↺",
            olcir: "⦾",
            olcross: "⦻",
            oline: "‾",
            olt: "⧀",
            Omacr: "Ō",
            omacr: "ō",
            Omega: "Ω",
            omega: "ω",
            Omicron: "Ο",
            omicron: "ο",
            omid: "⦶",
            ominus: "⊖",
            Oopf: "𝕆",
            oopf: "𝕠",
            opar: "⦷",
            OpenCurlyDoubleQuote: "“",
            OpenCurlyQuote: "‘",
            operp: "⦹",
            oplus: "⊕",
            Or: "⩔",
            or: "∨",
            orarr: "↻",
            ord: "⩝",
            order: "ℴ",
            orderof: "ℴ",
            ordf: "ª",
            ordm: "º",
            origof: "⊶",
            oror: "⩖",
            orslope: "⩗",
            orv: "⩛",
            oS: "Ⓢ",
            Oscr: "𝒪",
            oscr: "ℴ",
            Oslash: "Ø",
            oslash: "ø",
            osol: "⊘",
            Otilde: "Õ",
            otilde: "õ",
            Otimes: "⨷",
            otimes: "⊗",
            otimesas: "⨶",
            Ouml: "Ö",
            ouml: "ö",
            ovbar: "⌽",
            OverBar: "‾",
            OverBrace: "⏞",
            OverBracket: "⎴",
            OverParenthesis: "⏜",
            par: "∥",
            para: "¶",
            parallel: "∥",
            parsim: "⫳",
            parsl: "⫽",
            part: "∂",
            PartialD: "∂",
            Pcy: "П",
            pcy: "п",
            percnt: "%",
            period: ".",
            permil: "‰",
            perp: "⊥",
            pertenk: "‱",
            Pfr: "𝔓",
            pfr: "𝔭",
            Phi: "Φ",
            phi: "φ",
            phiv: "ϕ",
            phmmat: "ℳ",
            phone: "☎",
            Pi: "Π",
            pi: "π",
            pitchfork: "⋔",
            piv: "ϖ",
            planck: "ℏ",
            planckh: "ℎ",
            plankv: "ℏ",
            plus: "+",
            plusacir: "⨣",
            plusb: "⊞",
            pluscir: "⨢",
            plusdo: "∔",
            plusdu: "⨥",
            pluse: "⩲",
            PlusMinus: "±",
            plusmn: "±",
            plussim: "⨦",
            plustwo: "⨧",
            pm: "±",
            Poincareplane: "ℌ",
            pointint: "⨕",
            Popf: "ℙ",
            popf: "𝕡",
            pound: "£",
            Pr: "⪻",
            pr: "≺",
            prap: "⪷",
            prcue: "≼",
            prE: "⪳",
            pre: "⪯",
            prec: "≺",
            precapprox: "⪷",
            preccurlyeq: "≼",
            Precedes: "≺",
            PrecedesEqual: "⪯",
            PrecedesSlantEqual: "≼",
            PrecedesTilde: "≾",
            preceq: "⪯",
            precnapprox: "⪹",
            precneqq: "⪵",
            precnsim: "⋨",
            precsim: "≾",
            Prime: "″",
            prime: "′",
            primes: "ℙ",
            prnap: "⪹",
            prnE: "⪵",
            prnsim: "⋨",
            prod: "∏",
            Product: "∏",
            profalar: "⌮",
            profline: "⌒",
            profsurf: "⌓",
            prop: "∝",
            Proportion: "∷",
            Proportional: "∝",
            propto: "∝",
            prsim: "≾",
            prurel: "⊰",
            Pscr: "𝒫",
            pscr: "𝓅",
            Psi: "Ψ",
            psi: "ψ",
            puncsp: " ",
            Qfr: "𝔔",
            qfr: "𝔮",
            qint: "⨌",
            Qopf: "ℚ",
            qopf: "𝕢",
            qprime: "⁗",
            Qscr: "𝒬",
            qscr: "𝓆",
            quaternions: "ℍ",
            quatint: "⨖",
            quest: "?",
            questeq: "≟",
            QUOT: '"',
            quot: '"',
            rAarr: "⇛",
            race: "∽̱",
            Racute: "Ŕ",
            racute: "ŕ",
            radic: "√",
            raemptyv: "⦳",
            Rang: "⟫",
            rang: "⟩",
            rangd: "⦒",
            range: "⦥",
            rangle: "⟩",
            raquo: "»",
            Rarr: "↠",
            rArr: "⇒",
            rarr: "→",
            rarrap: "⥵",
            rarrb: "⇥",
            rarrbfs: "⤠",
            rarrc: "⤳",
            rarrfs: "⤞",
            rarrhk: "↪",
            rarrlp: "↬",
            rarrpl: "⥅",
            rarrsim: "⥴",
            Rarrtl: "⤖",
            rarrtl: "↣",
            rarrw: "↝",
            rAtail: "⤜",
            ratail: "⤚",
            ratio: "∶",
            rationals: "ℚ",
            RBarr: "⤐",
            rBarr: "⤏",
            rbarr: "⤍",
            rbbrk: "❳",
            rbrace: "}",
            rbrack: "]",
            rbrke: "⦌",
            rbrksld: "⦎",
            rbrkslu: "⦐",
            Rcaron: "Ř",
            rcaron: "ř",
            Rcedil: "Ŗ",
            rcedil: "ŗ",
            rceil: "⌉",
            rcub: "}",
            Rcy: "Р",
            rcy: "р",
            rdca: "⤷",
            rdldhar: "⥩",
            rdquo: "”",
            rdquor: "”",
            rdsh: "↳",
            Re: "ℜ",
            real: "ℜ",
            realine: "ℛ",
            realpart: "ℜ",
            reals: "ℝ",
            rect: "▭",
            REG: "®",
            reg: "®",
            ReverseElement: "∋",
            ReverseEquilibrium: "⇋",
            ReverseUpEquilibrium: "⥯",
            rfisht: "⥽",
            rfloor: "⌋",
            Rfr: "ℜ",
            rfr: "𝔯",
            rHar: "⥤",
            rhard: "⇁",
            rharu: "⇀",
            rharul: "⥬",
            Rho: "Ρ",
            rho: "ρ",
            rhov: "ϱ",
            RightAngleBracket: "⟩",
            RightArrow: "→",
            Rightarrow: "⇒",
            rightarrow: "→",
            RightArrowBar: "⇥",
            RightArrowLeftArrow: "⇄",
            rightarrowtail: "↣",
            RightCeiling: "⌉",
            RightDoubleBracket: "⟧",
            RightDownTeeVector: "⥝",
            RightDownVector: "⇂",
            RightDownVectorBar: "⥕",
            RightFloor: "⌋",
            rightharpoondown: "⇁",
            rightharpoonup: "⇀",
            rightleftarrows: "⇄",
            rightleftharpoons: "⇌",
            rightrightarrows: "⇉",
            rightsquigarrow: "↝",
            RightTee: "⊢",
            RightTeeArrow: "↦",
            RightTeeVector: "⥛",
            rightthreetimes: "⋌",
            RightTriangle: "⊳",
            RightTriangleBar: "⧐",
            RightTriangleEqual: "⊵",
            RightUpDownVector: "⥏",
            RightUpTeeVector: "⥜",
            RightUpVector: "↾",
            RightUpVectorBar: "⥔",
            RightVector: "⇀",
            RightVectorBar: "⥓",
            ring: "˚",
            risingdotseq: "≓",
            rlarr: "⇄",
            rlhar: "⇌",
            rlm: "‏",
            rmoust: "⎱",
            rmoustache: "⎱",
            rnmid: "⫮",
            roang: "⟭",
            roarr: "⇾",
            robrk: "⟧",
            ropar: "⦆",
            Ropf: "ℝ",
            ropf: "𝕣",
            roplus: "⨮",
            rotimes: "⨵",
            RoundImplies: "⥰",
            rpar: ")",
            rpargt: "⦔",
            rppolint: "⨒",
            rrarr: "⇉",
            Rrightarrow: "⇛",
            rsaquo: "›",
            Rscr: "ℛ",
            rscr: "𝓇",
            Rsh: "↱",
            rsh: "↱",
            rsqb: "]",
            rsquo: "’",
            rsquor: "’",
            rthree: "⋌",
            rtimes: "⋊",
            rtri: "▹",
            rtrie: "⊵",
            rtrif: "▸",
            rtriltri: "⧎",
            RuleDelayed: "⧴",
            ruluhar: "⥨",
            rx: "℞",
            Sacute: "Ś",
            sacute: "ś",
            sbquo: "‚",
            Sc: "⪼",
            sc: "≻",
            scap: "⪸",
            Scaron: "Š",
            scaron: "š",
            sccue: "≽",
            scE: "⪴",
            sce: "⪰",
            Scedil: "Ş",
            scedil: "ş",
            Scirc: "Ŝ",
            scirc: "ŝ",
            scnap: "⪺",
            scnE: "⪶",
            scnsim: "⋩",
            scpolint: "⨓",
            scsim: "≿",
            Scy: "С",
            scy: "с",
            sdot: "⋅",
            sdotb: "⊡",
            sdote: "⩦",
            searhk: "⤥",
            seArr: "⇘",
            searr: "↘",
            searrow: "↘",
            sect: "§",
            semi: ";",
            seswar: "⤩",
            setminus: "∖",
            setmn: "∖",
            sext: "✶",
            Sfr: "𝔖",
            sfr: "𝔰",
            sfrown: "⌢",
            sharp: "♯",
            SHCHcy: "Щ",
            shchcy: "щ",
            SHcy: "Ш",
            shcy: "ш",
            ShortDownArrow: "↓",
            ShortLeftArrow: "←",
            shortmid: "∣",
            shortparallel: "∥",
            ShortRightArrow: "→",
            ShortUpArrow: "↑",
            shy: "­",
            Sigma: "Σ",
            sigma: "σ",
            sigmaf: "ς",
            sigmav: "ς",
            sim: "∼",
            simdot: "⩪",
            sime: "≃",
            simeq: "≃",
            simg: "⪞",
            simgE: "⪠",
            siml: "⪝",
            simlE: "⪟",
            simne: "≆",
            simplus: "⨤",
            simrarr: "⥲",
            slarr: "←",
            SmallCircle: "∘",
            smallsetminus: "∖",
            smashp: "⨳",
            smeparsl: "⧤",
            smid: "∣",
            smile: "⌣",
            smt: "⪪",
            smte: "⪬",
            smtes: "⪬︀",
            SOFTcy: "Ь",
            softcy: "ь",
            sol: "/",
            solb: "⧄",
            solbar: "⌿",
            Sopf: "𝕊",
            sopf: "𝕤",
            spades: "♠",
            spadesuit: "♠",
            spar: "∥",
            sqcap: "⊓",
            sqcaps: "⊓︀",
            sqcup: "⊔",
            sqcups: "⊔︀",
            Sqrt: "√",
            sqsub: "⊏",
            sqsube: "⊑",
            sqsubset: "⊏",
            sqsubseteq: "⊑",
            sqsup: "⊐",
            sqsupe: "⊒",
            sqsupset: "⊐",
            sqsupseteq: "⊒",
            squ: "□",
            Square: "□",
            square: "□",
            SquareIntersection: "⊓",
            SquareSubset: "⊏",
            SquareSubsetEqual: "⊑",
            SquareSuperset: "⊐",
            SquareSupersetEqual: "⊒",
            SquareUnion: "⊔",
            squarf: "▪",
            squf: "▪",
            srarr: "→",
            Sscr: "𝒮",
            sscr: "𝓈",
            ssetmn: "∖",
            ssmile: "⌣",
            sstarf: "⋆",
            Star: "⋆",
            star: "☆",
            starf: "★",
            straightepsilon: "ϵ",
            straightphi: "ϕ",
            strns: "¯",
            Sub: "⋐",
            sub: "⊂",
            subdot: "⪽",
            subE: "⫅",
            sube: "⊆",
            subedot: "⫃",
            submult: "⫁",
            subnE: "⫋",
            subne: "⊊",
            subplus: "⪿",
            subrarr: "⥹",
            Subset: "⋐",
            subset: "⊂",
            subseteq: "⊆",
            subseteqq: "⫅",
            SubsetEqual: "⊆",
            subsetneq: "⊊",
            subsetneqq: "⫋",
            subsim: "⫇",
            subsub: "⫕",
            subsup: "⫓",
            succ: "≻",
            succapprox: "⪸",
            succcurlyeq: "≽",
            Succeeds: "≻",
            SucceedsEqual: "⪰",
            SucceedsSlantEqual: "≽",
            SucceedsTilde: "≿",
            succeq: "⪰",
            succnapprox: "⪺",
            succneqq: "⪶",
            succnsim: "⋩",
            succsim: "≿",
            SuchThat: "∋",
            Sum: "∑",
            sum: "∑",
            sung: "♪",
            Sup: "⋑",
            sup: "⊃",
            sup1: "¹",
            sup2: "²",
            sup3: "³",
            supdot: "⪾",
            supdsub: "⫘",
            supE: "⫆",
            supe: "⊇",
            supedot: "⫄",
            Superset: "⊃",
            SupersetEqual: "⊇",
            suphsol: "⟉",
            suphsub: "⫗",
            suplarr: "⥻",
            supmult: "⫂",
            supnE: "⫌",
            supne: "⊋",
            supplus: "⫀",
            Supset: "⋑",
            supset: "⊃",
            supseteq: "⊇",
            supseteqq: "⫆",
            supsetneq: "⊋",
            supsetneqq: "⫌",
            supsim: "⫈",
            supsub: "⫔",
            supsup: "⫖",
            swarhk: "⤦",
            swArr: "⇙",
            swarr: "↙",
            swarrow: "↙",
            swnwar: "⤪",
            szlig: "ß",
            Tab: "\t",
            target: "⌖",
            Tau: "Τ",
            tau: "τ",
            tbrk: "⎴",
            Tcaron: "Ť",
            tcaron: "ť",
            Tcedil: "Ţ",
            tcedil: "ţ",
            Tcy: "Т",
            tcy: "т",
            tdot: "⃛",
            telrec: "⌕",
            Tfr: "𝔗",
            tfr: "𝔱",
            there4: "∴",
            Therefore: "∴",
            therefore: "∴",
            Theta: "Θ",
            theta: "θ",
            thetasym: "ϑ",
            thetav: "ϑ",
            thickapprox: "≈",
            thicksim: "∼",
            ThickSpace: "  ",
            thinsp: " ",
            ThinSpace: " ",
            thkap: "≈",
            thksim: "∼",
            THORN: "Þ",
            thorn: "þ",
            Tilde: "∼",
            tilde: "˜",
            TildeEqual: "≃",
            TildeFullEqual: "≅",
            TildeTilde: "≈",
            times: "×",
            timesb: "⊠",
            timesbar: "⨱",
            timesd: "⨰",
            tint: "∭",
            toea: "⤨",
            top: "⊤",
            topbot: "⌶",
            topcir: "⫱",
            Topf: "𝕋",
            topf: "𝕥",
            topfork: "⫚",
            tosa: "⤩",
            tprime: "‴",
            TRADE: "™",
            trade: "™",
            triangle: "▵",
            triangledown: "▿",
            triangleleft: "◃",
            trianglelefteq: "⊴",
            triangleq: "≜",
            triangleright: "▹",
            trianglerighteq: "⊵",
            tridot: "◬",
            trie: "≜",
            triminus: "⨺",
            TripleDot: "⃛",
            triplus: "⨹",
            trisb: "⧍",
            tritime: "⨻",
            trpezium: "⏢",
            Tscr: "𝒯",
            tscr: "𝓉",
            TScy: "Ц",
            tscy: "ц",
            TSHcy: "Ћ",
            tshcy: "ћ",
            Tstrok: "Ŧ",
            tstrok: "ŧ",
            twixt: "≬",
            twoheadleftarrow: "↞",
            twoheadrightarrow: "↠",
            Uacute: "Ú",
            uacute: "ú",
            Uarr: "↟",
            uArr: "⇑",
            uarr: "↑",
            Uarrocir: "⥉",
            Ubrcy: "Ў",
            ubrcy: "ў",
            Ubreve: "Ŭ",
            ubreve: "ŭ",
            Ucirc: "Û",
            ucirc: "û",
            Ucy: "У",
            ucy: "у",
            udarr: "⇅",
            Udblac: "Ű",
            udblac: "ű",
            udhar: "⥮",
            ufisht: "⥾",
            Ufr: "𝔘",
            ufr: "𝔲",
            Ugrave: "Ù",
            ugrave: "ù",
            uHar: "⥣",
            uharl: "↿",
            uharr: "↾",
            uhblk: "▀",
            ulcorn: "⌜",
            ulcorner: "⌜",
            ulcrop: "⌏",
            ultri: "◸",
            Umacr: "Ū",
            umacr: "ū",
            uml: "¨",
            UnderBar: "_",
            UnderBrace: "⏟",
            UnderBracket: "⎵",
            UnderParenthesis: "⏝",
            Union: "⋃",
            UnionPlus: "⊎",
            Uogon: "Ų",
            uogon: "ų",
            Uopf: "𝕌",
            uopf: "𝕦",
            UpArrow: "↑",
            Uparrow: "⇑",
            uparrow: "↑",
            UpArrowBar: "⤒",
            UpArrowDownArrow: "⇅",
            UpDownArrow: "↕",
            Updownarrow: "⇕",
            updownarrow: "↕",
            UpEquilibrium: "⥮",
            upharpoonleft: "↿",
            upharpoonright: "↾",
            uplus: "⊎",
            UpperLeftArrow: "↖",
            UpperRightArrow: "↗",
            Upsi: "ϒ",
            upsi: "υ",
            upsih: "ϒ",
            Upsilon: "Υ",
            upsilon: "υ",
            UpTee: "⊥",
            UpTeeArrow: "↥",
            upuparrows: "⇈",
            urcorn: "⌝",
            urcorner: "⌝",
            urcrop: "⌎",
            Uring: "Ů",
            uring: "ů",
            urtri: "◹",
            Uscr: "𝒰",
            uscr: "𝓊",
            utdot: "⋰",
            Utilde: "Ũ",
            utilde: "ũ",
            utri: "▵",
            utrif: "▴",
            uuarr: "⇈",
            Uuml: "Ü",
            uuml: "ü",
            uwangle: "⦧",
            vangrt: "⦜",
            varepsilon: "ϵ",
            varkappa: "ϰ",
            varnothing: "∅",
            varphi: "ϕ",
            varpi: "ϖ",
            varpropto: "∝",
            vArr: "⇕",
            varr: "↕",
            varrho: "ϱ",
            varsigma: "ς",
            varsubsetneq: "⊊︀",
            varsubsetneqq: "⫋︀",
            varsupsetneq: "⊋︀",
            varsupsetneqq: "⫌︀",
            vartheta: "ϑ",
            vartriangleleft: "⊲",
            vartriangleright: "⊳",
            Vbar: "⫫",
            vBar: "⫨",
            vBarv: "⫩",
            Vcy: "В",
            vcy: "в",
            VDash: "⊫",
            Vdash: "⊩",
            vDash: "⊨",
            vdash: "⊢",
            Vdashl: "⫦",
            Vee: "⋁",
            vee: "∨",
            veebar: "⊻",
            veeeq: "≚",
            vellip: "⋮",
            Verbar: "‖",
            verbar: "|",
            Vert: "‖",
            vert: "|",
            VerticalBar: "∣",
            VerticalLine: "|",
            VerticalSeparator: "❘",
            VerticalTilde: "≀",
            VeryThinSpace: " ",
            Vfr: "𝔙",
            vfr: "𝔳",
            vltri: "⊲",
            vnsub: "⊂⃒",
            vnsup: "⊃⃒",
            Vopf: "𝕍",
            vopf: "𝕧",
            vprop: "∝",
            vrtri: "⊳",
            Vscr: "𝒱",
            vscr: "𝓋",
            vsubnE: "⫋︀",
            vsubne: "⊊︀",
            vsupnE: "⫌︀",
            vsupne: "⊋︀",
            Vvdash: "⊪",
            vzigzag: "⦚",
            Wcirc: "Ŵ",
            wcirc: "ŵ",
            wedbar: "⩟",
            Wedge: "⋀",
            wedge: "∧",
            wedgeq: "≙",
            weierp: "℘",
            Wfr: "𝔚",
            wfr: "𝔴",
            Wopf: "𝕎",
            wopf: "𝕨",
            wp: "℘",
            wr: "≀",
            wreath: "≀",
            Wscr: "𝒲",
            wscr: "𝓌",
            xcap: "⋂",
            xcirc: "◯",
            xcup: "⋃",
            xdtri: "▽",
            Xfr: "𝔛",
            xfr: "𝔵",
            xhArr: "⟺",
            xharr: "⟷",
            Xi: "Ξ",
            xi: "ξ",
            xlArr: "⟸",
            xlarr: "⟵",
            xmap: "⟼",
            xnis: "⋻",
            xodot: "⨀",
            Xopf: "𝕏",
            xopf: "𝕩",
            xoplus: "⨁",
            xotime: "⨂",
            xrArr: "⟹",
            xrarr: "⟶",
            Xscr: "𝒳",
            xscr: "𝓍",
            xsqcup: "⨆",
            xuplus: "⨄",
            xutri: "△",
            xvee: "⋁",
            xwedge: "⋀",
            Yacute: "Ý",
            yacute: "ý",
            YAcy: "Я",
            yacy: "я",
            Ycirc: "Ŷ",
            ycirc: "ŷ",
            Ycy: "Ы",
            ycy: "ы",
            yen: "¥",
            Yfr: "𝔜",
            yfr: "𝔶",
            YIcy: "Ї",
            yicy: "ї",
            Yopf: "𝕐",
            yopf: "𝕪",
            Yscr: "𝒴",
            yscr: "𝓎",
            YUcy: "Ю",
            yucy: "ю",
            Yuml: "Ÿ",
            yuml: "ÿ",
            Zacute: "Ź",
            zacute: "ź",
            Zcaron: "Ž",
            zcaron: "ž",
            Zcy: "З",
            zcy: "з",
            Zdot: "Ż",
            zdot: "ż",
            zeetrf: "ℨ",
            ZeroWidthSpace: "​",
            Zeta: "Ζ",
            zeta: "ζ",
            Zfr: "ℨ",
            zfr: "𝔷",
            ZHcy: "Ж",
            zhcy: "ж",
            zigrarr: "⇝",
            Zopf: "ℤ",
            zopf: "𝕫",
            Zscr: "𝒵",
            zscr: "𝓏",
            zwj: "‍",
            zwnj: "‌"
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(11),
            s = r(2).unescapeMd;
        e.exports = function(e, t) {
            var r, o, i, a = t,
                l = e.posMax;
            if (60 === e.src.charCodeAt(t)) {
                for (t++; t < l;) {
                    if (10 === (r = e.src.charCodeAt(t)))
                        return !1;
                    if (62 === r)
                        return i = n(s(e.src.slice(a + 1, t))), !!e.parser.validateLink(i) && (e.pos = t + 1,
                            e.linkContent = i, !0);
                    92 === r && t + 1 < l ? t += 2 : t++
                }
                return !1
            }
            for (o = 0; t < l && 32 !== (r = e.src.charCodeAt(t)) && !(r < 32 || 127 === r);)
                if (92 === r && t + 1 < l)
                    t += 2;
                else {
                    if (40 === r && ++o > 1)
                        break;
                    if (41 === r && --o < 0)
                        break;
                    t++
                }
            return a !== t && (i = s(e.src.slice(a, t)), !!e.parser.validateLink(i) && (e.linkContent = i,
                e.pos = t, !0))
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(2).replaceEntities;
        e.exports = function(e) {
            var t = n(e);
            try {
                t = decodeURI(t)
            } catch (e) {}
            return encodeURI(t)
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(2).unescapeMd;
        e.exports = function(e, t) {
            var r, s = t,
                o = e.posMax,
                i = e.src.charCodeAt(t);
            if (34 !== i && 39 !== i && 40 !== i)
                return !1;
            for (t++,
                40 === i && (i = 41); t < o;) {
                if ((r = e.src.charCodeAt(t)) === i)
                    return e.pos = t + 1,
                        e.linkContent = n(e.src.slice(s + 1, t)), !0;
                92 === r && t + 1 < o ? t += 2 : t++
            }
            return !1
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            return e.trim().replace(/\s+/g, " ").toUpperCase()
        }
    }, function(e, t) {
        var r = {
            utf8: {
                stringToBytes: function(e) {
                    return r.bin.stringToBytes(unescape(encodeURIComponent(e)))
                },
                bytesToString: function(e) {
                    return decodeURIComponent(escape(r.bin.bytesToString(e)))
                }
            },
            bin: {
                stringToBytes: function(e) {
                    for (var t = [], r = 0; r < e.length; r++)
                        t.push(255 & e.charCodeAt(r));
                    return t
                },
                bytesToString: function(e) {
                    for (var t = [], r = 0; r < e.length; r++)
                        t.push(String.fromCharCode(e[r]));
                    return t.join("")
                }
            }
        };
        e.exports = r
    }, function(e, t, r) {
        var n, s, o, i, a;
        n = r(67),
            s = r(14).utf8,
            o = r(68),
            i = r(14).bin,
            (a = function(e, t) {
                e.constructor == String ? e = t && "binary" === t.encoding ? i.stringToBytes(e) : s.stringToBytes(e) : o(e) ? e = Array.prototype.slice.call(e, 0) : Array.isArray(e) || (e = e.toString());
                for (var r = n.bytesToWords(e), l = 8 * e.length, c = 1732584193, u = -271733879, p = -1732584194, h = 271733878, f = 0; f < r.length; f++)
                    r[f] = 16711935 & (r[f] << 8 | r[f] >>> 24) | 4278255360 & (r[f] << 24 | r[f] >>> 8);
                r[l >>> 5] |= 128 << l % 32,
                    r[14 + (l + 64 >>> 9 << 4)] = l;
                var g = a._ff,
                    d = a._gg,
                    m = a._hh,
                    b = a._ii;
                for (f = 0; f < r.length; f += 16) {
                    var v = c,
                        k = u,
                        y = p,
                        x = h;
                    c = g(c, u, p, h, r[f + 0], 7, -680876936),
                        h = g(h, c, u, p, r[f + 1], 12, -389564586),
                        p = g(p, h, c, u, r[f + 2], 17, 606105819),
                        u = g(u, p, h, c, r[f + 3], 22, -1044525330),
                        c = g(c, u, p, h, r[f + 4], 7, -176418897),
                        h = g(h, c, u, p, r[f + 5], 12, 1200080426),
                        p = g(p, h, c, u, r[f + 6], 17, -1473231341),
                        u = g(u, p, h, c, r[f + 7], 22, -45705983),
                        c = g(c, u, p, h, r[f + 8], 7, 1770035416),
                        h = g(h, c, u, p, r[f + 9], 12, -1958414417),
                        p = g(p, h, c, u, r[f + 10], 17, -42063),
                        u = g(u, p, h, c, r[f + 11], 22, -1990404162),
                        c = g(c, u, p, h, r[f + 12], 7, 1804603682),
                        h = g(h, c, u, p, r[f + 13], 12, -40341101),
                        p = g(p, h, c, u, r[f + 14], 17, -1502002290),
                        c = d(c, u = g(u, p, h, c, r[f + 15], 22, 1236535329), p, h, r[f + 1], 5, -165796510),
                        h = d(h, c, u, p, r[f + 6], 9, -1069501632),
                        p = d(p, h, c, u, r[f + 11], 14, 643717713),
                        u = d(u, p, h, c, r[f + 0], 20, -373897302),
                        c = d(c, u, p, h, r[f + 5], 5, -701558691),
                        h = d(h, c, u, p, r[f + 10], 9, 38016083),
                        p = d(p, h, c, u, r[f + 15], 14, -660478335),
                        u = d(u, p, h, c, r[f + 4], 20, -405537848),
                        c = d(c, u, p, h, r[f + 9], 5, 568446438),
                        h = d(h, c, u, p, r[f + 14], 9, -1019803690),
                        p = d(p, h, c, u, r[f + 3], 14, -187363961),
                        u = d(u, p, h, c, r[f + 8], 20, 1163531501),
                        c = d(c, u, p, h, r[f + 13], 5, -1444681467),
                        h = d(h, c, u, p, r[f + 2], 9, -51403784),
                        p = d(p, h, c, u, r[f + 7], 14, 1735328473),
                        c = m(c, u = d(u, p, h, c, r[f + 12], 20, -1926607734), p, h, r[f + 5], 4, -378558),
                        h = m(h, c, u, p, r[f + 8], 11, -2022574463),
                        p = m(p, h, c, u, r[f + 11], 16, 1839030562),
                        u = m(u, p, h, c, r[f + 14], 23, -35309556),
                        c = m(c, u, p, h, r[f + 1], 4, -1530992060),
                        h = m(h, c, u, p, r[f + 4], 11, 1272893353),
                        p = m(p, h, c, u, r[f + 7], 16, -155497632),
                        u = m(u, p, h, c, r[f + 10], 23, -1094730640),
                        c = m(c, u, p, h, r[f + 13], 4, 681279174),
                        h = m(h, c, u, p, r[f + 0], 11, -358537222),
                        p = m(p, h, c, u, r[f + 3], 16, -722521979),
                        u = m(u, p, h, c, r[f + 6], 23, 76029189),
                        c = m(c, u, p, h, r[f + 9], 4, -640364487),
                        h = m(h, c, u, p, r[f + 12], 11, -421815835),
                        p = m(p, h, c, u, r[f + 15], 16, 530742520),
                        c = b(c, u = m(u, p, h, c, r[f + 2], 23, -995338651), p, h, r[f + 0], 6, -198630844),
                        h = b(h, c, u, p, r[f + 7], 10, 1126891415),
                        p = b(p, h, c, u, r[f + 14], 15, -1416354905),
                        u = b(u, p, h, c, r[f + 5], 21, -57434055),
                        c = b(c, u, p, h, r[f + 12], 6, 1700485571),
                        h = b(h, c, u, p, r[f + 3], 10, -1894986606),
                        p = b(p, h, c, u, r[f + 10], 15, -1051523),
                        u = b(u, p, h, c, r[f + 1], 21, -2054922799),
                        c = b(c, u, p, h, r[f + 8], 6, 1873313359),
                        h = b(h, c, u, p, r[f + 15], 10, -30611744),
                        p = b(p, h, c, u, r[f + 6], 15, -1560198380),
                        u = b(u, p, h, c, r[f + 13], 21, 1309151649),
                        c = b(c, u, p, h, r[f + 4], 6, -145523070),
                        h = b(h, c, u, p, r[f + 11], 10, -1120210379),
                        p = b(p, h, c, u, r[f + 2], 15, 718787259),
                        u = b(u, p, h, c, r[f + 9], 21, -343485551),
                        c = c + v >>> 0,
                        u = u + k >>> 0,
                        p = p + y >>> 0,
                        h = h + x >>> 0
                }
                return n.endian([c, u, p, h])
            })._ff = function(e, t, r, n, s, o, i) {
                var a = e + (t & r | ~t & n) + (s >>> 0) + i;
                return (a << o | a >>> 32 - o) + t
            },
            a._gg = function(e, t, r, n, s, o, i) {
                var a = e + (t & n | r & ~n) + (s >>> 0) + i;
                return (a << o | a >>> 32 - o) + t
            },
            a._hh = function(e, t, r, n, s, o, i) {
                var a = e + (t ^ r ^ n) + (s >>> 0) + i;
                return (a << o | a >>> 32 - o) + t
            },
            a._ii = function(e, t, r, n, s, o, i) {
                var a = e + (r ^ (t | ~n)) + (s >>> 0) + i;
                return (a << o | a >>> 32 - o) + t
            },
            a._blocksize = 16,
            a._digestsize = 16,
            e.exports = function(e, t) {
                if (null == e)
                    throw new Error("Illegal argument " + e);
                var r = n.wordsToBytes(a(e, t));
                return t && t.asBytes ? r : t && t.asString ? i.bytesToString(r) : n.bytesToHex(r)
            }
    }, function(e, t, r) {
        "use strict";
        var n = r(2).assign,
            s = r(17),
            o = r(19),
            i = r(30),
            a = r(45),
            l = r(5),
            c = {
                default: r(64),
                full: r(65),
                commonmark: r(66)
            };

        function u(e, t, r) {
            this.src = t,
                this.env = r,
                this.options = e.options,
                this.tokens = [],
                this.inlineMode = !1,
                this.inline = e.inline,
                this.block = e.block,
                this.renderer = e.renderer,
                this.typographer = e.typographer
        }

        function p(e, t) {
            "string" != typeof e && (t = e,
                    e = "default"),
                this.inline = new a,
                this.block = new i,
                this.core = new o,
                this.renderer = new s,
                this.ruler = new l,
                this.options = {},
                this.configure(c[e]),
                this.set(t || {})
        }
        p.prototype.set = function(e) {
                n(this.options, e)
            },
            p.prototype.configure = function(e) {
                var t = this;
                if (!e)
                    throw new Error("Wrong `remarkable` preset, check name/content");
                e.options && t.set(e.options),
                    e.components && Object.keys(e.components).forEach((function(r) {
                        e.components[r].rules && t[r].ruler.enable(e.components[r].rules, !0)
                    }))
            },
            p.prototype.use = function(e, t) {
                return e(this, t),
                    this
            },
            p.prototype.parse = function(e, t) {
                var r = new u(this, e, t);
                return this.core.process(r),
                    r.tokens
            },
            p.prototype.render = function(e, t) {
                return t = t || {},
                    this.renderer.render(this.parse(e, t), this.options, t)
            },
            p.prototype.parseInline = function(e, t) {
                var r = new u(this, e, t);
                return r.inlineMode = !0,
                    this.core.process(r),
                    r.tokens
            },
            p.prototype.renderInline = function(e, t) {
                return t = t || {},
                    this.renderer.render(this.parseInline(e, t), this.options, t)
            },
            e.exports = p,
            e.exports.utils = r(2)
    }, function(e, t, r) {
        "use strict";
        var n = r(2),
            s = r(18);

        function o() {
            this.rules = n.assign({}, s),
                this.getBreak = s.getBreak
        }
        e.exports = o,
            o.prototype.renderInline = function(e, t, r) {
                for (var n = this.rules, s = e.length, o = 0, i = ""; s--;)
                    i += n[e[o].type](e, o++, t, r, this);
                return i
            },
            o.prototype.render = function(e, t, r) {
                for (var n = this.rules, s = e.length, o = -1, i = ""; ++o < s;)
                    "inline" === e[o].type ? i += this.renderInline(e[o].children, t, r) : i += n[e[o].type](e, o, t, r, this);
                return i
            }
    }, function(e, t, r) {
        "use strict";
        var n = r(2).has,
            s = r(2).unescapeMd,
            o = r(2).replaceEntities,
            i = r(2).escapeHtml,
            a = {};
        a.blockquote_open = function() {
                return "<blockquote>\n"
            },
            a.blockquote_close = function(e, t) {
                return "</blockquote>" + l(e, t)
            },
            a.code = function(e, t) {
                return e[t].block ? "<pre><code>" + i(e[t].content) + "</code></pre>" + l(e, t) : "<code>" + i(e[t].content) + "</code>"
            },
            a.fence = function(e, t, r, a, c) {
                var u, p, h = e[t],
                    f = "",
                    g = r.langPrefix;
                if (h.params) {
                    if (p = (u = h.params.split(/\s+/g)).join(" "),
                        n(c.rules.fence_custom, u[0]))
                        return c.rules.fence_custom[u[0]](e, t, r, a, c);
                    f = ' class="' + g + i(o(s(p))) + '"'
                }
                return "<pre><code" + f + ">" + (r.highlight && r.highlight.apply(r.highlight, [h.content].concat(u)) || i(h.content)) + "</code></pre>" + l(e, t)
            },
            a.fence_custom = {},
            a.heading_open = function(e, t) {
                return "<h" + e[t].hLevel + ">"
            },
            a.heading_close = function(e, t) {
                return "</h" + e[t].hLevel + ">\n"
            },
            a.hr = function(e, t, r) {
                return (r.xhtmlOut ? "<hr />" : "<hr>") + l(e, t)
            },
            a.bullet_list_open = function() {
                return "<ul>\n"
            },
            a.bullet_list_close = function(e, t) {
                return "</ul>" + l(e, t)
            },
            a.list_item_open = function() {
                return "<li>"
            },
            a.list_item_close = function() {
                return "</li>\n"
            },
            a.ordered_list_open = function(e, t) {
                var r = e[t];
                return "<ol" + (r.order > 1 ? ' start="' + r.order + '"' : "") + ">\n"
            },
            a.ordered_list_close = function(e, t) {
                return "</ol>" + l(e, t)
            },
            a.paragraph_open = function(e, t) {
                return e[t].tight ? "" : "<p>"
            },
            a.paragraph_close = function(e, t) {
                var r = !(e[t].tight && t && "inline" === e[t - 1].type && !e[t - 1].content);
                return (e[t].tight ? "" : "</p>") + (r ? l(e, t) : "")
            },
            a.link_open = function(e, t, r) {
                var n = e[t].title ? ' title="' + i(o(e[t].title)) + '"' : "",
                    s = r.linkTarget ? ' target="' + r.linkTarget + '"' : "";
                return '<a href="' + i(e[t].href) + '"' + n + s + ">"
            },
            a.link_close = function() {
                return "</a>"
            },
            a.image = function(e, t, r) {
                var n = ' src="' + i(e[t].src) + '"',
                    a = e[t].title ? ' title="' + i(o(e[t].title)) + '"' : "";
                return "<img" + n + (' alt="' + (e[t].alt ? i(o(s(e[t].alt))) : "") + '"') + a + (r.xhtmlOut ? " /" : "") + ">"
            },
            a.table_open = function() {
                return "<table>\n"
            },
            a.table_close = function() {
                return "</table>\n"
            },
            a.thead_open = function() {
                return "<thead>\n"
            },
            a.thead_close = function() {
                return "</thead>\n"
            },
            a.tbody_open = function() {
                return "<tbody>\n"
            },
            a.tbody_close = function() {
                return "</tbody>\n"
            },
            a.tr_open = function() {
                return "<tr>"
            },
            a.tr_close = function() {
                return "</tr>\n"
            },
            a.th_open = function(e, t) {
                var r = e[t];
                return "<th" + (r.align ? ' style="text-align:' + r.align + '"' : "") + ">"
            },
            a.th_close = function() {
                return "</th>"
            },
            a.td_open = function(e, t) {
                var r = e[t];
                return "<td" + (r.align ? ' style="text-align:' + r.align + '"' : "") + ">"
            },
            a.td_close = function() {
                return "</td>"
            },
            a.strong_open = function() {
                return "<strong>"
            },
            a.strong_close = function() {
                return "</strong>"
            },
            a.em_open = function() {
                return "<em>"
            },
            a.em_close = function() {
                return "</em>"
            },
            a.del_open = function() {
                return "<del>"
            },
            a.del_close = function() {
                return "</del>"
            },
            a.ins_open = function() {
                return "<ins>"
            },
            a.ins_close = function() {
                return "</ins>"
            },
            a.mark_open = function() {
                return "<mark>"
            },
            a.mark_close = function() {
                return "</mark>"
            },
            a.sub = function(e, t) {
                return "<sub>" + i(e[t].content) + "</sub>"
            },
            a.sup = function(e, t) {
                return "<sup>" + i(e[t].content) + "</sup>"
            },
            a.hardbreak = function(e, t, r) {
                return r.xhtmlOut ? "<br />\n" : "<br>\n"
            },
            a.softbreak = function(e, t, r) {
                return r.breaks ? r.xhtmlOut ? "<br />\n" : "<br>\n" : "\n"
            },
            a.text = function(e, t) {
                return i(e[t].content)
            },
            a.htmlblock = function(e, t) {
                return e[t].content
            },
            a.htmltag = function(e, t) {
                return e[t].content
            },
            a.abbr_open = function(e, t) {
                return '<abbr title="' + i(o(e[t].title)) + '">'
            },
            a.abbr_close = function() {
                return "</abbr>"
            },
            a.footnote_ref = function(e, t) {
                var r = Number(e[t].id + 1).toString(),
                    n = "fnref" + r;
                return e[t].subId > 0 && (n += ":" + e[t].subId),
                    '<sup class="footnote-ref"><a href="#fn' + r + '" id="' + n + '">[' + r + "]</a></sup>"
            },
            a.footnote_block_open = function(e, t, r) {
                return (r.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n') + '<section class="footnotes">\n<ol class="footnotes-list">\n'
            },
            a.footnote_block_close = function() {
                return "</ol>\n</section>\n"
            },
            a.footnote_open = function(e, t) {
                return '<li id="fn' + Number(e[t].id + 1).toString() + '"  class="footnote-item">'
            },
            a.footnote_close = function() {
                return "</li>\n"
            },
            a.footnote_anchor = function(e, t) {
                var r = "fnref" + Number(e[t].id + 1).toString();
                return e[t].subId > 0 && (r += ":" + e[t].subId),
                    ' <a href="#' + r + '" class="footnote-backref">↩</a>'
            },
            a.dl_open = function() {
                return "<dl>\n"
            },
            a.dt_open = function() {
                return "<dt>"
            },
            a.dd_open = function() {
                return "<dd>"
            },
            a.dl_close = function() {
                return "</dl>\n"
            },
            a.dt_close = function() {
                return "</dt>\n"
            },
            a.dd_close = function() {
                return "</dd>\n"
            };
        var l = a.getBreak = function(e, t) {
            return (t = function e(t, r) {
                return ++r >= t.length - 2 ? r : "paragraph_open" === t[r].type && t[r].tight && "inline" === t[r + 1].type && 0 === t[r + 1].content.length && "paragraph_close" === t[r + 2].type && t[r + 2].tight ? e(t, r + 2) : r
            }(e, t)) < e.length && "list_item_close" === e[t].type ? "" : "\n"
        };
        e.exports = a
    }, function(e, t, r) {
        "use strict";
        var n = r(5),
            s = [
                ["block", r(20)],
                ["abbr", r(21)],
                ["references", r(22)],
                ["inline", r(23)],
                ["footnote_tail", r(24)],
                ["abbr2", r(25)],
                ["replacements", r(26)],
                ["smartquotes", r(27)],
                ["linkify", r(28)]
            ];

        function o() {
            this.options = {},
                this.ruler = new n;
            for (var e = 0; e < s.length; e++)
                this.ruler.push(s[e][0], s[e][1])
        }
        o.prototype.process = function(e) {
                var t, r, n;
                for (t = 0,
                    r = (n = this.ruler.getRules("")).length; t < r; t++)
                    n[t](e)
            },
            e.exports = o
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            e.inlineMode ? e.tokens.push({
                type: "inline",
                content: e.src.replace(/\n/g, " ").trim(),
                level: 0,
                lines: [0, 1],
                children: []
            }) : e.block.parse(e.src, e.options, e.env, e.tokens)
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(8),
            s = r(6);

        function o(e, t, r, o) {
            var i, a, l, c, u, p;
            if (42 !== e.charCodeAt(0))
                return -1;
            if (91 !== e.charCodeAt(1))
                return -1;
            if (-1 === e.indexOf("]:"))
                return -1;
            if (i = new n(e, t, r, o, []),
                (a = s(i, 1)) < 0 || 58 !== e.charCodeAt(a + 1))
                return -1;
            for (c = i.posMax,
                l = a + 2; l < c && 10 !== i.src.charCodeAt(l); l++)
            ;
            return u = e.slice(2, a),
                0 === (p = e.slice(a + 2, l).trim()).length ? -1 : (o.abbreviations || (o.abbreviations = {}),
                    void 0 === o.abbreviations[":" + u] && (o.abbreviations[":" + u] = p),
                    l)
        }
        e.exports = function(e) {
            var t, r, n, s, i = e.tokens;
            if (!e.inlineMode)
                for (t = 1,
                    r = i.length - 1; t < r; t++)
                    if ("paragraph_open" === i[t - 1].type && "inline" === i[t].type && "paragraph_close" === i[t + 1].type) {
                        for (n = i[t].content; n.length && !((s = o(n, e.inline, e.options, e.env)) < 0);)
                            n = n.slice(s).trim();
                        i[t].content = n,
                            n.length || (i[t - 1].tight = !0,
                                i[t + 1].tight = !0)
                    }
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(8),
            s = r(6),
            o = r(10),
            i = r(12),
            a = r(13);

        function l(e, t, r, l) {
            var c, u, p, h, f, g, d, m, b;
            if (91 !== e.charCodeAt(0))
                return -1;
            if (-1 === e.indexOf("]:"))
                return -1;
            if (c = new n(e, t, r, l, []),
                (u = s(c, 0)) < 0 || 58 !== e.charCodeAt(u + 1))
                return -1;
            for (h = c.posMax,
                p = u + 2; p < h && (32 === (f = c.src.charCodeAt(p)) || 10 === f); p++)
            ;
            if (!o(c, p))
                return -1;
            for (d = c.linkContent,
                g = p = c.pos,
                p += 1; p < h && (32 === (f = c.src.charCodeAt(p)) || 10 === f); p++)
            ;
            for (p < h && g !== p && i(c, p) ? (m = c.linkContent,
                    p = c.pos) : (m = "",
                    p = g); p < h && 32 === c.src.charCodeAt(p);)
                p++;
            return p < h && 10 !== c.src.charCodeAt(p) ? -1 : (b = a(e.slice(1, u)),
                void 0 === l.references[b] && (l.references[b] = {
                    title: m,
                    href: d
                }),
                p)
        }
        e.exports = function(e) {
            var t, r, n, s, o = e.tokens;
            if (e.env.references = e.env.references || {}, !e.inlineMode)
                for (t = 1,
                    r = o.length - 1; t < r; t++)
                    if ("inline" === o[t].type && "paragraph_open" === o[t - 1].type && "paragraph_close" === o[t + 1].type) {
                        for (n = o[t].content; n.length && !((s = l(n, e.inline, e.options, e.env)) < 0);)
                            n = n.slice(s).trim();
                        o[t].content = n,
                            n.length || (o[t - 1].tight = !0,
                                o[t + 1].tight = !0)
                    }
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            var t, r, n, s = e.tokens;
            for (r = 0,
                n = s.length; r < n; r++)
                "inline" === (t = s[r]).type && e.inline.parse(t.content, e.options, e.env, t.children)
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e) {
            var t, r, n, s, o, i, a, l, c, u = 0,
                p = !1,
                h = {};
            if (e.env.footnotes && (e.tokens = e.tokens.filter((function(e) {
                        return "footnote_reference_open" === e.type ? (p = !0,
                            l = [],
                            c = e.label, !1) : "footnote_reference_close" === e.type ? (p = !1,
                            h[":" + c] = l, !1) : (p && l.push(e), !p)
                    })),
                    e.env.footnotes.list)) {
                for (i = e.env.footnotes.list,
                    e.tokens.push({
                        type: "footnote_block_open",
                        level: u++
                    }),
                    t = 0,
                    r = i.length; t < r; t++) {
                    for (e.tokens.push({
                            type: "footnote_open",
                            id: t,
                            level: u++
                        }),
                        i[t].tokens ? ((a = []).push({
                                type: "paragraph_open",
                                tight: !1,
                                level: u++
                            }),
                            a.push({
                                type: "inline",
                                content: "",
                                level: u,
                                children: i[t].tokens
                            }),
                            a.push({
                                type: "paragraph_close",
                                tight: !1,
                                level: --u
                            })) : i[t].label && (a = h[":" + i[t].label]),
                        e.tokens = e.tokens.concat(a),
                        o = "paragraph_close" === e.tokens[e.tokens.length - 1].type ? e.tokens.pop() : null,
                        s = i[t].count > 0 ? i[t].count : 1,
                        n = 0; n < s; n++)
                        e.tokens.push({
                            type: "footnote_anchor",
                            id: t,
                            subId: n,
                            level: u
                        });
                    o && e.tokens.push(o),
                        e.tokens.push({
                            type: "footnote_close",
                            level: --u
                        })
                }
                e.tokens.push({
                    type: "footnote_block_close",
                    level: --u
                })
            }
        }
    }, function(e, t, r) {
        "use strict";

        function n(e) {
            return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1")
        }
        e.exports = function(e) {
            var t, r, s, o, i, a, l, c, u, p, h, f, g = e.tokens;
            if (e.env.abbreviations)
                for (e.env.abbrRegExp || (f = "(^|[" + " \n()[]'\".,!?-".split("").map(n).join("") + "])(" + Object.keys(e.env.abbreviations).map((function(e) {
                            return e.substr(1)
                        })).sort((function(e, t) {
                            return t.length - e.length
                        })).map(n).join("|") + ")($|[" + " \n()[]'\".,!?-".split("").map(n).join("") + "])",
                        e.env.abbrRegExp = new RegExp(f, "g")),
                    p = e.env.abbrRegExp,
                    r = 0,
                    s = g.length; r < s; r++)
                    if ("inline" === g[r].type)
                        for (t = (o = g[r].children).length - 1; t >= 0; t--)
                            if ("text" === (i = o[t]).type) {
                                for (c = 0,
                                    a = i.content,
                                    p.lastIndex = 0,
                                    u = i.level,
                                    l = []; h = p.exec(a);)
                                    p.lastIndex > c && l.push({
                                        type: "text",
                                        content: a.slice(c, h.index + h[1].length),
                                        level: u
                                    }),
                                    l.push({
                                        type: "abbr_open",
                                        title: e.env.abbreviations[":" + h[2]],
                                        level: u++
                                    }),
                                    l.push({
                                        type: "text",
                                        content: h[2],
                                        level: u
                                    }),
                                    l.push({
                                        type: "abbr_close",
                                        level: --u
                                    }),
                                    c = p.lastIndex - h[3].length;
                                l.length && (c < a.length && l.push({
                                        type: "text",
                                        content: a.slice(c),
                                        level: u
                                    }),
                                    g[r].children = o = [].concat(o.slice(0, t), l, o.slice(t + 1)))
                            }
        }
    }, function(e, t, r) {
        "use strict";
        var n = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
            s = /\((c|tm|r|p)\)/gi,
            o = {
                c: "©",
                r: "®",
                p: "§",
                tm: "™"
            };
        e.exports = function(e) {
            var t, r, i, a, l, c;
            if (e.options.typographer)
                for (l = e.tokens.length - 1; l >= 0; l--)
                    if ("inline" === e.tokens[l].type)
                        for (t = (a = e.tokens[l].children).length - 1; t >= 0; t--)
                            "text" === (r = a[t]).type && (i = r.content,
                                i = (c = i).indexOf("(") < 0 ? c : c.replace(s, (function(e, t) {
                                    return o[t.toLowerCase()]
                                })),
                                n.test(i) && (i = i.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/gm, "$1—$2").replace(/(^|\s)--(\s|$)/gm, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm, "$1–$2")),
                                r.content = i)
        }
    }, function(e, t, r) {
        "use strict";
        var n = /['"]/,
            s = /['"]/g,
            o = /[-\s()\[\]]/;

        function i(e, t) {
            return !(t < 0 || t >= e.length) && !o.test(e[t])
        }

        function a(e, t, r) {
            return e.substr(0, t) + r + e.substr(t + 1)
        }
        e.exports = function(e) {
            var t, r, o, l, c, u, p, h, f, g, d, m, b, v, k, y, x;
            if (e.options.typographer)
                for (x = [],
                    k = e.tokens.length - 1; k >= 0; k--)
                    if ("inline" === e.tokens[k].type)
                        for (y = e.tokens[k].children,
                            x.length = 0,
                            t = 0; t < y.length; t++)
                            if ("text" === (r = y[t]).type && !n.test(r.text)) {
                                for (p = y[t].level,
                                    b = x.length - 1; b >= 0 && !(x[b].level <= p); b--)
                                ;
                                x.length = b + 1,
                                    c = 0,
                                    u = (o = r.content).length;
                                e: for (; c < u && (s.lastIndex = c,
                                        l = s.exec(o));)
                                    if (h = !i(o, l.index - 1),
                                        c = l.index + 1,
                                        v = "'" === l[0],
                                        (f = !i(o, c)) || h) {
                                        if (d = !f,
                                            m = !h)
                                            for (b = x.length - 1; b >= 0 && (g = x[b], !(x[b].level < p)); b--)
                                                if (g.single === v && x[b].level === p) {
                                                    g = x[b],
                                                        v ? (y[g.token].content = a(y[g.token].content, g.pos, e.options.quotes[2]),
                                                            r.content = a(r.content, l.index, e.options.quotes[3])) : (y[g.token].content = a(y[g.token].content, g.pos, e.options.quotes[0]),
                                                            r.content = a(r.content, l.index, e.options.quotes[1])),
                                                        x.length = b;
                                                    continue e
                                                }
                                        d ? x.push({
                                            token: t,
                                            pos: l.index,
                                            single: v,
                                            level: p
                                        }) : m && v && (r.content = a(r.content, l.index, "’"))
                                    } else
                                        v && (r.content = a(r.content, l.index, "’"))
                            }
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(29),
            s = /www|@|\:\/\//;

        function o(e) {
            return /^<\/a\s*>/i.test(e)
        }

        function i() {
            var e = [],
                t = new n({
                    stripPrefix: !1,
                    url: !0,
                    email: !0,
                    twitter: !1,
                    replaceFn: function(t, r) {
                        switch (r.getType()) {
                            case "url":
                                e.push({
                                    text: r.matchedText,
                                    url: r.getUrl()
                                });
                                break;
                            case "email":
                                e.push({
                                    text: r.matchedText,
                                    url: "mailto:" + r.getEmail().replace(/^mailto:/i, "")
                                })
                        }
                        return !1
                    }
                });
            return {
                links: e,
                autolinker: t
            }
        }
        e.exports = function(e) {
            var t, r, n, a, l, c, u, p, h, f, g, d, m, b, v = e.tokens,
                k = null;
            if (e.options.linkify)
                for (r = 0,
                    n = v.length; r < n; r++)
                    if ("inline" === v[r].type)
                        for (g = 0,
                            t = (a = v[r].children).length - 1; t >= 0; t--)
                            if ("link_close" !== (l = a[t]).type) {
                                if ("htmltag" === l.type && (b = l.content,
                                        /^<a[>\s]/i.test(b) && g > 0 && g--,
                                        o(l.content) && g++), !(g > 0) && "text" === l.type && s.test(l.content)) {
                                    if (k || (d = (k = i()).links,
                                            m = k.autolinker),
                                        c = l.content,
                                        d.length = 0,
                                        m.link(c), !d.length)
                                        continue;
                                    for (u = [],
                                        f = l.level,
                                        p = 0; p < d.length; p++)
                                        e.inline.validateLink(d[p].url) && ((h = c.indexOf(d[p].text)) && (f = f,
                                                u.push({
                                                    type: "text",
                                                    content: c.slice(0, h),
                                                    level: f
                                                })),
                                            u.push({
                                                type: "link_open",
                                                href: d[p].url,
                                                title: "",
                                                level: f++
                                            }),
                                            u.push({
                                                type: "text",
                                                content: d[p].text,
                                                level: f
                                            }),
                                            u.push({
                                                type: "link_close",
                                                level: --f
                                            }),
                                            c = c.slice(h + d[p].text.length));
                                    c.length && u.push({
                                            type: "text",
                                            content: c,
                                            level: f
                                        }),
                                        v[r].children = a = [].concat(a.slice(0, t), u, a.slice(t + 1))
                                }
                            } else
                                for (t--; a[t].level !== l.level && "link_open" !== a[t].type;)
                                    t--
        }
    }, function(e, t, r) {
        var n, s, o;
        /*!
         * Autolinker.js
         * 0.28.1
         *
         * Copyright(c) 2016 Gregory Jacobs <greg@greg-jacobs.com>
         * MIT License
         *
         * https://github.com/gregjacobs/Autolinker.js
         */
        s = [],
            void 0 === (o = "function" == typeof(n = function() {
                var e, t, r, n, s, o, i, a = function(e) {
                    e = e || {},
                        this.version = a.version,
                        this.urls = this.normalizeUrlsCfg(e.urls),
                        this.email = "boolean" != typeof e.email || e.email,
                        this.twitter = "boolean" != typeof e.twitter || e.twitter,
                        this.phone = "boolean" != typeof e.phone || e.phone,
                        this.hashtag = e.hashtag || !1,
                        this.newWindow = "boolean" != typeof e.newWindow || e.newWindow,
                        this.stripPrefix = "boolean" != typeof e.stripPrefix || e.stripPrefix;
                    var t = this.hashtag;
                    if (!1 !== t && "twitter" !== t && "facebook" !== t && "instagram" !== t)
                        throw new Error("invalid `hashtag` cfg - see docs");
                    this.truncate = this.normalizeTruncateCfg(e.truncate),
                        this.className = e.className || "",
                        this.replaceFn = e.replaceFn || null,
                        this.htmlParser = null,
                        this.matchers = null,
                        this.tagBuilder = null
                };
                return a.link = function(e, t) {
                        return new a(t).link(e)
                    },
                    a.version = "0.28.1",
                    a.prototype = {
                        constructor: a,
                        normalizeUrlsCfg: function(e) {
                            return null == e && (e = !0),
                                "boolean" == typeof e ? {
                                    schemeMatches: e,
                                    wwwMatches: e,
                                    tldMatches: e
                                } : {
                                    schemeMatches: "boolean" != typeof e.schemeMatches || e.schemeMatches,
                                    wwwMatches: "boolean" != typeof e.wwwMatches || e.wwwMatches,
                                    tldMatches: "boolean" != typeof e.tldMatches || e.tldMatches
                                }
                        },
                        normalizeTruncateCfg: function(e) {
                            return "number" == typeof e ? {
                                length: e,
                                location: "end"
                            } : a.Util.defaults(e || {}, {
                                length: Number.POSITIVE_INFINITY,
                                location: "end"
                            })
                        },
                        parse: function(e) {
                            for (var t = this.getHtmlParser().parse(e), r = 0, n = [], s = 0, o = t.length; s < o; s++) {
                                var i = t[s],
                                    a = i.getType();
                                if ("element" === a && "a" === i.getTagName())
                                    i.isClosing() ? r = Math.max(r - 1, 0) : r++;
                                else if ("text" === a && 0 === r) {
                                    var l = this.parseText(i.getText(), i.getOffset());
                                    n.push.apply(n, l)
                                }
                            }
                            return n = this.compactMatches(n),
                                n = this.removeUnwantedMatches(n)
                        },
                        compactMatches: function(e) {
                            e.sort((function(e, t) {
                                return e.getOffset() - t.getOffset()
                            }));
                            for (var t = 0; t < e.length - 1; t++)
                                for (var r = e[t], n = r.getOffset() + r.getMatchedText().length; t + 1 < e.length && e[t + 1].getOffset() <= n;)
                                    e.splice(t + 1, 1);
                            return e
                        },
                        removeUnwantedMatches: function(e) {
                            var t = a.Util.remove;
                            return this.hashtag || t(e, (function(e) {
                                    return "hashtag" === e.getType()
                                })),
                                this.email || t(e, (function(e) {
                                    return "email" === e.getType()
                                })),
                                this.phone || t(e, (function(e) {
                                    return "phone" === e.getType()
                                })),
                                this.twitter || t(e, (function(e) {
                                    return "twitter" === e.getType()
                                })),
                                this.urls.schemeMatches || t(e, (function(e) {
                                    return "url" === e.getType() && "scheme" === e.getUrlMatchType()
                                })),
                                this.urls.wwwMatches || t(e, (function(e) {
                                    return "url" === e.getType() && "www" === e.getUrlMatchType()
                                })),
                                this.urls.tldMatches || t(e, (function(e) {
                                    return "url" === e.getType() && "tld" === e.getUrlMatchType()
                                })),
                                e
                        },
                        parseText: function(e, t) {
                            t = t || 0;
                            for (var r = this.getMatchers(), n = [], s = 0, o = r.length; s < o; s++) {
                                for (var i = r[s].parseMatches(e), a = 0, l = i.length; a < l; a++)
                                    i[a].setOffset(t + i[a].getOffset());
                                n.push.apply(n, i)
                            }
                            return n
                        },
                        link: function(e) {
                            if (!e)
                                return "";
                            for (var t = this.parse(e), r = [], n = 0, s = 0, o = t.length; s < o; s++) {
                                var i = t[s];
                                r.push(e.substring(n, i.getOffset())),
                                    r.push(this.createMatchReturnVal(i)),
                                    n = i.getOffset() + i.getMatchedText().length
                            }
                            return r.push(e.substring(n)),
                                r.join("")
                        },
                        createMatchReturnVal: function(e) {
                            var t;
                            return this.replaceFn && (t = this.replaceFn.call(this, this, e)),
                                "string" == typeof t ? t : !1 === t ? e.getMatchedText() : t instanceof a.HtmlTag ? t.toAnchorString() : e.buildTag().toAnchorString()
                        },
                        getHtmlParser: function() {
                            var e = this.htmlParser;
                            return e || (e = this.htmlParser = new a.htmlParser.HtmlParser),
                                e
                        },
                        getMatchers: function() {
                            if (this.matchers)
                                return this.matchers;
                            var e = a.matcher,
                                t = this.getTagBuilder(),
                                r = [new e.Hashtag({
                                    tagBuilder: t,
                                    serviceName: this.hashtag
                                }), new e.Email({
                                    tagBuilder: t
                                }), new e.Phone({
                                    tagBuilder: t
                                }), new e.Twitter({
                                    tagBuilder: t
                                }), new e.Url({
                                    tagBuilder: t,
                                    stripPrefix: this.stripPrefix
                                })];
                            return this.matchers = r
                        },
                        getTagBuilder: function() {
                            var e = this.tagBuilder;
                            return e || (e = this.tagBuilder = new a.AnchorTagBuilder({
                                    newWindow: this.newWindow,
                                    truncate: this.truncate,
                                    className: this.className
                                })),
                                e
                        }
                    },
                    a.match = {},
                    a.matcher = {},
                    a.htmlParser = {},
                    a.truncate = {},
                    a.Util = {
                        abstractMethod: function() {
                            throw "abstract"
                        },
                        trimRegex: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                        assign: function(e, t) {
                            for (var r in t)
                                t.hasOwnProperty(r) && (e[r] = t[r]);
                            return e
                        },
                        defaults: function(e, t) {
                            for (var r in t)
                                t.hasOwnProperty(r) && void 0 === e[r] && (e[r] = t[r]);
                            return e
                        },
                        extend: function(e, t) {
                            var r, n = e.prototype,
                                s = function() {};
                            s.prototype = n;
                            var o = (r = t.hasOwnProperty("constructor") ? t.constructor : function() {
                                n.constructor.apply(this, arguments)
                            }).prototype = new s;
                            return o.constructor = r,
                                o.superclass = n,
                                delete t.constructor,
                                a.Util.assign(o, t),
                                r
                        },
                        ellipsis: function(e, t, r) {
                            return e.length > t && (r = null == r ? ".." : r,
                                    e = e.substring(0, t - r.length) + r),
                                e
                        },
                        indexOf: function(e, t) {
                            if (Array.prototype.indexOf)
                                return e.indexOf(t);
                            for (var r = 0, n = e.length; r < n; r++)
                                if (e[r] === t)
                                    return r;
                            return -1
                        },
                        remove: function(e, t) {
                            for (var r = e.length - 1; r >= 0; r--)
                                !0 === t(e[r]) && e.splice(r, 1)
                        },
                        splitAndCapture: function(e, t) {
                            if (!t.global)
                                throw new Error("`splitRegex` must have the 'g' flag set");
                            for (var r, n = [], s = 0; r = t.exec(e);)
                                n.push(e.substring(s, r.index)),
                                n.push(r[0]),
                                s = r.index + r[0].length;
                            return n.push(e.substring(s)),
                                n
                        },
                        trim: function(e) {
                            return e.replace(this.trimRegex, "")
                        }
                    },
                    a.HtmlTag = a.Util.extend(Object, {
                        whitespaceRegex: /\s+/,
                        constructor: function(e) {
                            a.Util.assign(this, e),
                                this.innerHtml = this.innerHtml || this.innerHTML
                        },
                        setTagName: function(e) {
                            return this.tagName = e,
                                this
                        },
                        getTagName: function() {
                            return this.tagName || ""
                        },
                        setAttr: function(e, t) {
                            return this.getAttrs()[e] = t,
                                this
                        },
                        getAttr: function(e) {
                            return this.getAttrs()[e]
                        },
                        setAttrs: function(e) {
                            var t = this.getAttrs();
                            return a.Util.assign(t, e),
                                this
                        },
                        getAttrs: function() {
                            return this.attrs || (this.attrs = {})
                        },
                        setClass: function(e) {
                            return this.setAttr("class", e)
                        },
                        addClass: function(e) {
                            for (var t, r = this.getClass(), n = this.whitespaceRegex, s = a.Util.indexOf, o = r ? r.split(n) : [], i = e.split(n); t = i.shift();)
                                -
                                1 === s(o, t) && o.push(t);
                            return this.getAttrs().class = o.join(" "),
                                this
                        },
                        removeClass: function(e) {
                            for (var t, r = this.getClass(), n = this.whitespaceRegex, s = a.Util.indexOf, o = r ? r.split(n) : [], i = e.split(n); o.length && (t = i.shift());) {
                                var l = s(o, t); -
                                1 !== l && o.splice(l, 1)
                            }
                            return this.getAttrs().class = o.join(" "),
                                this
                        },
                        getClass: function() {
                            return this.getAttrs().class || ""
                        },
                        hasClass: function(e) {
                            return -1 !== (" " + this.getClass() + " ").indexOf(" " + e + " ")
                        },
                        setInnerHtml: function(e) {
                            return this.innerHtml = e,
                                this
                        },
                        getInnerHtml: function() {
                            return this.innerHtml || ""
                        },
                        toAnchorString: function() {
                            var e = this.getTagName(),
                                t = this.buildAttrsStr();
                            return ["<", e, t = t ? " " + t : "", ">", this.getInnerHtml(), "</", e, ">"].join("")
                        },
                        buildAttrsStr: function() {
                            if (!this.attrs)
                                return "";
                            var e = this.getAttrs(),
                                t = [];
                            for (var r in e)
                                e.hasOwnProperty(r) && t.push(r + '="' + e[r] + '"');
                            return t.join(" ")
                        }
                    }),
                    a.RegexLib = {
                        alphaNumericCharsStr: i = "A-Za-z\\xAA\\xB5\\xBA\\xC0-\\xD6\\xD8-\\xF6\\xF8-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞭꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ0-9٠-٩۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯෦-෯๐-๙໐-໙༠-༩၀-၉႐-႙០-៩᠐-᠙᥆-᥏᧐-᧙᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙꘠-꘩꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９",
                        domainNameRegex: new RegExp("[" + i + ".\\-]*[" + i + "\\-]"),
                        tldRegex: /(?:travelersinsurance|sandvikcoromant|kerryproperties|cancerresearch|weatherchannel|kerrylogistics|spreadbetting|international|wolterskluwer|lifeinsurance|construction|pamperedchef|scholarships|versicherung|bridgestone|creditunion|kerryhotels|investments|productions|blackfriday|enterprises|lamborghini|photography|motorcycles|williamhill|playstation|contractors|barclaycard|accountants|redumbrella|engineering|management|telefonica|protection|consulting|tatamotors|creditcard|vlaanderen|schaeffler|associates|properties|foundation|republican|bnpparibas|boehringer|eurovision|extraspace|industries|immobilien|university|technology|volkswagen|healthcare|restaurant|cuisinella|vistaprint|apartments|accountant|travelers|homedepot|institute|vacations|furniture|fresenius|insurance|christmas|bloomberg|solutions|barcelona|firestone|financial|kuokgroup|fairwinds|community|passagens|goldpoint|equipment|lifestyle|yodobashi|aquarelle|marketing|analytics|education|amsterdam|statefarm|melbourne|allfinanz|directory|microsoft|stockholm|montblanc|accenture|lancaster|landrover|everbank|istanbul|graphics|grainger|ipiranga|softbank|attorney|pharmacy|saarland|catering|airforce|yokohama|mortgage|frontier|mutuelle|stcgroup|memorial|pictures|football|symantec|cipriani|ventures|telecity|cityeats|verisign|flsmidth|boutique|cleaning|firmdale|clinique|clothing|redstone|infiniti|deloitte|feedback|services|broadway|plumbing|commbank|training|barclays|exchange|computer|brussels|software|delivery|barefoot|builders|business|bargains|engineer|holdings|download|security|helsinki|lighting|movistar|discount|hdfcbank|supplies|marriott|property|diamonds|capetown|partners|democrat|jpmorgan|bradesco|budapest|rexroth|zuerich|shriram|academy|science|support|youtube|singles|surgery|alibaba|statoil|dentist|schwarz|android|cruises|cricket|digital|markets|starhub|systems|courses|coupons|netbank|country|domains|corsica|network|neustar|realtor|lincoln|limited|schmidt|yamaxun|cooking|contact|auction|spiegel|liaison|leclerc|latrobe|lasalle|abogado|compare|lanxess|exposed|express|company|cologne|college|avianca|lacaixa|fashion|recipes|ferrero|komatsu|storage|wanggou|clubmed|sandvik|fishing|fitness|bauhaus|kitchen|flights|florist|flowers|watches|weather|temasek|samsung|bentley|forsale|channel|theater|frogans|theatre|okinawa|website|tickets|jewelry|gallery|tiffany|iselect|shiksha|brother|organic|wedding|genting|toshiba|origins|philips|hyundai|hotmail|hoteles|hosting|rentals|windows|cartier|bugatti|holiday|careers|whoswho|hitachi|panerai|caravan|reviews|guitars|capital|trading|hamburg|hangout|finance|stream|family|abbott|health|review|travel|report|hermes|hiphop|gratis|career|toyota|hockey|dating|repair|google|social|soccer|reisen|global|otsuka|giving|unicom|casino|photos|center|broker|rocher|orange|bostik|garden|insure|ryukyu|bharti|safety|physio|sakura|oracle|online|jaguar|gallup|piaget|tienda|futbol|pictet|joburg|webcam|berlin|office|juegos|kaufen|chanel|chrome|xihuan|church|tennis|circle|kinder|flickr|bayern|claims|clinic|viajes|nowruz|xperia|norton|yachts|studio|coffee|camera|sanofi|nissan|author|expert|events|comsec|lawyer|tattoo|viking|estate|villas|condos|realty|yandex|energy|emerck|virgin|vision|durban|living|school|coupon|london|taobao|natura|taipei|nagoya|luxury|walter|aramco|sydney|madrid|credit|maison|makeup|schule|market|anquan|direct|design|swatch|suzuki|alsace|vuelos|dental|alipay|voyage|shouji|voting|airtel|mutual|degree|supply|agency|museum|mobily|dealer|monash|select|mormon|active|moscow|racing|datsun|quebec|nissay|rodeo|email|gifts|works|photo|chloe|edeka|cheap|earth|vista|tushu|koeln|glass|shoes|globo|tunes|gmail|nokia|space|kyoto|black|ricoh|seven|lamer|sener|epson|cisco|praxi|trust|citic|crown|shell|lease|green|legal|lexus|ninja|tatar|gripe|nikon|group|video|wales|autos|gucci|party|nexus|guide|linde|adult|parts|amica|lixil|boats|azure|loans|locus|cymru|lotte|lotto|stada|click|poker|quest|dabur|lupin|nadex|paris|faith|dance|canon|place|gives|trade|skype|rocks|mango|cloud|boots|smile|final|swiss|homes|honda|media|horse|cards|deals|watch|bosch|house|pizza|miami|osaka|tours|total|xerox|coach|sucks|style|delta|toray|iinet|tools|money|codes|beats|tokyo|salon|archi|movie|baidu|study|actor|yahoo|store|apple|world|forex|today|bible|tmall|tirol|irish|tires|forum|reise|vegas|vodka|sharp|omega|weber|jetzt|audio|promo|build|bingo|chase|gallo|drive|dubai|rehab|press|solar|sale|beer|bbva|bank|band|auto|sapo|sarl|saxo|audi|asia|arte|arpa|army|yoga|ally|zara|scor|scot|sexy|seat|zero|seek|aero|adac|zone|aarp|maif|meet|meme|menu|surf|mini|mobi|mtpc|porn|desi|star|ltda|name|talk|navy|love|loan|live|link|news|limo|like|spot|life|nico|lidl|lgbt|land|taxi|team|tech|kred|kpmg|sony|song|kiwi|kddi|jprs|jobs|sohu|java|itau|tips|info|immo|icbc|hsbc|town|host|page|toys|here|help|pars|haus|guru|guge|tube|goog|golf|gold|sncf|gmbh|gift|ggee|gent|gbiz|game|vana|pics|fund|ford|ping|pink|fish|film|fast|farm|play|fans|fail|plus|skin|pohl|fage|moda|post|erni|dvag|prod|doha|prof|docs|viva|diet|luxe|site|dell|sina|dclk|show|qpon|date|vote|cyou|voto|read|coop|cool|wang|club|city|chat|cern|cash|reit|rent|casa|cars|care|camp|rest|call|cafe|weir|wien|rich|wiki|buzz|wine|book|bond|room|work|rsvp|shia|ruhr|blue|bing|shaw|bike|safe|xbox|best|pwc|mtn|lds|aig|boo|fyi|nra|nrw|ntt|car|gal|obi|zip|aeg|vin|how|one|ong|onl|dad|ooo|bet|esq|org|htc|bar|uol|ibm|ovh|gdn|ice|icu|uno|gea|ifm|bot|top|wtf|lol|day|pet|eus|wtc|ubs|tvs|aco|ing|ltd|ink|tab|abb|afl|cat|int|pid|pin|bid|cba|gle|com|cbn|ads|man|wed|ceb|gmo|sky|ist|gmx|tui|mba|fan|ski|iwc|app|pro|med|ceo|jcb|jcp|goo|dev|men|aaa|meo|pub|jlc|bom|jll|gop|jmp|mil|got|gov|win|jot|mma|joy|trv|red|cfa|cfd|bio|moe|moi|mom|ren|biz|aws|xin|bbc|dnp|buy|kfh|mov|thd|xyz|fit|kia|rio|rip|kim|dog|vet|nyc|bcg|mtr|bcn|bms|bmw|run|bzh|rwe|tel|stc|axa|kpn|fly|krd|cab|bnl|foo|crs|eat|tci|sap|srl|nec|sas|net|cal|sbs|sfr|sca|scb|csc|edu|new|xxx|hiv|fox|wme|ngo|nhk|vip|sex|frl|lat|yun|law|you|tax|soy|sew|om|ac|hu|se|sc|sg|sh|sb|sa|rw|ru|rs|ro|re|qa|py|si|pw|pt|ps|sj|sk|pr|pn|pm|pl|sl|sm|pk|sn|ph|so|pg|pf|pe|pa|zw|nz|nu|nr|np|no|nl|ni|ng|nf|sr|ne|st|nc|na|mz|my|mx|mw|mv|mu|mt|ms|mr|mq|mp|mo|su|mn|mm|ml|mk|mh|mg|me|sv|md|mc|sx|sy|ma|ly|lv|sz|lu|lt|ls|lr|lk|li|lc|lb|la|tc|kz|td|ky|kw|kr|kp|kn|km|ki|kh|tf|tg|th|kg|ke|jp|jo|jm|je|it|is|ir|tj|tk|tl|tm|iq|tn|to|io|in|im|il|ie|ad|sd|ht|hr|hn|hm|tr|hk|gy|gw|gu|gt|gs|gr|gq|tt|gp|gn|gm|gl|tv|gi|tw|tz|ua|gh|ug|uk|gg|gf|ge|gd|us|uy|uz|va|gb|ga|vc|ve|fr|fo|fm|fk|fj|vg|vi|fi|eu|et|es|er|eg|ee|ec|dz|do|dm|dk|vn|dj|de|cz|cy|cx|cw|vu|cv|cu|cr|co|cn|cm|cl|ck|ci|ch|cg|cf|cd|cc|ca|wf|bz|by|bw|bv|bt|bs|br|bo|bn|bm|bj|bi|ws|bh|bg|bf|be|bd|bb|ba|az|ax|aw|au|at|as|ye|ar|aq|ao|am|al|yt|ai|za|ag|af|ae|zm|id)\b/
                    },
                    a.AnchorTagBuilder = a.Util.extend(Object, {
                        constructor: function(e) {
                            a.Util.assign(this, e)
                        },
                        build: function(e) {
                            return new a.HtmlTag({
                                tagName: "a",
                                attrs: this.createAttrs(e.getType(), e.getAnchorHref()),
                                innerHtml: this.processAnchorText(e.getAnchorText())
                            })
                        },
                        createAttrs: function(e, t) {
                            var r = {
                                    href: t
                                },
                                n = this.createCssClass(e);
                            return n && (r.class = n),
                                this.newWindow && (r.target = "_blank",
                                    r.rel = "noopener noreferrer"),
                                r
                        },
                        createCssClass: function(e) {
                            var t = this.className;
                            return t ? t + " " + t + "-" + e : ""
                        },
                        processAnchorText: function(e) {
                            return e = this.doTruncate(e)
                        },
                        doTruncate: function(e) {
                            var t = this.truncate;
                            if (!t || !t.length)
                                return e;
                            var r = t.length,
                                n = t.location;
                            return "smart" === n ? a.truncate.TruncateSmart(e, r, "..") : "middle" === n ? a.truncate.TruncateMiddle(e, r, "..") : a.truncate.TruncateEnd(e, r, "..")
                        }
                    }),
                    a.htmlParser.HtmlParser = a.Util.extend(Object, {
                        htmlRegex: (s = /(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/,
                            o = /[^\s"'>\/=\x00-\x1F\x7F]+/.source + "(?:\\s*=\\s*" + s.source + ")?",
                            new RegExp(["(?:", "<(!DOCTYPE)", "(?:", "\\s+", "(?:", o, "|", s.source + ")", ")*", ">", ")", "|", "(?:", "<(/)?", "(?:", /!--([\s\S]+?)--/.source, "|", "(?:", "(" + /[0-9a-zA-Z][0-9a-zA-Z:]*/.source + ")", "(?:", "(?:\\s+|\\b)", o, ")*", "\\s*/?", ")", ")", ">", ")"].join(""), "gi")),
                        htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,
                        parse: function(e) {
                            for (var t, r, n = this.htmlRegex, s = 0, o = []; null !== (t = n.exec(e));) {
                                var i = t[0],
                                    a = t[3],
                                    l = t[1] || t[4],
                                    c = !!t[2],
                                    u = t.index,
                                    p = e.substring(s, u);
                                p && (r = this.parseTextAndEntityNodes(s, p),
                                        o.push.apply(o, r)),
                                    a ? o.push(this.createCommentNode(u, i, a)) : o.push(this.createElementNode(u, i, l, c)),
                                    s = u + i.length
                            }
                            if (s < e.length) {
                                var h = e.substring(s);
                                h && (r = this.parseTextAndEntityNodes(s, h),
                                    o.push.apply(o, r))
                            }
                            return o
                        },
                        parseTextAndEntityNodes: function(e, t) {
                            for (var r = [], n = a.Util.splitAndCapture(t, this.htmlCharacterEntitiesRegex), s = 0, o = n.length; s < o; s += 2) {
                                var i = n[s],
                                    l = n[s + 1];
                                i && (r.push(this.createTextNode(e, i)),
                                        e += i.length),
                                    l && (r.push(this.createEntityNode(e, l)),
                                        e += l.length)
                            }
                            return r
                        },
                        createCommentNode: function(e, t, r) {
                            return new a.htmlParser.CommentNode({
                                offset: e,
                                text: t,
                                comment: a.Util.trim(r)
                            })
                        },
                        createElementNode: function(e, t, r, n) {
                            return new a.htmlParser.ElementNode({
                                offset: e,
                                text: t,
                                tagName: r.toLowerCase(),
                                closing: n
                            })
                        },
                        createEntityNode: function(e, t) {
                            return new a.htmlParser.EntityNode({
                                offset: e,
                                text: t
                            })
                        },
                        createTextNode: function(e, t) {
                            return new a.htmlParser.TextNode({
                                offset: e,
                                text: t
                            })
                        }
                    }),
                    a.htmlParser.HtmlNode = a.Util.extend(Object, {
                        offset: void 0,
                        text: void 0,
                        constructor: function(e) {
                            if (a.Util.assign(this, e),
                                null == this.offset)
                                throw new Error("`offset` cfg required");
                            if (null == this.text)
                                throw new Error("`text` cfg required")
                        },
                        getType: a.Util.abstractMethod,
                        getOffset: function() {
                            return this.offset
                        },
                        getText: function() {
                            return this.text
                        }
                    }),
                    a.htmlParser.CommentNode = a.Util.extend(a.htmlParser.HtmlNode, {
                        comment: "",
                        getType: function() {
                            return "comment"
                        },
                        getComment: function() {
                            return this.comment
                        }
                    }),
                    a.htmlParser.ElementNode = a.Util.extend(a.htmlParser.HtmlNode, {
                        tagName: "",
                        closing: !1,
                        getType: function() {
                            return "element"
                        },
                        getTagName: function() {
                            return this.tagName
                        },
                        isClosing: function() {
                            return this.closing
                        }
                    }),
                    a.htmlParser.EntityNode = a.Util.extend(a.htmlParser.HtmlNode, {
                        getType: function() {
                            return "entity"
                        }
                    }),
                    a.htmlParser.TextNode = a.Util.extend(a.htmlParser.HtmlNode, {
                        getType: function() {
                            return "text"
                        }
                    }),
                    a.match.Match = a.Util.extend(Object, {
                        constructor: function(e) {
                            if (null == e.tagBuilder)
                                throw new Error("`tagBuilder` cfg required");
                            if (null == e.matchedText)
                                throw new Error("`matchedText` cfg required");
                            if (null == e.offset)
                                throw new Error("`offset` cfg required");
                            this.tagBuilder = e.tagBuilder,
                                this.matchedText = e.matchedText,
                                this.offset = e.offset
                        },
                        getType: a.Util.abstractMethod,
                        getMatchedText: function() {
                            return this.matchedText
                        },
                        setOffset: function(e) {
                            this.offset = e
                        },
                        getOffset: function() {
                            return this.offset
                        },
                        getAnchorHref: a.Util.abstractMethod,
                        getAnchorText: a.Util.abstractMethod,
                        buildTag: function() {
                            return this.tagBuilder.build(this)
                        }
                    }),
                    a.match.Email = a.Util.extend(a.match.Match, {
                        constructor: function(e) {
                            if (a.match.Match.prototype.constructor.call(this, e), !e.email)
                                throw new Error("`email` cfg required");
                            this.email = e.email
                        },
                        getType: function() {
                            return "email"
                        },
                        getEmail: function() {
                            return this.email
                        },
                        getAnchorHref: function() {
                            return "mailto:" + this.email
                        },
                        getAnchorText: function() {
                            return this.email
                        }
                    }),
                    a.match.Hashtag = a.Util.extend(a.match.Match, {
                        constructor: function(e) {
                            if (a.match.Match.prototype.constructor.call(this, e), !e.hashtag)
                                throw new Error("`hashtag` cfg required");
                            this.serviceName = e.serviceName,
                                this.hashtag = e.hashtag
                        },
                        getType: function() {
                            return "hashtag"
                        },
                        getServiceName: function() {
                            return this.serviceName
                        },
                        getHashtag: function() {
                            return this.hashtag
                        },
                        getAnchorHref: function() {
                            var e = this.serviceName,
                                t = this.hashtag;
                            switch (e) {
                                case "twitter":
                                    return "https://twitter.com/hashtag/" + t;
                                case "facebook":
                                    return "https://www.facebook.com/hashtag/" + t;
                                case "instagram":
                                    return "https://instagram.com/explore/tags/" + t;
                                default:
                                    throw new Error("Unknown service name to point hashtag to: ", e)
                            }
                        },
                        getAnchorText: function() {
                            return "#" + this.hashtag
                        }
                    }),
                    a.match.Phone = a.Util.extend(a.match.Match, {
                        constructor: function(e) {
                            if (a.match.Match.prototype.constructor.call(this, e), !e.number)
                                throw new Error("`number` cfg required");
                            if (null == e.plusSign)
                                throw new Error("`plusSign` cfg required");
                            this.number = e.number,
                                this.plusSign = e.plusSign
                        },
                        getType: function() {
                            return "phone"
                        },
                        getNumber: function() {
                            return this.number
                        },
                        getAnchorHref: function() {
                            return "tel:" + (this.plusSign ? "+" : "") + this.number
                        },
                        getAnchorText: function() {
                            return this.matchedText
                        }
                    }),
                    a.match.Twitter = a.Util.extend(a.match.Match, {
                        constructor: function(e) {
                            if (a.match.Match.prototype.constructor.call(this, e), !e.twitterHandle)
                                throw new Error("`twitterHandle` cfg required");
                            this.twitterHandle = e.twitterHandle
                        },
                        getType: function() {
                            return "twitter"
                        },
                        getTwitterHandle: function() {
                            return this.twitterHandle
                        },
                        getAnchorHref: function() {
                            return "https://twitter.com/" + this.twitterHandle
                        },
                        getAnchorText: function() {
                            return "@" + this.twitterHandle
                        }
                    }),
                    a.match.Url = a.Util.extend(a.match.Match, {
                        constructor: function(e) {
                            if (a.match.Match.prototype.constructor.call(this, e),
                                "scheme" !== e.urlMatchType && "www" !== e.urlMatchType && "tld" !== e.urlMatchType)
                                throw new Error('`urlMatchType` cfg must be one of: "scheme", "www", or "tld"');
                            if (!e.url)
                                throw new Error("`url` cfg required");
                            if (null == e.protocolUrlMatch)
                                throw new Error("`protocolUrlMatch` cfg required");
                            if (null == e.protocolRelativeMatch)
                                throw new Error("`protocolRelativeMatch` cfg required");
                            if (null == e.stripPrefix)
                                throw new Error("`stripPrefix` cfg required");
                            this.urlMatchType = e.urlMatchType,
                                this.url = e.url,
                                this.protocolUrlMatch = e.protocolUrlMatch,
                                this.protocolRelativeMatch = e.protocolRelativeMatch,
                                this.stripPrefix = e.stripPrefix
                        },
                        urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i,
                        protocolRelativeRegex: /^\/\//,
                        protocolPrepended: !1,
                        getType: function() {
                            return "url"
                        },
                        getUrlMatchType: function() {
                            return this.urlMatchType
                        },
                        getUrl: function() {
                            var e = this.url;
                            return this.protocolRelativeMatch || this.protocolUrlMatch || this.protocolPrepended || (e = this.url = "http://" + e,
                                    this.protocolPrepended = !0),
                                e
                        },
                        getAnchorHref: function() {
                            return this.getUrl().replace(/&amp;/g, "&")
                        },
                        getAnchorText: function() {
                            var e = this.getMatchedText();
                            return this.protocolRelativeMatch && (e = this.stripProtocolRelativePrefix(e)),
                                this.stripPrefix && (e = this.stripUrlPrefix(e)),
                                e = this.removeTrailingSlash(e)
                        },
                        stripUrlPrefix: function(e) {
                            return e.replace(this.urlPrefixRegex, "")
                        },
                        stripProtocolRelativePrefix: function(e) {
                            return e.replace(this.protocolRelativeRegex, "")
                        },
                        removeTrailingSlash: function(e) {
                            return "/" === e.charAt(e.length - 1) && (e = e.slice(0, -1)),
                                e
                        }
                    }),
                    a.matcher.Matcher = a.Util.extend(Object, {
                        constructor: function(e) {
                            if (!e.tagBuilder)
                                throw new Error("`tagBuilder` cfg required");
                            this.tagBuilder = e.tagBuilder
                        },
                        parseMatches: a.Util.abstractMethod
                    }),
                    a.matcher.Email = a.Util.extend(a.matcher.Matcher, {
                        matcherRegex: (e = a.RegexLib.alphaNumericCharsStr,
                            t = new RegExp("[" + e + "\\-_';:&=+$.,]+@"),
                            r = a.RegexLib.domainNameRegex,
                            n = a.RegexLib.tldRegex,
                            new RegExp([t.source, r.source, "\\.", n.source].join(""), "gi")),
                        parseMatches: function(e) {
                            for (var t, r = this.matcherRegex, n = this.tagBuilder, s = []; null !== (t = r.exec(e));) {
                                var o = t[0];
                                s.push(new a.match.Email({
                                    tagBuilder: n,
                                    matchedText: o,
                                    offset: t.index,
                                    email: o
                                }))
                            }
                            return s
                        }
                    }),
                    a.matcher.Hashtag = a.Util.extend(a.matcher.Matcher, {
                        matcherRegex: new RegExp("#[_" + a.RegexLib.alphaNumericCharsStr + "]{1,139}", "g"),
                        nonWordCharRegex: new RegExp("[^" + a.RegexLib.alphaNumericCharsStr + "]"),
                        constructor: function(e) {
                            a.matcher.Matcher.prototype.constructor.call(this, e),
                                this.serviceName = e.serviceName
                        },
                        parseMatches: function(e) {
                            for (var t, r = this.matcherRegex, n = this.nonWordCharRegex, s = this.serviceName, o = this.tagBuilder, i = []; null !== (t = r.exec(e));) {
                                var l = t.index,
                                    c = e.charAt(l - 1);
                                if (0 === l || n.test(c)) {
                                    var u = t[0],
                                        p = t[0].slice(1);
                                    i.push(new a.match.Hashtag({
                                        tagBuilder: o,
                                        matchedText: u,
                                        offset: l,
                                        serviceName: s,
                                        hashtag: p
                                    }))
                                }
                            }
                            return i
                        }
                    }),
                    a.matcher.Phone = a.Util.extend(a.matcher.Matcher, {
                        matcherRegex: /(?:(\+)?\d{1,3}[-\040.])?\(?\d{3}\)?[-\040.]?\d{3}[-\040.]\d{4}/g,
                        parseMatches: function(e) {
                            for (var t, r = this.matcherRegex, n = this.tagBuilder, s = []; null !== (t = r.exec(e));) {
                                var o = t[0],
                                    i = o.replace(/\D/g, ""),
                                    l = !!t[1];
                                s.push(new a.match.Phone({
                                    tagBuilder: n,
                                    matchedText: o,
                                    offset: t.index,
                                    number: i,
                                    plusSign: l
                                }))
                            }
                            return s
                        }
                    }),
                    a.matcher.Twitter = a.Util.extend(a.matcher.Matcher, {
                        matcherRegex: new RegExp("@[_" + a.RegexLib.alphaNumericCharsStr + "]{1,20}", "g"),
                        nonWordCharRegex: new RegExp("[^" + a.RegexLib.alphaNumericCharsStr + "]"),
                        parseMatches: function(e) {
                            for (var t, r = this.matcherRegex, n = this.nonWordCharRegex, s = this.tagBuilder, o = []; null !== (t = r.exec(e));) {
                                var i = t.index,
                                    l = e.charAt(i - 1);
                                if (0 === i || n.test(l)) {
                                    var c = t[0],
                                        u = t[0].slice(1);
                                    o.push(new a.match.Twitter({
                                        tagBuilder: s,
                                        matchedText: c,
                                        offset: i,
                                        twitterHandle: u
                                    }))
                                }
                            }
                            return o
                        }
                    }),
                    a.matcher.Url = a.Util.extend(a.matcher.Matcher, {
                        matcherRegex: function() {
                            var e = a.RegexLib.domainNameRegex,
                                t = a.RegexLib.tldRegex,
                                r = a.RegexLib.alphaNumericCharsStr,
                                n = new RegExp("[" + r + "\\-+&@#/%=~_()|'$*\\[\\]?!:,.;]*[" + r + "\\-+&@#/%=~_()|'$*\\[\\]]");
                            return new RegExp(["(?:", "(", /(?:[A-Za-z][-.+A-Za-z0-9]*:(?![A-Za-z][-.+A-Za-z0-9]*:\/\/)(?!\d+\/?)(?:\/\/)?)/.source, e.source, ")", "|", "(", "(//)?", /(?:www\.)/.source, e.source, ")", "|", "(", "(//)?", e.source + "\\.", t.source, ")", ")", "(?:" + n.source + ")?"].join(""), "gi")
                        }(),
                        wordCharRegExp: /\w/,
                        openParensRe: /\(/g,
                        closeParensRe: /\)/g,
                        constructor: function(e) {
                            if (a.matcher.Matcher.prototype.constructor.call(this, e),
                                this.stripPrefix = e.stripPrefix,
                                null == this.stripPrefix)
                                throw new Error("`stripPrefix` cfg required")
                        },
                        parseMatches: function(e) {
                            for (var t, r = this.matcherRegex, n = this.stripPrefix, s = this.tagBuilder, o = []; null !== (t = r.exec(e));) {
                                var i = t[0],
                                    l = t[1],
                                    c = t[2],
                                    u = t[3],
                                    p = t[5],
                                    h = t.index,
                                    f = u || p,
                                    g = e.charAt(h - 1);
                                if (a.matcher.UrlMatchValidator.isValid(i, l) && !(h > 0 && "@" === g || h > 0 && f && this.wordCharRegExp.test(g))) {
                                    if (this.matchHasUnbalancedClosingParen(i))
                                        i = i.substr(0, i.length - 1);
                                    else {
                                        var d = this.matchHasInvalidCharAfterTld(i, l);
                                        d > -1 && (i = i.substr(0, d))
                                    }
                                    var m = l ? "scheme" : c ? "www" : "tld",
                                        b = !!l;
                                    o.push(new a.match.Url({
                                        tagBuilder: s,
                                        matchedText: i,
                                        offset: h,
                                        urlMatchType: m,
                                        url: i,
                                        protocolUrlMatch: b,
                                        protocolRelativeMatch: !!f,
                                        stripPrefix: n
                                    }))
                                }
                            }
                            return o
                        },
                        matchHasUnbalancedClosingParen: function(e) {
                            if (")" === e.charAt(e.length - 1)) {
                                var t = e.match(this.openParensRe),
                                    r = e.match(this.closeParensRe);
                                if ((t && t.length || 0) < (r && r.length || 0))
                                    return !0
                            }
                            return !1
                        },
                        matchHasInvalidCharAfterTld: function(e, t) {
                            if (!e)
                                return -1;
                            var r = 0;
                            t && (r = e.indexOf(":"),
                                e = e.slice(r));
                            var n = /^((.?\/\/)?[A-Za-z0-9\u00C0-\u017F\.\-]*[A-Za-z0-9\u00C0-\u017F\-]\.[A-Za-z]+)/.exec(e);
                            return null === n ? -1 : (r += n[1].length,
                                e = e.slice(n[1].length),
                                /^[^.A-Za-z:\/?#]/.test(e) ? r : -1)
                        }
                    }),
                    a.matcher.UrlMatchValidator = {
                        hasFullProtocolRegex: /^[A-Za-z][-.+A-Za-z0-9]*:\/\//,
                        uriSchemeRegex: /^[A-Za-z][-.+A-Za-z0-9]*:/,
                        hasWordCharAfterProtocolRegex: /:[^\s]*?[A-Za-z\u00C0-\u017F]/,
                        ipRegex: /[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?\.[0-9][0-9]?[0-9]?(:[0-9]*)?\/?$/,
                        isValid: function(e, t) {
                            return !(t && !this.isValidUriScheme(t) || this.urlMatchDoesNotHaveProtocolOrDot(e, t) || this.urlMatchDoesNotHaveAtLeastOneWordChar(e, t) && !this.isValidIpAddress(e))
                        },
                        isValidIpAddress: function(e) {
                            var t = new RegExp(this.hasFullProtocolRegex.source + this.ipRegex.source);
                            return null !== e.match(t)
                        },
                        isValidUriScheme: function(e) {
                            var t = e.match(this.uriSchemeRegex)[0].toLowerCase();
                            return "javascript:" !== t && "vbscript:" !== t
                        },
                        urlMatchDoesNotHaveProtocolOrDot: function(e, t) {
                            return !(!e || t && this.hasFullProtocolRegex.test(t) || -1 !== e.indexOf("."))
                        },
                        urlMatchDoesNotHaveAtLeastOneWordChar: function(e, t) {
                            return !(!e || !t || this.hasWordCharAfterProtocolRegex.test(e))
                        }
                    },
                    a.truncate.TruncateEnd = function(e, t, r) {
                        return a.Util.ellipsis(e, t, r)
                    },
                    a.truncate.TruncateMiddle = function(e, t, r) {
                        if (e.length <= t)
                            return e;
                        var n = t - r.length,
                            s = "";
                        return n > 0 && (s = e.substr(-1 * Math.floor(n / 2))),
                            (e.substr(0, Math.ceil(n / 2)) + r + s).substr(0, t)
                    },
                    a.truncate.TruncateSmart = function(e, t, r) {
                        var n = function(e) {
                                var t = "";
                                return e.scheme && e.host && (t += e.scheme + "://"),
                                    e.host && (t += e.host),
                                    e.path && (t += "/" + e.path),
                                    e.query && (t += "?" + e.query),
                                    e.fragment && (t += "#" + e.fragment),
                                    t
                            },
                            s = function(e, t) {
                                var n = t / 2,
                                    s = Math.ceil(n),
                                    o = -1 * Math.floor(n),
                                    i = "";
                                return o < 0 && (i = e.substr(o)),
                                    e.substr(0, s) + r + i
                            };
                        if (e.length <= t)
                            return e;
                        var o = t - r.length,
                            i = function(e) {
                                var t = {},
                                    r = e,
                                    n = r.match(/^([a-z]+):\/\//i);
                                return n && (t.scheme = n[1],
                                        r = r.substr(n[0].length)),
                                    (n = r.match(/^(.*?)(?=(\?|#|\/|$))/i)) && (t.host = n[1],
                                        r = r.substr(n[0].length)),
                                    (n = r.match(/^\/(.*?)(?=(\?|#|$))/i)) && (t.path = n[1],
                                        r = r.substr(n[0].length)),
                                    (n = r.match(/^\?(.*?)(?=(#|$))/i)) && (t.query = n[1],
                                        r = r.substr(n[0].length)),
                                    (n = r.match(/^#(.*?)$/i)) && (t.fragment = n[1]),
                                    t
                            }(e);
                        if (i.query) {
                            var a = i.query.match(/^(.*?)(?=(\?|\#))(.*?)$/i);
                            a && (i.query = i.query.substr(0, a[1].length),
                                e = n(i))
                        }
                        if (e.length <= t)
                            return e;
                        if (i.host && (i.host = i.host.replace(/^www\./, ""),
                                e = n(i)),
                            e.length <= t)
                            return e;
                        var l = "";
                        if (i.host && (l += i.host),
                            l.length >= o)
                            return i.host.length == t ? (i.host.substr(0, t - r.length) + r).substr(0, t) : s(l, o).substr(0, t);
                        var c = "";
                        if (i.path && (c += "/" + i.path),
                            i.query && (c += "?" + i.query),
                            c) {
                            if ((l + c).length >= o)
                                return (l + c).length == t ? (l + c).substr(0, t) : (l + s(c, o - l.length)).substr(0, t);
                            l += c
                        }
                        if (i.fragment) {
                            var u = "#" + i.fragment;
                            if ((l + u).length >= o)
                                return (l + u).length == t ? (l + u).substr(0, t) : (l + s(u, o - l.length)).substr(0, t);
                            l += u
                        }
                        if (i.scheme && i.host) {
                            var p = i.scheme + "://";
                            if ((l + p).length < o)
                                return (p + l).substr(0, t)
                        }
                        if (l.length <= t)
                            return l;
                        var h = "";
                        return o > 0 && (h = l.substr(-1 * Math.floor(o / 2))),
                            (l.substr(0, Math.ceil(o / 2)) + r + h).substr(0, t)
                    },
                    a
            }) ? n.apply(t, s) : n) || (e.exports = o)
    }, function(e, t, r) {
        "use strict";
        var n = r(5),
            s = r(31),
            o = [
                ["code", r(32)],
                ["fences", r(33), ["paragraph", "blockquote", "list"]],
                ["blockquote", r(34), ["paragraph", "blockquote", "list"]],
                ["hr", r(35), ["paragraph", "blockquote", "list"]],
                ["list", r(36), ["paragraph", "blockquote"]],
                ["footnote", r(37), ["paragraph"]],
                ["heading", r(38), ["paragraph", "blockquote"]],
                ["lheading", r(39)],
                ["htmlblock", r(40), ["paragraph", "blockquote"]],
                ["table", r(42), ["paragraph"]],
                ["deflist", r(43), ["paragraph"]],
                ["paragraph", r(44)]
            ];

        function i() {
            this.ruler = new n;
            for (var e = 0; e < o.length; e++)
                this.ruler.push(o[e][0], o[e][1], {
                    alt: (o[e][2] || []).slice()
                })
        }
        i.prototype.tokenize = function(e, t, r) {
            for (var n, s = this.ruler.getRules(""), o = s.length, i = t, a = !1; i < r && (e.line = i = e.skipEmptyLines(i), !(i >= r)) && !(e.tShift[i] < e.blkIndent);) {
                for (n = 0; n < o && !s[n](e, i, r, !1); n++)
                ;
                if (e.tight = !a,
                    e.isEmpty(e.line - 1) && (a = !0),
                    (i = e.line) < r && e.isEmpty(i)) {
                    if (a = !0,
                        ++i < r && "list" === e.parentType && e.isEmpty(i))
                        break;
                    e.line = i
                }
            }
        };
        var a = /[\n\t]/g,
            l = /\r[\n\u0085]|[\u2424\u2028\u0085]/g,
            c = /\u00a0/g;
        i.prototype.parse = function(e, t, r, n) {
                var o, i = 0,
                    u = 0;
                if (!e)
                    return [];
                (e = (e = e.replace(c, " ")).replace(l, "\n")).indexOf("\t") >= 0 && (e = e.replace(a, (function(t, r) {
                        var n;
                        return 10 === e.charCodeAt(r) ? (i = r + 1,
                            u = 0,
                            t) : (n = "    ".slice((r - i - u) % 4),
                            u = r - i + 1,
                            n)
                    }))),
                    o = new s(e, this, t, r, n),
                    this.tokenize(o, o.line, o.lineMax)
            },
            e.exports = i
    }, function(e, t, r) {
        "use strict";

        function n(e, t, r, n, s) {
            var o, i, a, l, c, u, p;
            for (this.src = e,
                this.parser = t,
                this.options = r,
                this.env = n,
                this.tokens = s,
                this.bMarks = [],
                this.eMarks = [],
                this.tShift = [],
                this.blkIndent = 0,
                this.line = 0,
                this.lineMax = 0,
                this.tight = !1,
                this.parentType = "root",
                this.ddIndent = -1,
                this.level = 0,
                this.result = "",
                u = 0,
                p = !1,
                a = l = u = 0,
                c = (i = this.src).length; l < c; l++) {
                if (o = i.charCodeAt(l), !p) {
                    if (32 === o) {
                        u++;
                        continue
                    }
                    p = !0
                }
                10 !== o && l !== c - 1 || (10 !== o && l++,
                    this.bMarks.push(a),
                    this.eMarks.push(l),
                    this.tShift.push(u),
                    p = !1,
                    u = 0,
                    a = l + 1)
            }
            this.bMarks.push(i.length),
                this.eMarks.push(i.length),
                this.tShift.push(0),
                this.lineMax = this.bMarks.length - 1
        }
        n.prototype.isEmpty = function(e) {
                return this.bMarks[e] + this.tShift[e] >= this.eMarks[e]
            },
            n.prototype.skipEmptyLines = function(e) {
                for (var t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++)
                ;
                return e
            },
            n.prototype.skipSpaces = function(e) {
                for (var t = this.src.length; e < t && 32 === this.src.charCodeAt(e); e++)
                ;
                return e
            },
            n.prototype.skipChars = function(e, t) {
                for (var r = this.src.length; e < r && this.src.charCodeAt(e) === t; e++)
                ;
                return e
            },
            n.prototype.skipCharsBack = function(e, t, r) {
                if (e <= r)
                    return e;
                for (; e > r;)
                    if (t !== this.src.charCodeAt(--e))
                        return e + 1;
                return e
            },
            n.prototype.getLines = function(e, t, r, n) {
                var s, o, i, a, l, c = e;
                if (e >= t)
                    return "";
                if (c + 1 === t)
                    return o = this.bMarks[c] + Math.min(this.tShift[c], r),
                        i = n ? this.eMarks[c] + 1 : this.eMarks[c],
                        this.src.slice(o, i);
                for (a = new Array(t - e),
                    s = 0; c < t; c++,
                    s++)
                    (l = this.tShift[c]) > r && (l = r),
                    l < 0 && (l = 0),
                    o = this.bMarks[c] + l,
                    i = c + 1 < t || n ? this.eMarks[c] + 1 : this.eMarks[c],
                    a[s] = this.src.slice(o, i);
                return a.join("")
            },
            e.exports = n
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t, r) {
            var n, s;
            if (e.tShift[t] - e.blkIndent < 4)
                return !1;
            for (s = n = t + 1; n < r;)
                if (e.isEmpty(n))
                    n++;
                else {
                    if (!(e.tShift[n] - e.blkIndent >= 4))
                        break;
                    s = ++n
                }
            return e.line = n,
                e.tokens.push({
                    type: "code",
                    content: e.getLines(t, s, 4 + e.blkIndent, !0),
                    block: !0,
                    lines: [t, e.line],
                    level: e.level
                }), !0
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t, r, n) {
            var s, o, i, a, l, c = !1,
                u = e.bMarks[t] + e.tShift[t],
                p = e.eMarks[t];
            if (u + 3 > p)
                return !1;
            if (126 !== (s = e.src.charCodeAt(u)) && 96 !== s)
                return !1;
            if (l = u,
                (o = (u = e.skipChars(u, s)) - l) < 3)
                return !1;
            if ((i = e.src.slice(u, p).trim()).indexOf("`") >= 0)
                return !1;
            if (n)
                return !0;
            for (a = t; !(++a >= r) && !((u = l = e.bMarks[a] + e.tShift[a]) < (p = e.eMarks[a]) && e.tShift[a] < e.blkIndent);)
                if (e.src.charCodeAt(u) === s && !(e.tShift[a] - e.blkIndent >= 4 || (u = e.skipChars(u, s)) - l < o || (u = e.skipSpaces(u)) < p)) {
                    c = !0;
                    break
                }
            return o = e.tShift[t],
                e.line = a + (c ? 1 : 0),
                e.tokens.push({
                    type: "fence",
                    params: i,
                    content: e.getLines(t + 1, a, o, !0),
                    lines: [t, e.line],
                    level: e.level
                }), !0
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t, r, n) {
            var s, o, i, a, l, c, u, p, h, f, g, d = e.bMarks[t] + e.tShift[t],
                m = e.eMarks[t];
            if (d > m)
                return !1;
            if (62 !== e.src.charCodeAt(d++))
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            if (n)
                return !0;
            for (32 === e.src.charCodeAt(d) && d++,
                l = e.blkIndent,
                e.blkIndent = 0,
                a = [e.bMarks[t]],
                e.bMarks[t] = d,
                o = (d = d < m ? e.skipSpaces(d) : d) >= m,
                i = [e.tShift[t]],
                e.tShift[t] = d - e.bMarks[t],
                p = e.parser.ruler.getRules("blockquote"),
                s = t + 1; s < r && !((d = e.bMarks[s] + e.tShift[s]) >= (m = e.eMarks[s])); s++)
                if (62 !== e.src.charCodeAt(d++)) {
                    if (o)
                        break;
                    for (g = !1,
                        h = 0,
                        f = p.length; h < f; h++)
                        if (p[h](e, s, r, !0)) {
                            g = !0;
                            break
                        }
                    if (g)
                        break;
                    a.push(e.bMarks[s]),
                        i.push(e.tShift[s]),
                        e.tShift[s] = -1337
                } else
                    32 === e.src.charCodeAt(d) && d++,
                    a.push(e.bMarks[s]),
                    e.bMarks[s] = d,
                    o = (d = d < m ? e.skipSpaces(d) : d) >= m,
                    i.push(e.tShift[s]),
                    e.tShift[s] = d - e.bMarks[s];
            for (c = e.parentType,
                e.parentType = "blockquote",
                e.tokens.push({
                    type: "blockquote_open",
                    lines: u = [t, 0],
                    level: e.level++
                }),
                e.parser.tokenize(e, t, s),
                e.tokens.push({
                    type: "blockquote_close",
                    level: --e.level
                }),
                e.parentType = c,
                u[1] = e.line,
                h = 0; h < i.length; h++)
                e.bMarks[h + t] = a[h],
                e.tShift[h + t] = i[h];
            return e.blkIndent = l, !0
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t, r, n) {
            var s, o, i, a = e.bMarks[t],
                l = e.eMarks[t];
            if ((a += e.tShift[t]) > l)
                return !1;
            if (42 !== (s = e.src.charCodeAt(a++)) && 45 !== s && 95 !== s)
                return !1;
            for (o = 1; a < l;) {
                if ((i = e.src.charCodeAt(a++)) !== s && 32 !== i)
                    return !1;
                i === s && o++
            }
            return !(o < 3) && (n || (e.line = t + 1,
                e.tokens.push({
                    type: "hr",
                    lines: [t, e.line],
                    level: e.level
                })), !0)
        }
    }, function(e, t, r) {
        "use strict";

        function n(e, t) {
            var r, n, s;
            return (n = e.bMarks[t] + e.tShift[t]) >= (s = e.eMarks[t]) || 42 !== (r = e.src.charCodeAt(n++)) && 45 !== r && 43 !== r || n < s && 32 !== e.src.charCodeAt(n) ? -1 : n
        }

        function s(e, t) {
            var r, n = e.bMarks[t] + e.tShift[t],
                s = e.eMarks[t];
            if (n + 1 >= s)
                return -1;
            if ((r = e.src.charCodeAt(n++)) < 48 || r > 57)
                return -1;
            for (;;) {
                if (n >= s)
                    return -1;
                if (!((r = e.src.charCodeAt(n++)) >= 48 && r <= 57)) {
                    if (41 === r || 46 === r)
                        break;
                    return -1
                }
            }
            return n < s && 32 !== e.src.charCodeAt(n) ? -1 : n
        }
        e.exports = function(e, t, r, o) {
            var i, a, l, c, u, p, h, f, g, d, m, b, v, k, y, x, w, _, A, q, C, M = !0;
            if ((f = s(e, t)) >= 0)
                b = !0;
            else {
                if (!((f = n(e, t)) >= 0))
                    return !1;
                b = !1
            }
            if (e.level >= e.options.maxNesting)
                return !1;
            if (m = e.src.charCodeAt(f - 1),
                o)
                return !0;
            for (k = e.tokens.length,
                b ? (h = e.bMarks[t] + e.tShift[t],
                    d = Number(e.src.substr(h, f - h - 1)),
                    e.tokens.push({
                        type: "ordered_list_open",
                        order: d,
                        lines: x = [t, 0],
                        level: e.level++
                    })) : e.tokens.push({
                    type: "bullet_list_open",
                    lines: x = [t, 0],
                    level: e.level++
                }),
                i = t,
                y = !1,
                _ = e.parser.ruler.getRules("list"); !(!(i < r) || ((g = (v = e.skipSpaces(f)) >= e.eMarks[i] ? 1 : v - f) > 4 && (g = 1),
                    g < 1 && (g = 1),
                    a = f - e.bMarks[i] + g,
                    e.tokens.push({
                        type: "list_item_open",
                        lines: w = [t, 0],
                        level: e.level++
                    }),
                    c = e.blkIndent,
                    u = e.tight,
                    l = e.tShift[t],
                    p = e.parentType,
                    e.tShift[t] = v - e.bMarks[t],
                    e.blkIndent = a,
                    e.tight = !0,
                    e.parentType = "list",
                    e.parser.tokenize(e, t, r, !0),
                    e.tight && !y || (M = !1),
                    y = e.line - t > 1 && e.isEmpty(e.line - 1),
                    e.blkIndent = c,
                    e.tShift[t] = l,
                    e.tight = u,
                    e.parentType = p,
                    e.tokens.push({
                        type: "list_item_close",
                        level: --e.level
                    }),
                    i = t = e.line,
                    w[1] = i,
                    v = e.bMarks[t],
                    i >= r) || e.isEmpty(i) || e.tShift[i] < e.blkIndent);) {
                for (C = !1,
                    A = 0,
                    q = _.length; A < q; A++)
                    if (_[A](e, i, r, !0)) {
                        C = !0;
                        break
                    }
                if (C)
                    break;
                if (b) {
                    if ((f = s(e, i)) < 0)
                        break
                } else if ((f = n(e, i)) < 0)
                    break;
                if (m !== e.src.charCodeAt(f - 1))
                    break
            }
            return e.tokens.push({
                    type: b ? "ordered_list_close" : "bullet_list_close",
                    level: --e.level
                }),
                x[1] = i,
                e.line = i,
                M && function(e, t) {
                    var r, n, s = e.level + 2;
                    for (r = t + 2,
                        n = e.tokens.length - 2; r < n; r++)
                        e.tokens[r].level === s && "paragraph_open" === e.tokens[r].type && (e.tokens[r + 2].tight = !0,
                            e.tokens[r].tight = !0,
                            r += 2)
                }(e, k), !0
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t, r, n) {
            var s, o, i, a, l, c = e.bMarks[t] + e.tShift[t],
                u = e.eMarks[t];
            if (c + 4 > u)
                return !1;
            if (91 !== e.src.charCodeAt(c))
                return !1;
            if (94 !== e.src.charCodeAt(c + 1))
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            for (a = c + 2; a < u; a++) {
                if (32 === e.src.charCodeAt(a))
                    return !1;
                if (93 === e.src.charCodeAt(a))
                    break
            }
            return a !== c + 2 && (!(a + 1 >= u || 58 !== e.src.charCodeAt(++a)) && (n || (a++,
                e.env.footnotes || (e.env.footnotes = {}),
                e.env.footnotes.refs || (e.env.footnotes.refs = {}),
                l = e.src.slice(c + 2, a - 2),
                e.env.footnotes.refs[":" + l] = -1,
                e.tokens.push({
                    type: "footnote_reference_open",
                    label: l,
                    level: e.level++
                }),
                s = e.bMarks[t],
                o = e.tShift[t],
                i = e.parentType,
                e.tShift[t] = e.skipSpaces(a) - a,
                e.bMarks[t] = a,
                e.blkIndent += 4,
                e.parentType = "footnote",
                e.tShift[t] < e.blkIndent && (e.tShift[t] += e.blkIndent,
                    e.bMarks[t] -= e.blkIndent),
                e.parser.tokenize(e, t, r, !0),
                e.parentType = i,
                e.blkIndent -= 4,
                e.tShift[t] = o,
                e.bMarks[t] = s,
                e.tokens.push({
                    type: "footnote_reference_close",
                    level: --e.level
                })), !0))
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t, r, n) {
            var s, o, i, a = e.bMarks[t] + e.tShift[t],
                l = e.eMarks[t];
            if (a >= l)
                return !1;
            if (35 !== (s = e.src.charCodeAt(a)) || a >= l)
                return !1;
            for (o = 1,
                s = e.src.charCodeAt(++a); 35 === s && a < l && o <= 6;)
                o++,
                s = e.src.charCodeAt(++a);
            return !(o > 6 || a < l && 32 !== s) && (n || (l = e.skipCharsBack(l, 32, a),
                (i = e.skipCharsBack(l, 35, a)) > a && 32 === e.src.charCodeAt(i - 1) && (l = i),
                e.line = t + 1,
                e.tokens.push({
                    type: "heading_open",
                    hLevel: o,
                    lines: [t, e.line],
                    level: e.level
                }),
                a < l && e.tokens.push({
                    type: "inline",
                    content: e.src.slice(a, l).trim(),
                    level: e.level + 1,
                    lines: [t, e.line],
                    children: []
                }),
                e.tokens.push({
                    type: "heading_close",
                    hLevel: o,
                    level: e.level
                })), !0)
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t, r) {
            var n, s, o, i = t + 1;
            return !(i >= r) && (!(e.tShift[i] < e.blkIndent) && (!(e.tShift[i] - e.blkIndent > 3) && (!((s = e.bMarks[i] + e.tShift[i]) >= (o = e.eMarks[i])) && ((45 === (n = e.src.charCodeAt(s)) || 61 === n) && (s = e.skipChars(s, n), !((s = e.skipSpaces(s)) < o) && (s = e.bMarks[t] + e.tShift[t],
                e.line = i + 1,
                e.tokens.push({
                    type: "heading_open",
                    hLevel: 61 === n ? 1 : 2,
                    lines: [t, e.line],
                    level: e.level
                }),
                e.tokens.push({
                    type: "inline",
                    content: e.src.slice(s, e.eMarks[t]).trim(),
                    level: e.level + 1,
                    lines: [t, e.line - 1],
                    children: []
                }),
                e.tokens.push({
                    type: "heading_close",
                    hLevel: 61 === n ? 1 : 2,
                    level: e.level
                }), !0))))))
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(41),
            s = /^<([a-zA-Z]{1,15})[\s\/>]/,
            o = /^<\/([a-zA-Z]{1,15})[\s>]/;
        e.exports = function(e, t, r, i) {
            var a, l, c, u = e.bMarks[t],
                p = e.eMarks[t],
                h = e.tShift[t];
            if (u += h, !e.options.html)
                return !1;
            if (h > 3 || u + 2 >= p)
                return !1;
            if (60 !== e.src.charCodeAt(u))
                return !1;
            if (33 === (a = e.src.charCodeAt(u + 1)) || 63 === a) {
                if (i)
                    return !0
            } else {
                if (47 !== a && ! function(e) {
                        var t = 32 | e;
                        return t >= 97 && t <= 122
                    }(a))
                    return !1;
                if (47 === a) {
                    if (!(l = e.src.slice(u, p).match(o)))
                        return !1
                } else if (!(l = e.src.slice(u, p).match(s)))
                    return !1;
                if (!0 !== n[l[1].toLowerCase()])
                    return !1;
                if (i)
                    return !0
            }
            for (c = t + 1; c < e.lineMax && !e.isEmpty(c);)
                c++;
            return e.line = c,
                e.tokens.push({
                    type: "htmlblock",
                    level: e.level,
                    lines: [t, e.line],
                    content: e.getLines(t, c, 0, !0)
                }), !0
        }
    }, function(e, t, r) {
        "use strict";
        var n = {};
        ["article", "aside", "button", "blockquote", "body", "canvas", "caption", "col", "colgroup", "dd", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "iframe", "li", "map", "object", "ol", "output", "p", "pre", "progress", "script", "section", "style", "table", "tbody", "td", "textarea", "tfoot", "th", "tr", "thead", "ul", "video"].forEach((function(e) {
                n[e] = !0
            })),
            e.exports = n
    }, function(e, t, r) {
        "use strict";

        function n(e, t) {
            var r = e.bMarks[t] + e.blkIndent,
                n = e.eMarks[t];
            return e.src.substr(r, n - r)
        }
        e.exports = function(e, t, r, s) {
            var o, i, a, l, c, u, p, h, f, g, d;
            if (t + 2 > r)
                return !1;
            if (c = t + 1,
                e.tShift[c] < e.blkIndent)
                return !1;
            if ((a = e.bMarks[c] + e.tShift[c]) >= e.eMarks[c])
                return !1;
            if (124 !== (o = e.src.charCodeAt(a)) && 45 !== o && 58 !== o)
                return !1;
            if (i = n(e, t + 1), !/^[-:| ]+$/.test(i))
                return !1;
            if ((u = i.split("|")) <= 2)
                return !1;
            for (h = [],
                l = 0; l < u.length; l++) {
                if (!(f = u[l].trim())) {
                    if (0 === l || l === u.length - 1)
                        continue;
                    return !1
                }
                if (!/^:?-+:?$/.test(f))
                    return !1;
                58 === f.charCodeAt(f.length - 1) ? h.push(58 === f.charCodeAt(0) ? "center" : "right") : 58 === f.charCodeAt(0) ? h.push("left") : h.push("")
            }
            if (-1 === (i = n(e, t).trim()).indexOf("|"))
                return !1;
            if (u = i.replace(/^\||\|$/g, "").split("|"),
                h.length !== u.length)
                return !1;
            if (s)
                return !0;
            for (e.tokens.push({
                    type: "table_open",
                    lines: g = [t, 0],
                    level: e.level++
                }),
                e.tokens.push({
                    type: "thead_open",
                    lines: [t, t + 1],
                    level: e.level++
                }),
                e.tokens.push({
                    type: "tr_open",
                    lines: [t, t + 1],
                    level: e.level++
                }),
                l = 0; l < u.length; l++)
                e.tokens.push({
                    type: "th_open",
                    align: h[l],
                    lines: [t, t + 1],
                    level: e.level++
                }),
                e.tokens.push({
                    type: "inline",
                    content: u[l].trim(),
                    lines: [t, t + 1],
                    level: e.level,
                    children: []
                }),
                e.tokens.push({
                    type: "th_close",
                    level: --e.level
                });
            for (e.tokens.push({
                    type: "tr_close",
                    level: --e.level
                }),
                e.tokens.push({
                    type: "thead_close",
                    level: --e.level
                }),
                e.tokens.push({
                    type: "tbody_open",
                    lines: d = [t + 2, 0],
                    level: e.level++
                }),
                c = t + 2; c < r && !(e.tShift[c] < e.blkIndent) && -1 !== (i = n(e, c).trim()).indexOf("|"); c++) {
                for (u = i.replace(/^\||\|$/g, "").split("|"),
                    e.tokens.push({
                        type: "tr_open",
                        level: e.level++
                    }),
                    l = 0; l < u.length; l++)
                    e.tokens.push({
                        type: "td_open",
                        align: h[l],
                        level: e.level++
                    }),
                    p = u[l].substring(124 === u[l].charCodeAt(0) ? 1 : 0, 124 === u[l].charCodeAt(u[l].length - 1) ? u[l].length - 1 : u[l].length).trim(),
                    e.tokens.push({
                        type: "inline",
                        content: p,
                        level: e.level,
                        children: []
                    }),
                    e.tokens.push({
                        type: "td_close",
                        level: --e.level
                    });
                e.tokens.push({
                    type: "tr_close",
                    level: --e.level
                })
            }
            return e.tokens.push({
                    type: "tbody_close",
                    level: --e.level
                }),
                e.tokens.push({
                    type: "table_close",
                    level: --e.level
                }),
                g[1] = d[1] = c,
                e.line = c, !0
        }
    }, function(e, t, r) {
        "use strict";

        function n(e, t) {
            var r, n, s = e.bMarks[t] + e.tShift[t],
                o = e.eMarks[t];
            return s >= o || 126 !== (n = e.src.charCodeAt(s++)) && 58 !== n || s === (r = e.skipSpaces(s)) || r >= o ? -1 : r
        }
        e.exports = function(e, t, r, s) {
            var o, i, a, l, c, u, p, h, f, g, d, m, b, v;
            if (s)
                return !(e.ddIndent < 0) && n(e, t) >= 0;
            if (p = t + 1,
                e.isEmpty(p) && ++p > r)
                return !1;
            if (e.tShift[p] < e.blkIndent)
                return !1;
            if ((o = n(e, p)) < 0)
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            u = e.tokens.length,
                e.tokens.push({
                    type: "dl_open",
                    lines: c = [t, 0],
                    level: e.level++
                }),
                a = t,
                i = p;
            e: for (;;) {
                for (v = !0,
                    b = !1,
                    e.tokens.push({
                        type: "dt_open",
                        lines: [a, a],
                        level: e.level++
                    }),
                    e.tokens.push({
                        type: "inline",
                        content: e.getLines(a, a + 1, e.blkIndent, !1).trim(),
                        level: e.level + 1,
                        lines: [a, a],
                        children: []
                    }),
                    e.tokens.push({
                        type: "dt_close",
                        level: --e.level
                    });;) {
                    if (e.tokens.push({
                            type: "dd_open",
                            lines: l = [p, 0],
                            level: e.level++
                        }),
                        m = e.tight,
                        f = e.ddIndent,
                        h = e.blkIndent,
                        d = e.tShift[i],
                        g = e.parentType,
                        e.blkIndent = e.ddIndent = e.tShift[i] + 2,
                        e.tShift[i] = o - e.bMarks[i],
                        e.tight = !0,
                        e.parentType = "deflist",
                        e.parser.tokenize(e, i, r, !0),
                        e.tight && !b || (v = !1),
                        b = e.line - i > 1 && e.isEmpty(e.line - 1),
                        e.tShift[i] = d,
                        e.tight = m,
                        e.parentType = g,
                        e.blkIndent = h,
                        e.ddIndent = f,
                        e.tokens.push({
                            type: "dd_close",
                            level: --e.level
                        }),
                        l[1] = p = e.line,
                        p >= r)
                        break e;
                    if (e.tShift[p] < e.blkIndent)
                        break e;
                    if ((o = n(e, p)) < 0)
                        break;
                    i = p
                }
                if (p >= r)
                    break;
                if (a = p,
                    e.isEmpty(a))
                    break;
                if (e.tShift[a] < e.blkIndent)
                    break;
                if ((i = a + 1) >= r)
                    break;
                if (e.isEmpty(i) && i++,
                    i >= r)
                    break;
                if (e.tShift[i] < e.blkIndent)
                    break;
                if ((o = n(e, i)) < 0)
                    break
            }
            return e.tokens.push({
                    type: "dl_close",
                    level: --e.level
                }),
                c[1] = p,
                e.line = p,
                v && function(e, t) {
                    var r, n, s = e.level + 2;
                    for (r = t + 2,
                        n = e.tokens.length - 2; r < n; r++)
                        e.tokens[r].level === s && "paragraph_open" === e.tokens[r].type && (e.tokens[r + 2].tight = !0,
                            e.tokens[r].tight = !0,
                            r += 2)
                }(e, u), !0
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            var r, n, s, o, i, a, l = t + 1;
            if (l < (r = e.lineMax) && !e.isEmpty(l))
                for (a = e.parser.ruler.getRules("paragraph"); l < r && !e.isEmpty(l); l++)
                    if (!(e.tShift[l] - e.blkIndent > 3)) {
                        for (s = !1,
                            o = 0,
                            i = a.length; o < i; o++)
                            if (a[o](e, l, r, !0)) {
                                s = !0;
                                break
                            }
                        if (s)
                            break
                    }
            return n = e.getLines(t, l, e.blkIndent, !1).trim(),
                e.line = l,
                n.length && (e.tokens.push({
                        type: "paragraph_open",
                        tight: !1,
                        lines: [t, e.line],
                        level: e.level
                    }),
                    e.tokens.push({
                        type: "inline",
                        content: n,
                        level: e.level + 1,
                        lines: [t, e.line],
                        children: []
                    }),
                    e.tokens.push({
                        type: "paragraph_close",
                        tight: !1,
                        level: e.level
                    })), !0
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(5),
            s = r(8),
            o = r(2),
            i = [
                ["text", r(46)],
                ["newline", r(47)],
                ["escape", r(48)],
                ["backticks", r(49)],
                ["del", r(50)],
                ["ins", r(51)],
                ["mark", r(52)],
                ["emphasis", r(53)],
                ["sub", r(54)],
                ["sup", r(55)],
                ["links", r(56)],
                ["footnote_inline", r(57)],
                ["footnote_ref", r(58)],
                ["autolink", r(59)],
                ["htmltag", r(61)],
                ["entity", r(63)]
            ];

        function a() {
            this.ruler = new n;
            for (var e = 0; e < i.length; e++)
                this.ruler.push(i[e][0], i[e][1]);
            this.validateLink = l
        }

        function l(e) {
            var t = e.trim().toLowerCase();
            return -1 === (t = o.replaceEntities(t)).indexOf(":") || -1 === ["vbscript", "javascript", "file", "data"].indexOf(t.split(":")[0])
        }
        a.prototype.skipToken = function(e) {
                var t, r, n = this.ruler.getRules(""),
                    s = n.length,
                    o = e.pos;
                if ((r = e.cacheGet(o)) > 0)
                    e.pos = r;
                else {
                    for (t = 0; t < s; t++)
                        if (n[t](e, !0))
                            return void e.cacheSet(o, e.pos);
                    e.pos++,
                        e.cacheSet(o, e.pos)
                }
            },
            a.prototype.tokenize = function(e) {
                for (var t, r, n = this.ruler.getRules(""), s = n.length, o = e.posMax; e.pos < o;) {
                    for (r = 0; r < s && !(t = n[r](e, !1)); r++)
                    ;
                    if (t) {
                        if (e.pos >= o)
                            break
                    } else
                        e.pending += e.src[e.pos++]
                }
                e.pending && e.pushPending()
            },
            a.prototype.parse = function(e, t, r, n) {
                var o = new s(e, this, t, r, n);
                this.tokenize(o)
            },
            e.exports = a
    }, function(e, t, r) {
        "use strict";

        function n(e) {
            switch (e) {
                case 10:
                case 92:
                case 96:
                case 42:
                case 95:
                case 94:
                case 91:
                case 93:
                case 33:
                case 38:
                case 60:
                case 62:
                case 123:
                case 125:
                case 36:
                case 37:
                case 64:
                case 126:
                case 43:
                case 61:
                case 58:
                    return !0;
                default:
                    return !1
            }
        }
        e.exports = function(e, t) {
            for (var r = e.pos; r < e.posMax && !n(e.src.charCodeAt(r));)
                r++;
            return r !== e.pos && (t || (e.pending += e.src.slice(e.pos, r)),
                e.pos = r, !0)
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            var r, n, s = e.pos;
            if (10 !== e.src.charCodeAt(s))
                return !1;
            if (r = e.pending.length - 1,
                n = e.posMax, !t)
                if (r >= 0 && 32 === e.pending.charCodeAt(r))
                    if (r >= 1 && 32 === e.pending.charCodeAt(r - 1)) {
                        for (var o = r - 2; o >= 0; o--)
                            if (32 !== e.pending.charCodeAt(o)) {
                                e.pending = e.pending.substring(0, o + 1);
                                break
                            }
                        e.push({
                            type: "hardbreak",
                            level: e.level
                        })
                    } else
                        e.pending = e.pending.slice(0, -1),
                        e.push({
                            type: "softbreak",
                            level: e.level
                        });
            else
                e.push({
                    type: "softbreak",
                    level: e.level
                });
            for (s++; s < n && 32 === e.src.charCodeAt(s);)
                s++;
            return e.pos = s, !0
        }
    }, function(e, t, r) {
        "use strict";
        for (var n = [], s = 0; s < 256; s++)
            n.push(0);
        "\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach((function(e) {
                n[e.charCodeAt(0)] = 1
            })),
            e.exports = function(e, t) {
                var r, s = e.pos,
                    o = e.posMax;
                if (92 !== e.src.charCodeAt(s))
                    return !1;
                if (++s < o) {
                    if ((r = e.src.charCodeAt(s)) < 256 && 0 !== n[r])
                        return t || (e.pending += e.src[s]),
                            e.pos += 2, !0;
                    if (10 === r) {
                        for (t || e.push({
                                type: "hardbreak",
                                level: e.level
                            }),
                            s++; s < o && 32 === e.src.charCodeAt(s);)
                            s++;
                        return e.pos = s, !0
                    }
                }
                return t || (e.pending += "\\"),
                    e.pos++, !0
            }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            var r, n, s, o, i, a = e.pos;
            if (96 !== e.src.charCodeAt(a))
                return !1;
            for (r = a,
                a++,
                n = e.posMax; a < n && 96 === e.src.charCodeAt(a);)
                a++;
            for (s = e.src.slice(r, a),
                o = i = a; - 1 !== (o = e.src.indexOf("`", i));) {
                for (i = o + 1; i < n && 96 === e.src.charCodeAt(i);)
                    i++;
                if (i - o === s.length)
                    return t || e.push({
                            type: "code",
                            content: e.src.slice(a, o).replace(/[ \n]+/g, " ").trim(),
                            block: !1,
                            level: e.level
                        }),
                        e.pos = i, !0
            }
            return t || (e.pending += s),
                e.pos += s.length, !0
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            var r, n, s, o, i, a = e.posMax,
                l = e.pos;
            if (126 !== e.src.charCodeAt(l))
                return !1;
            if (t)
                return !1;
            if (l + 4 >= a)
                return !1;
            if (126 !== e.src.charCodeAt(l + 1))
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            if (o = l > 0 ? e.src.charCodeAt(l - 1) : -1,
                i = e.src.charCodeAt(l + 2),
                126 === o)
                return !1;
            if (126 === i)
                return !1;
            if (32 === i || 10 === i)
                return !1;
            for (n = l + 2; n < a && 126 === e.src.charCodeAt(n);)
                n++;
            if (n > l + 3)
                return e.pos += n - l,
                    t || (e.pending += e.src.slice(l, n)), !0;
            for (e.pos = l + 2,
                s = 1; e.pos + 1 < a;) {
                if (126 === e.src.charCodeAt(e.pos) && 126 === e.src.charCodeAt(e.pos + 1) && (o = e.src.charCodeAt(e.pos - 1),
                        126 !== (i = e.pos + 2 < a ? e.src.charCodeAt(e.pos + 2) : -1) && 126 !== o && (32 !== o && 10 !== o ? s-- : 32 !== i && 10 !== i && s++,
                            s <= 0))) {
                    r = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return r ? (e.posMax = e.pos,
                e.pos = l + 2,
                t || (e.push({
                        type: "del_open",
                        level: e.level++
                    }),
                    e.parser.tokenize(e),
                    e.push({
                        type: "del_close",
                        level: --e.level
                    })),
                e.pos = e.posMax + 2,
                e.posMax = a, !0) : (e.pos = l, !1)
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            var r, n, s, o, i, a = e.posMax,
                l = e.pos;
            if (43 !== e.src.charCodeAt(l))
                return !1;
            if (t)
                return !1;
            if (l + 4 >= a)
                return !1;
            if (43 !== e.src.charCodeAt(l + 1))
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            if (o = l > 0 ? e.src.charCodeAt(l - 1) : -1,
                i = e.src.charCodeAt(l + 2),
                43 === o)
                return !1;
            if (43 === i)
                return !1;
            if (32 === i || 10 === i)
                return !1;
            for (n = l + 2; n < a && 43 === e.src.charCodeAt(n);)
                n++;
            if (n !== l + 2)
                return e.pos += n - l,
                    t || (e.pending += e.src.slice(l, n)), !0;
            for (e.pos = l + 2,
                s = 1; e.pos + 1 < a;) {
                if (43 === e.src.charCodeAt(e.pos) && 43 === e.src.charCodeAt(e.pos + 1) && (o = e.src.charCodeAt(e.pos - 1),
                        43 !== (i = e.pos + 2 < a ? e.src.charCodeAt(e.pos + 2) : -1) && 43 !== o && (32 !== o && 10 !== o ? s-- : 32 !== i && 10 !== i && s++,
                            s <= 0))) {
                    r = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return r ? (e.posMax = e.pos,
                e.pos = l + 2,
                t || (e.push({
                        type: "ins_open",
                        level: e.level++
                    }),
                    e.parser.tokenize(e),
                    e.push({
                        type: "ins_close",
                        level: --e.level
                    })),
                e.pos = e.posMax + 2,
                e.posMax = a, !0) : (e.pos = l, !1)
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            var r, n, s, o, i, a = e.posMax,
                l = e.pos;
            if (61 !== e.src.charCodeAt(l))
                return !1;
            if (t)
                return !1;
            if (l + 4 >= a)
                return !1;
            if (61 !== e.src.charCodeAt(l + 1))
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            if (o = l > 0 ? e.src.charCodeAt(l - 1) : -1,
                i = e.src.charCodeAt(l + 2),
                61 === o)
                return !1;
            if (61 === i)
                return !1;
            if (32 === i || 10 === i)
                return !1;
            for (n = l + 2; n < a && 61 === e.src.charCodeAt(n);)
                n++;
            if (n !== l + 2)
                return e.pos += n - l,
                    t || (e.pending += e.src.slice(l, n)), !0;
            for (e.pos = l + 2,
                s = 1; e.pos + 1 < a;) {
                if (61 === e.src.charCodeAt(e.pos) && 61 === e.src.charCodeAt(e.pos + 1) && (o = e.src.charCodeAt(e.pos - 1),
                        61 !== (i = e.pos + 2 < a ? e.src.charCodeAt(e.pos + 2) : -1) && 61 !== o && (32 !== o && 10 !== o ? s-- : 32 !== i && 10 !== i && s++,
                            s <= 0))) {
                    r = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return r ? (e.posMax = e.pos,
                e.pos = l + 2,
                t || (e.push({
                        type: "mark_open",
                        level: e.level++
                    }),
                    e.parser.tokenize(e),
                    e.push({
                        type: "mark_close",
                        level: --e.level
                    })),
                e.pos = e.posMax + 2,
                e.posMax = a, !0) : (e.pos = l, !1)
        }
    }, function(e, t, r) {
        "use strict";

        function n(e) {
            return e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122
        }

        function s(e, t) {
            var r, s, o, i = t,
                a = !0,
                l = !0,
                c = e.posMax,
                u = e.src.charCodeAt(t);
            for (r = t > 0 ? e.src.charCodeAt(t - 1) : -1; i < c && e.src.charCodeAt(i) === u;)
                i++;
            return i >= c && (a = !1),
                (o = i - t) >= 4 ? a = l = !1 : (32 !== (s = i < c ? e.src.charCodeAt(i) : -1) && 10 !== s || (a = !1),
                    32 !== r && 10 !== r || (l = !1),
                    95 === u && (n(r) && (a = !1),
                        n(s) && (l = !1))), {
                    can_open: a,
                    can_close: l,
                    delims: o
                }
        }
        e.exports = function(e, t) {
            var r, n, o, i, a, l, c, u = e.posMax,
                p = e.pos,
                h = e.src.charCodeAt(p);
            if (95 !== h && 42 !== h)
                return !1;
            if (t)
                return !1;
            if (r = (c = s(e, p)).delims, !c.can_open)
                return e.pos += r,
                    t || (e.pending += e.src.slice(p, e.pos)), !0;
            if (e.level >= e.options.maxNesting)
                return !1;
            for (e.pos = p + r,
                l = [r]; e.pos < u;)
                if (e.src.charCodeAt(e.pos) !== h)
                    e.parser.skipToken(e);
                else {
                    if (n = (c = s(e, e.pos)).delims,
                        c.can_close) {
                        for (i = l.pop(),
                            a = n; i !== a;) {
                            if (a < i) {
                                l.push(i - a);
                                break
                            }
                            if (a -= i,
                                0 === l.length)
                                break;
                            e.pos += i,
                                i = l.pop()
                        }
                        if (0 === l.length) {
                            r = i,
                                o = !0;
                            break
                        }
                        e.pos += n;
                        continue
                    }
                    c.can_open && l.push(n),
                        e.pos += n
                }
            return o ? (e.posMax = e.pos,
                e.pos = p + r,
                t || (2 !== r && 3 !== r || e.push({
                        type: "strong_open",
                        level: e.level++
                    }),
                    1 !== r && 3 !== r || e.push({
                        type: "em_open",
                        level: e.level++
                    }),
                    e.parser.tokenize(e),
                    1 !== r && 3 !== r || e.push({
                        type: "em_close",
                        level: --e.level
                    }),
                    2 !== r && 3 !== r || e.push({
                        type: "strong_close",
                        level: --e.level
                    })),
                e.pos = e.posMax + r,
                e.posMax = u, !0) : (e.pos = p, !1)
        }
    }, function(e, t, r) {
        "use strict";
        var n = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
        e.exports = function(e, t) {
            var r, s, o = e.posMax,
                i = e.pos;
            if (126 !== e.src.charCodeAt(i))
                return !1;
            if (t)
                return !1;
            if (i + 2 >= o)
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            for (e.pos = i + 1; e.pos < o;) {
                if (126 === e.src.charCodeAt(e.pos)) {
                    r = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return r && i + 1 !== e.pos ? (s = e.src.slice(i + 1, e.pos)).match(/(^|[^\\])(\\\\)*\s/) ? (e.pos = i, !1) : (e.posMax = e.pos,
                e.pos = i + 1,
                t || e.push({
                    type: "sub",
                    level: e.level,
                    content: s.replace(n, "$1")
                }),
                e.pos = e.posMax + 1,
                e.posMax = o, !0) : (e.pos = i, !1)
        }
    }, function(e, t, r) {
        "use strict";
        var n = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
        e.exports = function(e, t) {
            var r, s, o = e.posMax,
                i = e.pos;
            if (94 !== e.src.charCodeAt(i))
                return !1;
            if (t)
                return !1;
            if (i + 2 >= o)
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            for (e.pos = i + 1; e.pos < o;) {
                if (94 === e.src.charCodeAt(e.pos)) {
                    r = !0;
                    break
                }
                e.parser.skipToken(e)
            }
            return r && i + 1 !== e.pos ? (s = e.src.slice(i + 1, e.pos)).match(/(^|[^\\])(\\\\)*\s/) ? (e.pos = i, !1) : (e.posMax = e.pos,
                e.pos = i + 1,
                t || e.push({
                    type: "sup",
                    level: e.level,
                    content: s.replace(n, "$1")
                }),
                e.pos = e.posMax + 1,
                e.posMax = o, !0) : (e.pos = i, !1)
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(6),
            s = r(10),
            o = r(12),
            i = r(13);
        e.exports = function(e, t) {
            var r, a, l, c, u, p, h, f, g = !1,
                d = e.pos,
                m = e.posMax,
                b = e.pos,
                v = e.src.charCodeAt(b);
            if (33 === v && (g = !0,
                    v = e.src.charCodeAt(++b)),
                91 !== v)
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            if (r = b + 1,
                (a = n(e, b)) < 0)
                return !1;
            if ((p = a + 1) < m && 40 === e.src.charCodeAt(p)) {
                for (p++; p < m && (32 === (f = e.src.charCodeAt(p)) || 10 === f); p++)
                ;
                if (p >= m)
                    return !1;
                for (b = p,
                    s(e, p) ? (c = e.linkContent,
                        p = e.pos) : c = "",
                    b = p; p < m && (32 === (f = e.src.charCodeAt(p)) || 10 === f); p++)
                ;
                if (p < m && b !== p && o(e, p))
                    for (u = e.linkContent,
                        p = e.pos; p < m && (32 === (f = e.src.charCodeAt(p)) || 10 === f); p++)
                ;
                else
                    u = "";
                if (p >= m || 41 !== e.src.charCodeAt(p))
                    return e.pos = d, !1;
                p++
            } else {
                if (e.linkLevel > 0)
                    return !1;
                for (; p < m && (32 === (f = e.src.charCodeAt(p)) || 10 === f); p++)
                ;
                if (p < m && 91 === e.src.charCodeAt(p) && (b = p + 1,
                        (p = n(e, p)) >= 0 ? l = e.src.slice(b, p++) : p = b - 1),
                    l || (void 0 === l && (p = a + 1),
                        l = e.src.slice(r, a)), !(h = e.env.references[i(l)]))
                    return e.pos = d, !1;
                c = h.href,
                    u = h.title
            }
            return t || (e.pos = r,
                    e.posMax = a,
                    g ? e.push({
                        type: "image",
                        src: c,
                        title: u,
                        alt: e.src.substr(r, a - r),
                        level: e.level
                    }) : (e.push({
                            type: "link_open",
                            href: c,
                            title: u,
                            level: e.level++
                        }),
                        e.linkLevel++,
                        e.parser.tokenize(e),
                        e.linkLevel--,
                        e.push({
                            type: "link_close",
                            level: --e.level
                        }))),
                e.pos = p,
                e.posMax = m, !0
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(6);
        e.exports = function(e, t) {
            var r, s, o, i, a = e.posMax,
                l = e.pos;
            return !(l + 2 >= a) && (94 === e.src.charCodeAt(l) && (91 === e.src.charCodeAt(l + 1) && (!(e.level >= e.options.maxNesting) && (r = l + 2, !((s = n(e, l + 1)) < 0) && (t || (e.env.footnotes || (e.env.footnotes = {}),
                    e.env.footnotes.list || (e.env.footnotes.list = []),
                    o = e.env.footnotes.list.length,
                    e.pos = r,
                    e.posMax = s,
                    e.push({
                        type: "footnote_ref",
                        id: o,
                        level: e.level
                    }),
                    e.linkLevel++,
                    i = e.tokens.length,
                    e.parser.tokenize(e),
                    e.env.footnotes.list[o] = {
                        tokens: e.tokens.splice(i)
                    },
                    e.linkLevel--),
                e.pos = s + 1,
                e.posMax = a, !0)))))
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = function(e, t) {
            var r, n, s, o, i = e.posMax,
                a = e.pos;
            if (a + 3 > i)
                return !1;
            if (!e.env.footnotes || !e.env.footnotes.refs)
                return !1;
            if (91 !== e.src.charCodeAt(a))
                return !1;
            if (94 !== e.src.charCodeAt(a + 1))
                return !1;
            if (e.level >= e.options.maxNesting)
                return !1;
            for (n = a + 2; n < i; n++) {
                if (32 === e.src.charCodeAt(n))
                    return !1;
                if (10 === e.src.charCodeAt(n))
                    return !1;
                if (93 === e.src.charCodeAt(n))
                    break
            }
            return n !== a + 2 && (!(n >= i) && (n++,
                r = e.src.slice(a + 2, n - 1),
                void 0 !== e.env.footnotes.refs[":" + r] && (t || (e.env.footnotes.list || (e.env.footnotes.list = []),
                        e.env.footnotes.refs[":" + r] < 0 ? (s = e.env.footnotes.list.length,
                            e.env.footnotes.list[s] = {
                                label: r,
                                count: 0
                            },
                            e.env.footnotes.refs[":" + r] = s) : s = e.env.footnotes.refs[":" + r],
                        o = e.env.footnotes.list[s].count,
                        e.env.footnotes.list[s].count++,
                        e.push({
                            type: "footnote_ref",
                            id: s,
                            subId: o,
                            level: e.level
                        })),
                    e.pos = n,
                    e.posMax = i, !0)))
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(60),
            s = r(11),
            o = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,
            i = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;
        e.exports = function(e, t) {
            var r, a, l, c, u, p = e.pos;
            return 60 === e.src.charCodeAt(p) && (!((r = e.src.slice(p)).indexOf(">") < 0) && ((a = r.match(i)) ? !(n.indexOf(a[1].toLowerCase()) < 0) && (c = a[0].slice(1, -1),
                u = s(c), !!e.parser.validateLink(c) && (t || (e.push({
                            type: "link_open",
                            href: u,
                            level: e.level
                        }),
                        e.push({
                            type: "text",
                            content: c,
                            level: e.level + 1
                        }),
                        e.push({
                            type: "link_close",
                            level: e.level
                        })),
                    e.pos += a[0].length, !0)) : !!(l = r.match(o)) && (c = l[0].slice(1, -1),
                u = s("mailto:" + c), !!e.parser.validateLink(u) && (t || (e.push({
                            type: "link_open",
                            href: u,
                            level: e.level
                        }),
                        e.push({
                            type: "text",
                            content: c,
                            level: e.level + 1
                        }),
                        e.push({
                            type: "link_close",
                            level: e.level
                        })),
                    e.pos += l[0].length, !0))))
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = ["coap", "doi", "javascript", "aaa", "aaas", "about", "acap", "cap", "cid", "crid", "data", "dav", "dict", "dns", "file", "ftp", "geo", "go", "gopher", "h323", "http", "https", "iax", "icap", "im", "imap", "info", "ipp", "iris", "iris.beep", "iris.xpc", "iris.xpcs", "iris.lwz", "ldap", "mailto", "mid", "msrp", "msrps", "mtqp", "mupdate", "news", "nfs", "ni", "nih", "nntp", "opaquelocktoken", "pop", "pres", "rtsp", "service", "session", "shttp", "sieve", "sip", "sips", "sms", "snmp", "soap.beep", "soap.beeps", "tag", "tel", "telnet", "tftp", "thismessage", "tn3270", "tip", "tv", "urn", "vemmi", "ws", "wss", "xcon", "xcon-userid", "xmlrpc.beep", "xmlrpc.beeps", "xmpp", "z39.50r", "z39.50s", "adiumxtra", "afp", "afs", "aim", "apt", "attachment", "aw", "beshare", "bitcoin", "bolo", "callto", "chrome", "chrome-extension", "com-eventbrite-attendee", "content", "cvs", "dlna-playsingle", "dlna-playcontainer", "dtn", "dvb", "ed2k", "facetime", "feed", "finger", "fish", "gg", "git", "gizmoproject", "gtalk", "hcp", "icon", "ipn", "irc", "irc6", "ircs", "itms", "jar", "jms", "keyparc", "lastfm", "ldaps", "magnet", "maps", "market", "message", "mms", "ms-help", "msnim", "mumble", "mvn", "notes", "oid", "palm", "paparazzi", "platform", "proxy", "psyc", "query", "res", "resource", "rmi", "rsync", "rtmp", "secondlife", "sftp", "sgn", "skype", "smb", "soldat", "spotify", "ssh", "steam", "svn", "teamspeak", "things", "udp", "unreal", "ut2004", "ventrilo", "view-source", "webcal", "wtai", "wyciwyg", "xfire", "xri", "ymsgr"]
    }, function(e, t, r) {
        "use strict";
        var n = r(62).HTML_TAG_RE;
        e.exports = function(e, t) {
            var r, s, o, i = e.pos;
            return !!e.options.html && (o = e.posMax, !(60 !== e.src.charCodeAt(i) || i + 2 >= o) && (!(33 !== (r = e.src.charCodeAt(i + 1)) && 63 !== r && 47 !== r && ! function(e) {
                var t = 32 | e;
                return t >= 97 && t <= 122
            }(r)) && (!!(s = e.src.slice(i).match(n)) && (t || e.push({
                    type: "htmltag",
                    content: e.src.slice(i, i + s[0].length),
                    level: e.level
                }),
                e.pos += s[0].length, !0))))
        }
    }, function(e, t, r) {
        "use strict";

        function n(e, t) {
            return e = e.source,
                t = t || "",
                function r(n, s) {
                    return n ? (s = s.source || s,
                        e = e.replace(n, s),
                        r) : new RegExp(e, t)
                }
        }
        var s = n(/(?:unquoted|single_quoted|double_quoted)/)("unquoted", /[^"'=<>`\x00-\x20]+/)("single_quoted", /'[^']*'/)("double_quoted", /"[^"]*"/)(),
            o = n(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name", /[a-zA-Z_:][a-zA-Z0-9:._-]*/)("attr_value", s)(),
            i = n(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute", o)(),
            a = n(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag", i)("close_tag", /<\/[A-Za-z][A-Za-z0-9]*\s*>/)("comment", /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/)("processing", /<[?].*?[?]>/)("declaration", /<![A-Z]+\s+[^>]*>/)("cdata", /<!\[CDATA\[[\s\S]*?\]\]>/)();
        e.exports.HTML_TAG_RE = a
    }, function(e, t, r) {
        "use strict";
        var n = r(9),
            s = r(2).has,
            o = r(2).isValidEntityCode,
            i = r(2).fromCodePoint,
            a = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,
            l = /^&([a-z][a-z0-9]{1,31});/i;
        e.exports = function(e, t) {
            var r, c, u = e.pos,
                p = e.posMax;
            if (38 !== e.src.charCodeAt(u))
                return !1;
            if (u + 1 < p)
                if (35 === e.src.charCodeAt(u + 1)) {
                    if (c = e.src.slice(u).match(a))
                        return t || (r = "x" === c[1][0].toLowerCase() ? parseInt(c[1].slice(1), 16) : parseInt(c[1], 10),
                                e.pending += o(r) ? i(r) : i(65533)),
                            e.pos += c[0].length, !0
                } else if ((c = e.src.slice(u).match(l)) && s(n, c[1]))
                return t || (e.pending += n[c[1]]),
                    e.pos += c[0].length, !0;
            return t || (e.pending += "&"),
                e.pos++, !0
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = {
            options: {
                html: !1,
                xhtmlOut: !1,
                breaks: !1,
                langPrefix: "language-",
                linkify: !1,
                linkTarget: "",
                typographer: !1,
                quotes: "“”‘’",
                highlight: null,
                maxNesting: 20
            },
            components: {
                core: {
                    rules: ["block", "inline", "references", "replacements", "linkify", "smartquotes", "references", "abbr2", "footnote_tail"]
                },
                block: {
                    rules: ["blockquote", "code", "fences", "footnote", "heading", "hr", "htmlblock", "lheading", "list", "paragraph", "table"]
                },
                inline: {
                    rules: ["autolink", "backticks", "del", "emphasis", "entity", "escape", "footnote_ref", "htmltag", "links", "newline", "text"]
                }
            }
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = {
            options: {
                html: !1,
                xhtmlOut: !1,
                breaks: !1,
                langPrefix: "language-",
                linkify: !1,
                linkTarget: "",
                typographer: !1,
                quotes: "“”‘’",
                highlight: null,
                maxNesting: 20
            },
            components: {
                core: {},
                block: {},
                inline: {}
            }
        }
    }, function(e, t, r) {
        "use strict";
        e.exports = {
            options: {
                html: !0,
                xhtmlOut: !0,
                breaks: !1,
                langPrefix: "language-",
                linkify: !1,
                linkTarget: "",
                typographer: !1,
                quotes: "“”‘’",
                highlight: null,
                maxNesting: 20
            },
            components: {
                core: {
                    rules: ["block", "inline", "references", "abbr2"]
                },
                block: {
                    rules: ["blockquote", "code", "fences", "heading", "hr", "htmlblock", "lheading", "list", "paragraph"]
                },
                inline: {
                    rules: ["autolink", "backticks", "emphasis", "entity", "escape", "htmltag", "links", "newline", "text"]
                }
            }
        }
    }, function(e, t) {
        var r, n;
        r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            n = {
                rotl: function(e, t) {
                    return e << t | e >>> 32 - t
                },
                rotr: function(e, t) {
                    return e << 32 - t | e >>> t
                },
                endian: function(e) {
                    if (e.constructor == Number)
                        return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
                    for (var t = 0; t < e.length; t++)
                        e[t] = n.endian(e[t]);
                    return e
                },
                randomBytes: function(e) {
                    for (var t = []; e > 0; e--)
                        t.push(Math.floor(256 * Math.random()));
                    return t
                },
                bytesToWords: function(e) {
                    for (var t = [], r = 0, n = 0; r < e.length; r++,
                        n += 8)
                        t[n >>> 5] |= e[r] << 24 - n % 32;
                    return t
                },
                wordsToBytes: function(e) {
                    for (var t = [], r = 0; r < 32 * e.length; r += 8)
                        t.push(e[r >>> 5] >>> 24 - r % 32 & 255);
                    return t
                },
                bytesToHex: function(e) {
                    for (var t = [], r = 0; r < e.length; r++)
                        t.push((e[r] >>> 4).toString(16)),
                        t.push((15 & e[r]).toString(16));
                    return t.join("")
                },
                hexToBytes: function(e) {
                    for (var t = [], r = 0; r < e.length; r += 2)
                        t.push(parseInt(e.substr(r, 2), 16));
                    return t
                },
                bytesToBase64: function(e) {
                    for (var t = [], n = 0; n < e.length; n += 3)
                        for (var s = e[n] << 16 | e[n + 1] << 8 | e[n + 2], o = 0; o < 4; o++)
                            8 * n + 6 * o <= 8 * e.length ? t.push(r.charAt(s >>> 6 * (3 - o) & 63)) : t.push("=");
                    return t.join("")
                },
                base64ToBytes: function(e) {
                    e = e.replace(/[^A-Z0-9+\/]/gi, "");
                    for (var t = [], n = 0, s = 0; n < e.length; s = ++n % 4)
                        0 != s && t.push((r.indexOf(e.charAt(n - 1)) & Math.pow(2, -2 * s + 8) - 1) << 2 * s | r.indexOf(e.charAt(n)) >>> 6 - 2 * s);
                    return t
                }
            },
            e.exports = n
    }, function(e, t) {
        function r(e) {
            return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
        }
        /*!
         * Determine if an object is a Buffer
         *
         * @author   Feross Aboukhadijeh <https://feross.org>
         * @license  MIT
         */
        e.exports = function(e) {
            return null != e && (r(e) || function(e) {
                return "function" == typeof e.readFloatLE && "function" == typeof e.slice && r(e.slice(0, 0))
            }(e) || !!e._isBuffer)
        }
    }]
]);
//# sourceMappingURL=vendor~plugin-2.6.1.js.map