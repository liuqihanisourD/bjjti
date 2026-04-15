// ========== 1. 数据定义 ==========
const questions = [
    { dim: 'P', text: '遇到防守死硬的对手，你更倾向于？', a: '硬挤硬碾，靠核心和力量撕开防线', b: '耐心寻找角度，用杠杆原理四两拨千斤' },
    { dim: 'P', text: '学习一个新降服动作时，你更看重？', a: '能不能在我现有的身体素质下直接做出来', b: '每一个手指的抓把细节和发力轨迹是否完美' },
    { dim: 'P', text: '你的得意技被对手逃脱了，第一反应？', a: '下次我得收紧点，发力再猛一点', b: '是我的重心偏了，或者缺少了一个阻截动作' },
    { dim: 'P', text: '你更喜欢看哪种风格的比赛？', a: '摔柔结合、TDD极强、砸摔过腿', b: '半防/全防里像泥鳅一样钻来钻去的降服魔术' },
    { dim: 'P', text: '关于柔术以外的体能训练？', a: '经常举铁练力量，绝对力量压制一切', b: '最多做做瑜伽拉伸，垫子上的时间足够了' },
    { dim: 'P', text: '过侧压时，你的策略是？', a: '沉肩压胸，把全部体重砸上去', b: '调整膝盖和手肘的贴地角度，形成稳固架构' },
    { dim: 'G', text: '脱下道服换上紧身衣实战，感觉是？', a: '很不适应，少了一百个把位没安全感', b: '如鱼得水，终于不用被拽衣服了' },
    { dim: 'G', text: '关于缠斗的节奏，你更喜欢？', a: '慢节奏推拉博弈，像下棋布置动作', b: '快节奏的 scramble 和脱把反击' },
    { dim: 'G', text: '以下哪种降服让你更兴奋？', a: '木村锁、棒球绞等结合把位控制', b: '达斯绞、裸绞、脚踝锁等流畅降服' },
    { dim: 'G', text: '面对大30斤的紫带，哪种环境好应对？', a: '穿道服，用他衣服做杠杆控制他', b: '穿无道服，我滑溜且速度快' },
    { dim: 'G', text: '你的衣柜里主要是？', a: '各种厚度颜色的道服和坚硬裤子', b: '各种花色的 Rashguard 和短裤' },
    { dim: 'G', text: '你觉得哪种技术体系更有深度？', a: '道服，光一个拉拽动作就有无数变化', b: '无道服，无外力借力，纯靠人体力学' },
    { dim: 'F', text: '教练喊“实战开始”时，你的心态是？', a: '肾上腺素飙升，今天必须降服对面', b: '深呼吸放松，刚好出汗练练今天学的' },
    { dim: 'F', text: '道馆组织内部友谊赛，你的态度？', a: '即使受伤也要上，检验水平的最好机会', b: '看心情，累了就算了，友谊赛也是实战' },
    { dim: 'F', text: '实战中遇到黑带，你会？', a: '死磕到底，被降服十次也要找机会反击', b: '顺势躺平当陪练，观察黑带怎么发力' },
    { dim: 'F', text: '缺席了一周训练，你会？', a: '非常焦虑，觉得体能和反应都退步了', b: '有点遗憾，但生活嘛，回来慢慢恢复' },
    { dim: 'F', text: '你升带的意义对你是什么？', a: '实力认证，证明我能降服这个级别的人', b: '坚持下来的纪念，代表又熬过一段岁月' },
    { dim: 'F', text: '下班后很累，但今晚有柔术课，你会？', a: '喝杯咖啡洗把脸，去垫上干就完了', b: '发消息请个假，回家躺着看别人打比赛' }
];

