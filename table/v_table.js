function Lpv_table(){

    this.borderCollapse = "collapse" //-- separate or collapse

    this.createTable = function(Columns, TableContents){

        this.Columns = Columns

        //-- table parent
        var mainParentNode = document.createElement("DIV")
        mainParentNode.style.width = "100%"
        mainParentNode.style.float = "left"

        var tableParentNode = document.createElement("DIV")
        tableParentNode.style.width = "100%"
        tableParentNode.style.float = "left"


        var tableNode = document.createElement("TABLE")
        tableNode.style.borderCollapse = this.borderCollapse


        //-- create content rows
        for(var i=0; i<TableContents.length; i++){
            var TableContent = TableContents[i]
            var contentRowNode = this.createContentRow(Columns, TableContent)
            tableNode.appendChild(contentRowNode)

        }


        //--create head row   
        var headRowNode = this.createHeadRow(Columns)
        tableNode.appendChild(headRowNode)


        tableParentNode.appendChild(tableNode)

        mainParentNode.appendChild(tableParentNode)
    }


    this.createRowNode = function(){
        var rowNode = document.createElement("TR")
        return rowNode;
    }


    this.createContentCellsInRow = function(Columns, TableContent, contentRowNode){

        function createEachContentCell(Column, TableContent){

            var contentKeyName = Column.contentKeyName
            var content = TableContent[contentKeyName]
            var contentText = (Array.isArray(content))? content.join(", "): content

            var cellNode = document.createElement("TD")
            cellNode.innerHTML = contentText
            this.addSyleToTableCell(cellNode, Column)

            return cellNode

        }

        var cellNodes = []

        for(var i=0; i<Columns.length; i++){
            
            var Column = Columns[i]
            var Subcolumns = Column.Subcolumns
            if(Subcolumns.length>0){
                this.createContentCellsInRow(Subcolumns, TableContent, contentRowNode)
            }
            else{
                var cellNode = createEachContentCell(Column, TableContent)
                contentRowNode.appendChild(cellNode)
            }
            
        }
        
        return cellNodes;
        
    }



    this.createContentRow = function(Columns, TableContent){

        var contentRowNode = this.createRowNode()

        this.createContentCellsInRow(Columns, TableContent, contentRowNode)
        
        return contentRowNode;
    }


    this.createHeadRow = function(Columns){

        var headRowNode = this.createRowNode()
        
        for(var i=0; i<Columns.length; i++){
            var Column = Columns[i]

            var headCellNOde = document.createElement("TH")
            headCellNOde.innerHTML = Column.name
            this.addSyleToTableCell(headCellNOde, Column, "head")

            headRowNode.appendChild(headCellNOde)
        }

        return headRowNode
    }


    this.addSyleToTableCell = function(cellNode, Column, headOrContent = "content"){

        //-- apply general style first and then apply head of content style

        var Style_general = Column.Style
        var Style_specific = (headOrContent=="head")? Column.StyleForHead: Column.StyleForContent
        var Styles = [Style_general, Style_specific]

        for(var i=0; i<Styles.length; i++){
            var Style = Styles[i]
            for(var styleName in Style){
                cellNode.style[styleName] = Style[styleName]
            }
        }
    }

}




function Lpv_column_v(){
    this.name = "Colunn name"
    this.contentKeyName = "none"
    this.Style = {} //--general
    this.StyleForHead = {}
    this.StyleForContent = {}
    this.isDisplay = true
    this.Subcolumns = []
}