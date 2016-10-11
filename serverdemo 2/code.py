# -*-coding:utf-8-*-
__author__ = 'czz'

import web
import conmongo
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

##urls (argument) - class - page
urls = (
    '/(\index)', 'index',
    '/(\d+)', 'baseinfo',
    '/graph','graph'

)
render = web.template.render("templates")


class index:
    def GET(self, name):
        return render.index(name)

    def POST(self, name):
        i = web.data()
        topic = i.split('=')[1]
        data=''
        # type='1'
        # 获取数据
        return render.graph(name, topic,data)

class graph:
    def GET(self, name):
        # argu = [name, 'help']
        # argus = {'a1': '111', 'a2': '222'}
        # return render.test('hh', *argu, **argus)
        return render.graph(name)

    def POST(self):
        i = web.data()
        print i
        topic = i.split('=')[1]
        type =i.split('=')[2]
        data ='true'
        # 获取数据
        return data

class baseinfo:
    def GET(self, name):
        data = {"证券代码": name}
        processor = conmongo.process()
        rows = processor.queryData('test', data)
        res =''
        info = ''
        issues =''
        price=''
        enter=''

        for row in rows:
            for key in row.keys():  # 遍历字典
                if key=='公司名称':
                    info += '公司名称' + ":" + str(row[key]) + "\n"
                if key == '英文名称':
                    info += '英文名称' + ":" + str(row[key]) + "\n"
                if key == '证券简称':
                    info += '证券简称' + ":" + str(row[key]) + "\n"
                if key == '证券代码':
                    info += '证券代码' + ":" + str(row[key]) + "\n"
                if key == '行业类别':
                    info += '行业类别' + ":" + str(row[key]) + "\n"
                if key == '上市时间':
                    issues += '上市时间' + ":" + str(row[key]) + "\n"
                if key == '每股面值(元)':
                    issues += '每股面值(元)' + ":" + str(row[key]) + "\n"
                if key == '发行总市值(万元)':
                    issues += '发行总市值(万元)' + ":" + str(row[key]) + "\n"
                if key == '主承销商':
                    issues += '主承销商' + ":" + str(row[key]) + "\n"
                if key == '保荐人':
                    issues += '保荐人' + ":" + str(row[key]) + "\n"
                if key=='form':
                    formrows=row[key]
                    for formrow in formrows:
                        for formkey in formrow.keys():
                            enter += str(formkey) + ":" +str(formrow[formkey])+"\n"
                        enter +="-------------------------------------------------\n"
                if key!='form':
                    res += str(key) + ":" + str(row[key]) + "\n"
        return render.fenlan(name, res,info,issues,enter)

    def POST(self):
        # i = web.data()
        # print i
        i = web.data
        name = i.get('query')
        print 'name: ', name




if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
