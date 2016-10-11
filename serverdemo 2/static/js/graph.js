$(document).ready(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    var data = $("#data").val();
    var option = getOption(data);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    $("#topic").click(function () {
        // if(myChart.getOption()==null) {
            var aj = $.ajax({
                url: 'graph',// 跳转到 action
                data: {
                    topic: $("#topicVal").val(),
                    type: "1",
                },
                type: 'post',
                cache: false,
                dataType: 'json',
                success: function (data) {
                    if (data!=null) {
                        // alert("ajax成功！");
                        myChart.setOption(getOption(data));
                        // window.location.reload();
                    } else {
                        view(data.msg);
                    }
                },
                error: function () {
                    // view("异常！");
                    alert("异常！");
                }
            });
        // }

    });


    function getOption(data1) {
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];

        var data = [Math.random() * 300];

        for (var i = 1; i < 20000; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }
        // 指定图表的配置项和数据
        var option1 = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
//                                                    textColor: 'rgb(255, 70, 131)',
                text: '大数据量面积图',
            },
            legend: {
                top: 'bottom',
                data: ['意向']
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name: '模拟数据',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    },
                    data: data
                }
            ]
        };
        return option1;
    }

        $('.nav a').click(function () {
        $(this).closest('.nav').find('a').removeClass('active');
        $(this).addClass('active');
        // var liIndex = $(this).index() + 1;
        // $(this).closest('.tabbed-content').find('.content>li').removeClass('active');
        // $(this).closest('.tabbed-content').find('.content>li:nth-of-type(' + liIndex + ')').addClass('active');
    });

});
/**
 * Created by chenzi on 16/10/10.
 */