const results = {
    PGF: { title: '霸道跤王', emoji: '🐂', desc: '你是垫子上的推土机。穿上道服后强大的核心和抓握力让你轻松支配对手，实战只为赢。' },
    PGL: { title: '重装卫士', emoji: '🛡️', desc: '你不追求精彩降服，享受用体重和道服把对手死死钉在垫子上，是轻量级的噩梦。' },
    PNF: { title: '绞杀机器', emoji: '⚡', desc: '脱下道服你就是一头野兽。极高爆发力加上无道服流畅性，经常闪电降服。' },
    PNL: { title: '健美柔术家', emoji: '🏋️‍♂️', desc: '举铁时间比练柔术多。喜欢无道服因为不用洗厚道服，把柔术当高级HIIT。' },
    TGF: { title: '柔术魔术师', emoji: '🧙‍♂️', desc: '道服技术细腻得令人发指，袖口领子是手指延伸，总能用无形的方式完成降服。' },
    TGL: { title: '道服学者', emoji: '📚', desc: '对道服理解超越实战。可以拉扯5分钟只为调整一个抓把角度，道馆活字典。' },
    TNF: { title: '锁链猎手', emoji: '🐍', desc: 'Gordon Ryan信徒。凭借完美技术矩阵和刁钻腿锁大杀四方，用纯粹技术说话。' },
    TNL: { title: '流动舞者', emoji: '🌊', desc: '追求身体在空间自由流动的Scramble。一个漂亮躲闪或转换就能让你开心一整天。' }
};

// ========== 2. 状态管理 ==========
let currentIndex = 0;
let answers = [];
let isAnimating = false;

// ========== 3. 视图控制函数 ==========
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // 微延迟让 display:block 生效后再触发 opacity 过渡
    setTimeout(() => {
        document.getElementById(pageId).classList.add('active');
    }, 50);
}

function renderQuestion() {
    const q = questions[currentIndex];
    document.getElementById('q-text').innerText = q.text;
    document.getElementById('opt-a').innerText = q.a;
    document.getElementById('opt-b').innerText = q.b;
    document.getElementById('q-num').innerText = `${currentIndex + 1} / ${questions.length}`;
    document.getElementById('progress-bar').style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
}

// ========== 4. 核心业务逻辑 ==========
function startTest() {
    answers = new Array(questions.length).fill(-1);
    currentIndex = 0;
    renderQuestion();
    showPage('page-test');
}

function selectOption(score) {
    if (isAnimating) return;
    isAnimating = true;
    answers[currentIndex] = score;

    const card = document.getElementById('question-card');
    card.classList.add('slide-out');

    setTimeout(() => {
        currentIndex++;
        if (currentIndex >= questions.length) {
            showResult();
        } else {
            renderQuestion();
            card.classList.remove('slide-out');
            card.classList.add('slide-in');
            
            // 强制回流后移除 class，保证下次动画能触发
            setTimeout(() => {
                card.classList.remove('slide-in');
                isAnimating = false;
            }, 50);
        }
    }, 300);
}

function calculateCode() {
    const scores = { P: 0, G: 0, F: 0 };
    answers.forEach((ans, i) => { scores[questions[i].dim] += ans; });
    
    let code = '';
    code += scores.P <= 3 ? 'P' : 'T';
    code += scores.G <= 3 ? 'G' : 'N';
    code += scores.F <= 3 ? 'F' : 'L';
    return code;
}

function showResult() {
    const code = calculateCode();
    const info = results[code];

    document.getElementById('r-emoji').innerText = info.emoji;
    document.getElementById('r-title').innerText = info.title;
    document.getElementById('r-code').innerText = `[ ${code} ]`;
    document.getElementById('r-desc').innerText = info.desc;

    // 【核心优化】将预留图片路径赋值给 src，触发真实加载
    const img = document.getElementById('r-poster');
    img.src = `assets/results/${code}.png`; 

    showPage('page-result');
}

function savePoster() {
    // H5 中只需提示用户长按图片即可，无需额外代码
    alert('请长按上方图片，选择“保存到相册”或“发送给朋友”');
}
