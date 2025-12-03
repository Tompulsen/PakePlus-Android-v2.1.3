window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
// 拦截网页的下载请求
document.addEventListener('click', function(e) {
    const target = e.target;
    // 匹配下载按钮（根据网页实际下载按钮的选择器调整）
    if (target.matches('button[aria-label="Download"]') || target.closest('a[download]')) {
        e.preventDefault();
        // 获取下载链接
        const downloadUrl = target.href || target.closest('a').href;
        if (downloadUrl) {
            // 调用PakePlus的原生下载API（或系统下载）
            plus.downloader.createDownload(downloadUrl, {
                filename: '_downloads/' // 保存到App的下载目录
            }, function(d, status) {
                if (status === 200) {
                    alert('文件下载完成：' + d.filename);
                } else {
                    alert('下载失败：' + status);
                }
            }).start();
        }
    }
}, true);

// 拦截window.open的下载请求
window.open = function(url) {
    if (url.includes('.pdf') || url.includes('.zip')) { // 匹配下载文件后缀
        plus.downloader.createDownload(url, {
            filename: '_downloads/'
        }, function(d, status) {
            status === 200 ? alert('下载完成') : alert('下载失败');
        }).start();
        return null;
    }
    return window.open(url);
};
