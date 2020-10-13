<?php

require_once('./BE_Libs/iWB_Libs.php');
require_once('./BE_Libs/phpQuery.php');

@$_DP = "./iBook_Data/{$_GET['name']}/{$_GET['index']}";
if (!is_dir($_DP)) p404();

phpQuery::newDocumentXML(file_get_contents("$_DP/index.xml"));
$_iWB = pq('iwebook');

function Page_Content($_PI) {
    $_PC = array();     $CSS_Class = '';

    if ($_PI->attr('type') == 'Index')  $CSS_Class .= ' BookIndex';
    $_PC[] = "<div class=\"PageContent$CSS_Class\" style=\"background: url({$GLOBALS['_DP']}/".$_PI->find('ibgp')->attr('url').') no-repeat;">';
    $_LIs = $_PI->find('ilink');
    if ($_LIs->length > 0)
        for ($i = 0; $i < $_LIs->length; $i++) {
            $_LI = $_LIs->eq($i);
            if ($_LI->attr('url') != '')
                $_href = $_LI->attr('url');
            else  $_href = '#Page_'.$_LI->attr('toPage');
            $_PC[] = "<a class=\"inBookLink\" href=\"$_href\" style=\"".$_LI->attr('outlook').'"></a>';
        }
    if ($_PI->attr('type') == 'Content')
        $_PC[] = '<div class="FootBar"><span>'.$_PI->attr('id').'</span></div>';
    $_PC[] = '</div>';

    return join("\n", $_PC);
}

if (isset($_GET['mod']) && ($_GET['mod'] == 'PageLoad')) {
    if (!Self_AJAX()) p404();
    $PNo = preg_replace('/[^\d]/', '', $_GET['pid']) + 0;
    $_PI = $_iWB->find('ipage')->eq($PNo);
    echo Page_Content($_PI);
    die();
}
?><!DOCTYPE HTML>
<html><head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="Window-Target" content="_top" />
    <meta name="Keywords" lang="zh-cn" content="电子杂志,HTML5,<?php  echo $_iWB->find('ibook ikeyword')->text();  ?>" />
    <title><?php  echo $_iWB->find('ibook ititle')->text();  ?></title>
    <script type="text/javascript" src="./Libs/EasyImport.js"></script>
    <script type="text/javascript">
ImportJS([
    {
        old_PC: 'jQuery.js',
        new_PC: 'jQuery2.js'
    },
    [{
        old_PC: 'Turn.HTML4.js',
        new_PC: 'Turn.js'
    },
    'Smooth_Scroll.js',
    'jPlayer.js',
    'jQuery.Hammer.js',
    {
        old_PC: false,
        new_PC: 'jQuery.PageZoomer.js',
        Mobile: false
    },
    {
        new_PC:    'Hover_Scroll.js',
        Mobile:    false
    }
    ],
    'FY_iWeBook.js'
], function () {
    $('#iWB').iWeBook('#jPlayer_Box');
});

var duoshuoQuery = {short_name: 'fyscu'};

ImportJS(['http://static.duoshuo.com/embed.js']);
    </script>
    <link rel="stylesheet" type="text/css" href="./Libs/FY_iWeBook.css" />
</head><body style="background-image: url(<?php  echo "$_DP/".$_iWB->find('ibook idesktop')->attr('url');  ?>);">
<div id="_Body">
    <div style="float: left; text-align: center;">
    <h3><a href="http://fyscu.com/">飞扬川大</a>·云阅读平台</h3>
    <h3>《<a href="http://mag.fyscu.com" target="_blank"><?php  echo $_iWB->find('ibook iname')->text();;  ?></a>》在线版</h3>
    <ul class="SideNav">
        <li><a href="http://mag.fyscu.com/">回主页</a></li>
        <li><a href="#Page_Down" rel="nofollow"><b>下一页</b></a></li>
        <li><a href="#Page_Up" rel="nofollow"><b>上一页</b></a></li>
        <li><a href="#CommentBox" rel="nofollow">评 论</a></li>
        <li><a href="#Debug" rel="nofollow">报 错</a></li>
    </ul><h3 class="Title">本书目录</h3>
    <div id="Book_Nav" class="TipBox"><ol style="margin-left: -30px;"><?php
