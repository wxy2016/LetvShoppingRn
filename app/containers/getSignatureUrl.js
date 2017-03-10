import NativeSignatureUrl from './NativeSignatureUrl';


let categoryUrl="https://lebuy.scloud.letv.com/api/v3/category";

let categoryContentUrl="https://lebuy.scloud.letv.com/api/v3/category/listWithReport";

let categoryMoreUrl="https://lebuy.scloud.letv.com/api/v3/category/product";



export function getJson(params,nativeUrl,callback) {
   NativeSignatureUrl.getSignatureUrl(params,nativeUrl,true,(url)=>{
       fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        callback(responseJson);
      })
      .catch(function (e) {
        console.log(e + 'getData error');
      })
}); 
}

