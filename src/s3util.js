module.exports = {
    deleteObject: function (client, deleteParams, done) {
        client.deleteObject(deleteParams, function (err, data) {
            if (err) {
                console.log("delete err " + deleteParams.Key);
            } else {
                console.log("deleted " + deleteParams.Key);
            }
            done && done()
        });
    },
    listBuckets: function (client, done) {
        client.listBuckets({}, function (err, data) {
            var buckets = (data)?data.Buckets:[];
            //var owners = data.Owner;
            done && done(buckets)
            /*for (var i = 0; i < buckets.length; i += 1) {
                var bucket = buckets[i];
                console.log(bucket.Name + " created on " + bucket.CreationDate);
            }*/
            /*for (var i = 0; i < owners.length; i += 1) {
                console.log(owners[i].ID + " " + owners[i].DisplayName);
            }*/
        });

    },
    deleteBucket: function (client, bucket,done) {
        client.deleteBucket({ Bucket: bucket }, function (err, data) {
            if (err) {
                console.log("error deleting bucket " + err);
            } else {
                console.log("delete the bucket " + data);
            }
            done && done()
        });
    },
    clearBucket: function (client, bucket, done) {
        var self = this;
        client.listObjects({ Bucket: bucket }, function (err, data) {
            if (err) {
                console.log("error listing bucket objects " + err);
                return;
            }
            var items = data.Contents;
            for (var i = 0; i < items.length; i += 1) {
                var deleteParams = { Bucket: bucket, Key: items[i].Key };
                self.deleteObject(client, deleteParams);
            }
            setTimeout(() => {
                done && done()
            }, 2500)
        });
    }

};