const AWS = require('aws-sdk')
const s3Util = require('./src/s3util')
let s3 = new AWS.S3({ signatureVersion: 'v4', forceDestroy: true });



s3Util.listBuckets(s3, (buckets) => {
    buckets.forEach((e => {
        if (e.Name != "www.acworthga-ilovekickboxing.com" && e.Name != "www.acworthkickboxingclasses.com"){
            //s3Util.clearBucket(s3, e.Name)
            s3Util.deleteBucket(s3, e.Name)            
        }else{
            console.log(e.Name)
        }
        //console.log(e.Name)
    }))
})