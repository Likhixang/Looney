const url = $request.url;
const method = $request.method;
if (!$response.body) {
    
    console.log('$response.body blank');
    $done({});
}
let body = JSON.parse($response.body);

const getMethod = "GET";
const postMethod = "POST";
const noticeTitle = "Adsense";

if ((url.includes("api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk")
        || url.includes("is.snssdk.com/api/ad/union/sdk"))
    && method === postMethod) {
    console.log('CSJ-get_ads');
    if (!body.message) {
        console.log(`body:${$response.body}`);
        // error code https://www.csjplatform.com/supportcenter/5421
        if (!('status_code' in body)) {
            $notification.post(noticeTitle, "CSJ", "message/status_code error");
        } else {
            console.log('ADs blank');
        }
    } else {
        console.log(Object.keys(body));
        body = {
            "request_id": 'F5617E54-3FF4-4052-9B09-4227D09B5105',
            "status_code": 20001,
            "reason": 112,
            "desc": "The code has a high request volume and low consumption, so the fill rate is controlled within 10%. This strategy takes effect daily. If the consumption of the code slot increases or the request volume is less than 5000 on the day, the strategy will not be triggered the next day."
        };
        console.log('success');
    }
} else if (url.includes('mi.gdt.qq.com') && method === getMethod) {
    console.log('Adnet');
    if ('ret' in body) {
        if (body.ret === 0) {
            // https://developers.adnet.qq.com/doc/android/union/union_debug#sdk%20%E9%94%99%E8%AF%AF%E7%A0%81
            body.ret = 102006;
            console.log('"Modify result successful."');
        } else {
            console.log(`"Result is not zero, do not process."`);
        }
    } else {
        console.log(`body:${$response.body}`);
        $notification.post(noticeTitle, "Adnet", "No result");
    }
} else if (url.includes('open.e.kuaishou.com') && method === postMethod) {
    console.log('KS');
    if (body.result === 1) {
        // error code: https://u.kuaishou.com/home/detail/1158
        body.result = 40003;
        console.log('Modify result successful.');
    } else {
        console.log('do not process.');
    }
} else {
    $notification.post(noticeTitle, "Path/request method mismatch error:", method + "," + url);
}

body = JSON.stringify(body);

$done({
    body
});