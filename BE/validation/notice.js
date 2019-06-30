  function validNotice(notice) {
      console.log(notice);
    if(!notice) {
        console.log(1);
        return false;
       
    }
    if(!notice.issuerName || notice.issuerName.length ==0){
        console.log(2);
        return false;
    }
    if(!notice.issuerId || notice.issuerId.length ==0){
        console.log(3);
        return false;
    }
    if(!notice.domain || notice.domain.length ==0){
        console.log(4);
        return false;
    }
    if(!notice.content || notice.content.length ==0){
        console.log(5);
        return false;
    }
    return true
}
exports.validNotice = validNotice;