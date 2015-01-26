  /**
    * 单行多颜色文本类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    * 多种颜色文本，超链接，回调
    * todo:超链接、下划线、回调等
    */

class HtmlText extends egret.DisplayObjectContainer{

    private tfArr:Array<any> = [];

    /**
    * contentArr       多文本数组 [描述，颜色，字体大小，是否加粗，描边宽度，描边颜色，是否有下划线[颜色和字体颜色一致][todo]，回调方法[todo]]
    * fontSize         文本字体大小
    * isBold           是否加粗
    * stroke           描边宽度
    * strokeColor      描边颜色
    * 如：[["black",0x000000,30,false,1,0x000000],["green",0x55ff00,30,false,1,0x000000]]
    * 注意：定位y的时候按照最高的文字定位
    */
    public constructor(contentArr:Array<any>,fontSize:number = 30,isBold:boolean = false,stroke:number = 0,strokeColor:number = 0x000000){
        super();
        this.setData(contentArr,fontSize,isBold,stroke,strokeColor);
    }

    public setData(contentArr:Array<any>,fontSize:number = 30,isBold:boolean = false,stroke:number = 0,strokeColor:number = 0x000000):void {
        var len1:number = this.tfArr.length;
        for (var i = 0; i < len1; i++){
            this.removeChild(this.tfArr[i]);
        }
        this.tfArr = [];

        var lastX:number = 0;
        var baseH:number = 0;//最终高度基准
        //解析html标签
        var len2:number = contentArr.length;
        for (var i = 0; i < len2; i++){
            var contentRender = contentArr[i];
            //处理文本数组
            if(contentRender[0] == null){//描述
                contentRender[0] = "";
            }
            if(contentRender[1] == null){//颜色
                contentRender[1] = 0xFFFFFF;
            }
            if(contentRender[2] == null){//字体大小
                contentRender[2] = fontSize;
            }
            if(contentRender[3] == null){//是否加粗
                contentRender[3] = false;
            }
            if(contentRender[4] == null){//描边宽度
                contentRender[4] = 1;
            }
            if(contentRender[5] == null){//描边颜色
                contentRender[5] = 0x000000;
            }
            var tf:egret.TextField = new egret.TextField();
            this.addChild(tf);
            tf.text = contentRender[0];
            tf.textColor = contentRender[1];
            tf.size = contentRender[2];
            tf.bold = contentRender[3];
            tf.stroke = contentRender[4];
            tf.strokeColor = contentRender[5];

            tf.x = lastX;
            lastX += tf.width;

            this.tfArr[i] = tf;

            //y值定位
            if(baseH < tf.height){
                baseH = tf.height;
            }            
        }

        //y值定位
        for (var i = 0; i < len2; i++){
            var tempTf:egret.TextField = this.tfArr[i];
            tempTf.y = baseH - tempTf.height;
        }        

    }

}
