<?php
//  《i飞扬》在线版 前端函数库

function p404() {header('Location: http://fyscu.com/404'); exit();}

function PathNode($Str0) {return preg_replace('/\/|\.{2}/', '', $Str0);}

function Self_AJAX() {
    if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') return false;
    $HDN = array(); preg_match('/^https:\/\/([^\/]+)\//i', $_SERVER['HTTP_REFERER'], $HDN);
    if ($_SERVER['HTTP_HOST'] != $HDN[1]) return false;
    return true;
}

function WB_XML_create($Pages, $Index) {
    $PageSum = count($Pages);
    $iWB = simplexml_load_file('./Libs/iWB.xml');
    for ($i = count($iWB->ipage); $i < $PageSum; $i++) {
        $iWB->addChild('ipage', '');
        $cPage = $iWB->ipage[$i];
        $cPage->addAttribute('id', $i+1);
        if (($i == 1)||($i == $PageSum-1)) $cPage->addAttribute('type', 'Cover');
        else $cPage->addAttribute('type', 'Content');
        foreach ($Index as $TI) {
            if ($TI[0] == $i+1) {
                $cPage->addChild('ititle', iconv('GBK', 'UTF-8', $TI[1]));
                $cPage->ititle->addAttribute('level', $TI[2]);
            }
        }
        $cPage->addChild('ibgp', '');
        $cPage->ibgp[0]->addAttribute('url', './'.basename($Pages[$i]));
    }
    $iWB->asXML("./$BN/$BI/index.xml");
}
function MusicList($XML_Obj) {
    $TS = "<ul id=\"MusicList\">\n";
    foreach ($XML_Obj->imusic as $Music) {
        $TS .= '<li src="'.$Music['url'].'" page="'.$Music['page'].'">'.$Music."</li>\n";
    }
    return $TS."</ul>\n";
}
function IndexContent($XML_Obj) {
    $TS = "\n"; $Level = 1; $i = 0;
    foreach ($XML_Obj->ipage as $Page) {
        $Title = $Page->ititle;
        if (!$Title) continue;
        $Text = iconv('UTF-8', 'GBK', $Title);
        $PNo = $Page['id'];
        if ($i != 0) {
            $n = $Title['level'] - $Level;
            if ($n == 0) $TS .= "</li>\n";
            elseif ($n > 0) $TS .= "<ul>\n";
            else $TS .= "</li>\n</ul></li>\n";
            $Level = $Title['level'];
        }
        $TS .= "<li><a class=\"inBookLink\" href=\"#\" page=\"{$PNo[0][0]}\">$Text</a>";
        $i++;
    }
    $TS .= '</li>';
    if ($Level > 1) $TS .= "\n</ul></li>\n";
    return $TS;
}
function WB_Links($XML_Link) {
    $WBL = '';
    foreach ($XML_Link as $Link) {
        if (!isset($Link['outlook'])) continue;
        else $WBL .= '<a style="'.$Link['outlook'].'" ';
        if (isset($Link['toPage'])) {
            $WBL .= 'class="inBookLink" page="'.$Link['toPage'].'" href="#"';
        } else if (isset($Link['url'])) {
            $WBL .= 'class="outBookLink" href="'.$Link['url'].'" target="_blank"';
        }
        $WBL .= "></a>\n";
    }
    return $WBL;
}
function PageContent($BSR, $XML_Page, $_PN, $PS) {
    $PageLinks = isset($XML_Page->ilink)?WB_Links($XML_Page->ilink):'';
    $PageContent = $PageLinks; $PageBG = basename($XML_Page->ibgp['url']);
    $PageHTML0 = "
        <div class=\\\"PageContent\\\" style=\\\"width: 100%; height: 100%; background: url(./\$BSR/\$PageBG) no-repeat;\\\">
            \$PageContent
        </div>";
    $PageBar0 = "
        <div class=\\\"FootBar\\\" style=\\\"position: absolute; bottom: 0px;\\\">
        <span style=\\\"float: right; margin: 5px;\\\">\$_PN</span>
        </div>";
#        <span style=\\\"float: left; margin: 5px;\\\"><b>赞一个</b>  |</span>
#        <span style=\\\"float: left; margin: 5px;\\\"><b>折个角</b></span> / \$PS
    $PC = '';
    eval("\$PageHTML = \"$PageHTML0\";");
    $PC .= $PageHTML."\n";
    if ($XML_Page['type'] == 'Content') {
        eval("\$PageBar = \"$PageBar0\";");
        $PC .= $PageBar;
    }
    return $PC;
}

function BookContent($XML_Obj, $LM) {
    $PageSum = count($XML_Obj->ipage);
    $TS='';
for ($i=0; $i<$PageSum; $i++) {
    $PN = $i + 1; $TS .= "\n<div id=\"Page$PN\">";
    if (($PN < 6) || ($LM == 1))  {
        $TS .= PageContent($XML_Obj->ipage[$i], $PN, $PageSum);
    } else $TS .= '<h3>Loading...</h3>';
    $TS .= '</div>';
}
    return $TS;
}
function WB_HTML_create($WB_Root, $LM_) {
    $WB_HTML0 = file_get_contents('./iWeBook.htm');
    $WB_Temple = array('/\{BookTitle\}/', '/\{IndexBody\}/', '/\{BookBody\}/', '/\{MusicList\}/');
    $iWB = simplexml_load_file($WB_Root.'index.xml');
    $BookTitle = iconv('UTF-8', 'GBK', $iWB->ibook->ititle.' - '.$iWB->ibook->iname).' '.$iWB->ibook->isid.' 期';
    $BookBody = BookContent($iWB, $LM_);
    $IndexBody = IndexContent($iWB);
    $BGML_Body = MusicList($iWB);
    $WB_Content = array($BookTitle, $IndexBody, $BookBody, $BGML_Body);

    $WB_HTML = preg_replace($WB_Temple, $WB_Content, $WB_HTML0);
    file_put_contents($WB_Root.'iWB.htm', $WB_HTML);
}
?>
