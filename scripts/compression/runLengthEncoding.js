/**
 * Perform RunLengthEncoding compression algorithm
 * Original code from
 * https://www.rosettacode.org/wiki/Run-length_encoding#JavaScript
 * @constructor
 */
function RunLengthEncoding(){
    /**
     * Encode and compress an array of integers
     * @param {number[]} input
     * @return {[]}
     */
    this.encode = function(input) {
        let encoding = [];
        let prev, count, i;
        for (count = 1, prev = input[0], i = 1; i < input.length; i++) {
            if (input[i] !== prev) {
                encoding.push([count, prev]);
                count = 1;
                prev = input[i];
            }
            else
                count ++;
        }
        encoding.push([count, prev]);
        return encoding;
    };

    /**
     * Uncompress and unencode a data structure obtained through encode
     * This function has been modified respect to the original, in order to return an array of integers,
     * instead of a string of characters
     * @param {[]} encoded
     * @return {number[]}
     */
    this.decode = function(encoded) {
        let output = [];
        encoded.forEach(
            function(pair){
                for(let i = 0; i < pair[0]; i++){
                    output.push(pair[1]);
                }
            });
        return output;
    }
}