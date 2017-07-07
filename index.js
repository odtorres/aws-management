const AWS = require('aws-sdk')
const s3Util = require('./src/s3util')
let s3 = new AWS.S3({ signatureVersion: 'v4', forceDestroy: true });

let recursive = function (listBuckets, pos) {
    if (listBuckets.length > pos)
        if (listBuckets[pos].Name != "www.acworthga-ilovekickboxing.com" &&
            listBuckets[pos].Name != "www.acworthkickboxingclasses.com") {
            console.log("Removing bucket " + listBuckets[pos].Name)
            s3Util.clearBucket(s3, listBuckets[pos].Name, () => {
                s3Util.deleteBucket(s3, listBuckets[pos].Name, () => {
                    recursive(listBuckets, pos + 1)
                })
            })
        } else {
            console.log(listBuckets[pos].Name)
            recursive(listBuckets, pos + 1)
        }
}

s3Util.listBuckets(s3, (buckets) => {
    recursive(buckets, 0)
    /*buckets.forEach((e => {
        if (e.Name != "www.acworthga-ilovekickboxing.com" && e.Name != "www.acworthkickboxingclasses.com") {
            s3Util.clearBucket(s3, e.Name, () => {
                s3Util.deleteBucket(s3, e.Name)
            })

        } else {
            console.log(e.Name)
        }
        //console.log(e.Name)
    }))*/
})