$_CIs = $_iWB->find('ipage ititle');  /*var_dump($_CI);  die();*/
for ($i = 0; $i < $_CIs->length; $i++) {
    $_CI = $_CIs->eq($i);
    echo '<li><a class="inBookLink" href="#Page_'.$_CI->parent()->attr('id').'">'.$_CI->text().'</a>';
    $_Lc = $_CI->attr('level');    $_Ln = $_CIs->eq($i+1)->attr('level');
    if ((int) $_Lc < (int) $_Ln)  echo '<ul>';
    else if ((int) $_Lc > (int) $_Ln)  echo "</li>\n</ul></li>";
    else  echo '</li>';
}  ?>
    </ol></div>
    <div id="iBGM" class="SideNav">
    <h3 class="Title">背景音乐</h3>
        <div id="jPlayer_Box"></div><ul>
        <li><a href="#Music_Pause" rel="nofollow">暂 停</a></li>
        <li><a href="#Music_Play" rel="nofollow">继 续</a></li>
        </ul><ul id="MusicList" style="display: none;"><?php
$_MIs = $_iWB->find('ibook imusic');
for ($i = 0; $i < $_MIs->length; $i++) {
    $_MI = $_MIs->eq($i);
    echo "<li src=\"$_DP/".$_MI->attr('url').'" page="'.$_MI->attr('page').'">'.$_MI->text().'</li>';
}  ?>        </ul>
    </div></div>
    <div id="BookFrame" style="float: right; width: 950px;">
    <div id="ReadTips" class="noMobile">
    <center><h3 class="Title">键 盘 快 捷 键</h3></center>
    <div class="TipBox"><table><tbody>
        <tr><td>封 面</td><td width="100px">【Home】键</td><td>封 底</td><td>【End】键</td></tr>
        <tr><td>下一页</td><td>【Right】键</td><td>上一页</td><td>【Left】键</td></tr>
        <tr><td>回目录</td><td>【I】键</td><td>全屏视图</td><td>【F11】键</td></tr>
        <tr><td>背景音乐</td><td>暂停【Q】键</td><td>继续【P】键</td></tr>
    </tbody></table></div>
    <center><h3 class="Title">阅 读 须 知</h3></center>
    <div class="TipBox"><ul>
        <li>切换到<b>『全屏视图』阅读效果 最佳</b>（【F11】键）</li>
        <li>鼠标<b>翻页 直接 点击 / 拖拽 书页上下边角</b> 即可</li>
        <li>鼠标双击书页可<b>放大阅读</b>，再双击可缩小</li>
        <li>若在阅读过程中<b>出现&ldquo;书页显示错误&rdquo;，请尝试『刷新』</b>本网页（【F5】键）</li>
        <li>请尊重作者的<b>知识产权</b></li>
    </ul></div></div>
    <div id="CR_Info" class="noMobile">
        <p><b>(C)2013-2014&nbsp;&nbsp;四川大学&middot;飞扬俱乐部&middot;研发部</b></p><hr />
        <b>Powered by</b><ul>
            <li>HTML5 , CSS3 , EasyImport.js</li>
            <li>jQuery , Turn.js4 , jPlayer2</li>
            <li>Hammer.js , PageZoomer.js , Smooth_Scroll.js , Hover_Scroll.js</li>
            <li></li>
    </ul></div>
    <div id="iWB" style="width: 950px; height: 650px;">
<?php
$_PIs = $_iWB->find('ipage');
for ($i = 0; $i < $_PIs->length; $i++) {
    $PID = $i + 1;    $_HTML = array();

    $_HTML[] = "<div id=\"Page_$PID\">";
    if ($i < 6)  $_HTML[] = Page_Content($_PIs->eq($i));
    $_HTML[] = '</div>';

    echo join($_HTML)."\n";
}  ?>
    </div>
    <div id="CommentBox"><h3 class="Title">品头论足</h3>
<!-- Duoshuo Comment BEGIN -->
    <div style="background-color: #FFFFCC; padding: 10px;">
        <b>最近访客：</b><ul class="ds-recent-visitors" data-num-items="20" style="float:right;"></ul>
    <div class="ds-thread">
    </div></div>
<!-- Duoshuo Comment END -->
    </div></div>
    <div id="AA">
        <script type="text/javascript" src="http://tajs.qq.com/stats?sId=1836104" charset="UTF-8"></script>
    </div>
</div>
</body></html>
