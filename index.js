$(document).ready(() => {
	// Nama Produk yang Tersedia
	let products = [
    "Jet Tempur",
    "Nuklir Hiroshima",
    "Infinity Stone",
    "Burj Khalifa",
    "Rudal Hipersonik"
];

	// Stok Produk yang tersedia
	let stock = [
    {	
        itemName:"Jet Tempur",
        quantity: 10,
    },
    {
        itemName: "Nuklir Hiroshima",
        quantity: 1,
    },
    {
        itemName: "Infinity Stone",
        quantity: 6,
    },
    {
        itemName: "Burj Khalifa",
        quantity: 5,
    },
    {
        itemName: "Rudal Hipersonik",
        quantity: 3,
    }
];

	var n = 1
	$("#btn-add").hide();
	$("#product-" + n).change(function () {
		$("#btn-add").show();
	})

	let order = "";
	$("#btn-pesan").click(function () {
		if ($("#input-name").val() == "") {
			alert("Name Required")
		} else {
			$("#name-show").html($("#input-name").val())
			for (let i = 1; i <= n; i++) {
				let idx = stock.findIndex((element) => element.itemName === $("#product-" + i).val());

				if ($("#quantity-" + i).val() <= stock[idx].quantity) {
					stock[idx].quantity -= $("#quantity-" + i).val();

					order += 
						"<li>" +
						$("#product-" + i).val() +
						" (" +
						$("#quantity-" + i).val() +
						")</li>"
					$("#order-list").html(`${order}`)
				} else {
					alert(
						`Produk ${stock[idx].itemName} tidak dapat dipesan, stok tersedia ${stock[idx].quantity}`
					)
				}
			}
		}
	})

	$("#btn-add").click(function () {
		let idx = stock.findIndex((element) => element.itemName === $("#product-" + n).val());
		n += 1;

		let order = `
		<div class="product-card">
			<div class="select-option" id="id-${n}">
			<br>
			<select id="product-${n}" required>
				<option value="" hidden selected>Pilih product</option>
		`

		function removeItem(array, item) {
			for (var i in array) {
				if (array[i] == item) {
					array.splice(i, 1)
					break
				}
			}
		}
		removeItem(products, stock[idx].itemName)

		products.forEach((element) => {
			order += `<option value="${element}">${element}</option>`
		})

		order += `
			</select>
			<br>
			</div>
			<div class="field-quantity">
				<br>
				<input type="nber" id="quantity-${n}" class="quantity" required>
				<br>
			</div>
		`
		order += `
			<div id='button-delete' class="del">
				<button id="btn-delete-${n}" class="btn-danger">
					<div class='box'>x</div>
				</button>
			</div>
		</div>
		`
		$(this).before(order)

		if (products.length == 1) {
			$("#btn-add").hide()
		}

		$("#btn-delete-" + n).click(function () {
			$("#id-" + n).nextAll()
			$(this).parent().parent().remove()
			$("#id-" + n).closest("div")
			$(this).parent().parent().remove()
			$("#btn-add").show()
		})
	})

})