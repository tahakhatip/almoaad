// تعريف المتغيرات
let ddlcategory = document.getElementById('ddlcategory');
let category = document.getElementById('category');
let product = document.getElementById('product');
let quntity = document.getElementById('quntity');
let price = document.getElementById('price');
let descount = document.getElementById('descount');
let total = document.getElementById('total');
let btnStatus = "Create";
let proID;

let CategoryArry = localStorage.Category ? JSON.parse(localStorage.Category) : [];
let ProductArry = localStorage.Product ? JSON.parse(localStorage.Product) : [];

// دالة لحفظ الفئة
function SaveCategory() {
    let objCategory = { category: category.value };
    CategoryArry.push(objCategory);
    localStorage.setItem('Category', JSON.stringify(CategoryArry));
    ResetCategoryForm();
    ShowCategory();
    ShowTableCategory();
    CountCategory();
}

// دالة لإعادة تعيين حقول إدخال الفئة
function ResetCategoryForm() {
    category.value = '';
}

// دالة لعرض الفئات في القائمة المنسدلة
function ShowCategory() {
    let item = '<option value="">Select Category........</option>';
    for (let i = 0; i < CategoryArry.length; i++) {
        item += `<option value="${i}">${CategoryArry[i].category}</option>`;
    }
    ddlcategory.innerHTML = item;
}

// دالة لعرض الفئات في الجدول
function ShowTableCategory() {
    let table = '';
    for (let i = 0; i < CategoryArry.length; i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${CategoryArry[i].category}</td>
                <td>
                    <button class="btn btn-danger" onclick="DeleteCategory(${i})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>`;
    }
    document.getElementById('bodyCate').innerHTML = table;
}

// دالة لحذف فئة
function DeleteCategory(id) {
    if (confirm('Are you sure you want to delete this category?')) {
        CategoryArry.splice(id, 1);
        localStorage.setItem('Category', JSON.stringify(CategoryArry));
        ShowTableCategory();
        ShowCategory();
        CountCategory();
    }
}

// دالة لحساب عدد الفئات
function CountCategory() {
    document.getElementById('countCategory').innerHTML = `-Total Category (${CategoryArry.length})`;
}

// دالة للتحقق من صحة إدخال الفئة
function ValidationCategory() {
    if (category.value === '') {
        alert('Please enter a category name.');
        return false;
    } else {
        SaveCategory();
        return true;
    }
}

// دالة لحساب المجموع الكلي
function GetTotal() {
    if (price.value != 0) {
        let totalValue = (quntity.value * price.value) - descount.value;
        total.value = totalValue;
        total.className = "form-control bg-success text-center";
    } else {
        total.value = 0;
        total.className = "form-control bg-danger text-center";
    }
}

// دالة لحفظ المنتج
function SaveProduct() {
    let newProduct = {
        ddlcategory: ddlcategory.options[ddlcategory.selectedIndex].text,
        product: product.value,
        quntity: quntity.value,
        price: price.value,
        descount: descount.value,
        total: total.value
    };

    if (btnStatus === "Create") {
        ProductArry.push(newProduct);
    } else {
        ProductArry[proID] = newProduct;
        btnStatus = "Create";
    }

    localStorage.setItem("Product", JSON.stringify(ProductArry));
    ResetProductForm();
    ShowTableProduct();
    CountProduct();
}

// دالة لإعادة تعيين حقول إدخال المنتج
function ResetProductForm() {
    ddlcategory.selectedIndex = 0;
    product.value = '';
    quntity.value = 0;
    price.value = 0;
    descount.value = 0;
    total.value = 0;
    document.getElementById('btnSave').className = 'btn btn-success w-25';
}

// دالة لعرض المنتجات في الجدول
function ShowTableProduct() {
    let tablePro = '';
    for (let x = 0; x < ProductArry.length; x++) {
        tablePro += `
            <tr>
                <td>${x}</td>
                <td>${ProductArry[x].ddlcategory}</td>
                <td>${ProductArry[x].product}</td>
                <td>${ProductArry[x].quntity}</td>
                <td>${ProductArry[x].price}</td>
                <td>${ProductArry[x].descount}</td>
                <td>${ProductArry[x].total}</td>
                <td>
                    <button class="btn btn-info" onclick="EditProduct(${x})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger" onclick="DeleteProduct(${x})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>`;
    }
    document.getElementById('tablePro').innerHTML = tablePro;
}

// دالة لحذف منتج
function DeleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        ProductArry.splice(id, 1);
        localStorage.setItem("Product", JSON.stringify(ProductArry));
        ShowTableProduct();
        CountProduct();
    }
}

// دالة لتحرير منتج
function EditProduct(id) {
    ddlcategory.value = CategoryArry.findIndex(cat => cat.category === ProductArry[id].ddlcategory);
    product.value = ProductArry[id].product;
    quntity.value = ProductArry[id].quntity;
    price.value = ProductArry[id].price;
    descount.value = ProductArry[id].descount;
    total.value = ProductArry[id].total;
    btnStatus = "Edit";
    proID = id;
    document.getElementById('btnSave').className = 'btn btn-info w-25';
}

// دالة لحساب عدد المنتجات
function CountProduct() {
    document.getElementById('countpro').innerHTML = `-Total Products (${ProductArry.length})`;
}

// دالة للتحقق من صحة إدخال المنتج
function ValidationProduct() {
    let valid = true;
    let lbcate = document.getElementById('lbcate');
    let lbProduct = document.getElementById('lbProduct');
    let lbqutity = document.getElementById('lbqutity');
    let lbPrice = document.getElementById('lbPrice');

    if (ddlcategory.options[ddlcategory.selectedIndex].text === 'Select Category........') {
        lbcate.innerHTML = 'Category: * [Required]';
        lbcate.style.color = 'red';
        valid = false;
    } else {
        lbcate.innerHTML = 'Category: *';
        lbcate.style.color = 'white';
    }

    if (product.value === '') {
        lbProduct.innerHTML = 'Product Name: * [Required]';
        lbProduct.style.color = 'red';
        valid = false;
    } else {
        lbProduct.innerHTML = 'Product Name: *';
        lbProduct.style.color = 'white';
    }

    if (quntity.value == 0) {
        lbqutity.innerHTML = 'Quantity: * [Required]';
        lbqutity.style.color = 'red';
        valid = false;
    } else {
        lbqutity.innerHTML = 'Quantity: *';
        lbqutity.style.color = 'white';
    }

    if (price.value == 0) {
        lbPrice.innerHTML = 'Price: * [Required]';
        lbPrice.style.color = 'red';
        valid = false;
    } else {
        lbPrice.innerHTML = 'Price: *';
        lbPrice.style.color = 'white';
    }

    if (valid) {
        SaveProduct();
    }

    return valid;
}

// تنفيذ العمليات عند تحميل الصفحة
$(document).ready(function() {
    ShowCategory();
    ShowTableCategory();
    CountCategory();
    ShowTableProduct();
    CountProduct();
    $('#tablPro').DataTable();
});
