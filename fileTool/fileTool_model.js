function Lp_fileTool_model(){

    /*    
    README

   
    ARCHITECTURE
       

    CUSTOMIZATION OBJECT

    WARNING
       

    DEPENDENCY
    */


    
    this.magicNumber = new function(){
        this.maxFileSize = 6000000; // "6 MB"; 
        this.allowFileExtensions = ["jpg", "jpeg", "png"]
    }



    this.checkFileSize = function(file){
        var isValid = false
        if(file.size <= this.magicNumber.maxFileSize){
            isValid = true;
        }

        return {
            isValid: isValid,
            fileSize: file.size,
            maxFileSize: this.magicNumber.maxFileSize
        }

    }

    this.getFileExtension = function(file){
        var fileNameAndExtension = file.name;
        var nameParts = fileNameAndExtension.split(".");
        var fileExtension = nameParts[nameParts.length-1].toLowerCase();
        return fileExtension
    }


    this.checkFileExtension = function(file){

        var fileExtension = this.getFileExtension(file)
        var isValid = false
        if(this.magicNumber.allowFileExtensions.includes(fileExtension))  isValid = true

        return {
            isValid: isValid,
            fileExtension: fileExtension
        }
    }

    

    this._init = (function(){
        
    }).bind(this)()

}



