$(function () {
    console.log('OK!!');

    var eaterCounter = 0;
    var foodCounter = 0;

    $('#addEater').on('click', function () {
        addEater();
    });

    function addEater() {
        eaterCounter++;
        foodCounter++;
        var tbody = $('tbody');
        tbody.append('<tr>\n' +
            '                <td><input type="text" class="name" placeholder="输入名字" value="食客' + eaterCounter + '"/></td>\n' +
            '                <td><input type="text" class="food" placeholder="输入食物" value="食物' + foodCounter + '"/></td>\n' +
            '                <td><input type="number" class="money" value="0"/></td>\n' +
            '                <td><input type="text" class="weight" readonly/></td>\n' +
            '                <td><input type="text" class="realmoney" readonly/></td>\n' +
            '            </tr>');
        $('input[type="number"]').off('change');
        $('input[type="number"]').on('change', function () {
            calc();
        });
    }

    function calc() {
        var tbody = $('tbody');
        var eaters = $(tbody).find('tr');
        var total = 0;
        var data = [];
        for (var i = 0; i < eaters.length; i++) {
            var money = $(eaters[i]).find('input.money').val();
            total += parseFloat(money);
            data.push({money: money});
        }
        var expand = parseFloat($('#expand').val()) || 0;
        var discount = parseFloat($('#discount').val()) || 0;
        $('#total').html(total);
        var realcount = total + expand - discount;
        $('#realtotal').html(realcount);

        for (var i = 0; i < data.length; i++) {
            var weight = data[i].money / total;
            weight = weight.toFixed(4);
            $(eaters[i]).find('input.weight').val(weight);
            var realmoney = realcount * weight;
            realmoney = realmoney.toFixed(2);
            $(eaters[i]).find('input.realmoney').val(realmoney);
        }

    }

    $('input[type="number"]').on('change', function () {
        calc();
    });

    addEater();
});