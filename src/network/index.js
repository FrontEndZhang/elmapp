import {request} from 'network/request';
import {url} from 'network/config';
// 用户请求
export function getSeller(){
    return request({
        url : url.seller 
    })
}
