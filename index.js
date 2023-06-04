// Credit : https://gist.githubusercontent.com/AidasK/9550e1eb97b3b121c5122aef0d778608/raw/e981e7b9996498675cef608a25189bd2f50f592e/console.js

// fungsi async untuk menghapus semua catatan
async function deleteAllRecords() {
    let e;
    // klik semua tombol Edit
    filterEditButtons().forEach((e) => e.click());
    while (e = filterDeleteButtons()[0]) {
        e.click();
        await confirmDelete();
    }
}

// fungsi untuk mencari dan mengembalikan semua tombol Delete di dalam dokumen
function filterDeleteButtons() {
    return [
        ...[...document.querySelectorAll('a')].filter((e) => e.innerHTML === '<span>Delete</span>'),
        ...[...document.querySelectorAll('button')].filter((e) => e.innerHTML === 'Delete'),
    ];
}

// fungsi untuk mencari dan mengembalikan semua tombol Edit di dalam dokumen
function filterEditButtons() {
    return [
        ...document.querySelectorAll('a'),// tampilan lama
        ...document.querySelectorAll('button')
    ].filter((e) => e.innerHTML.indexOf('<span>Edit</span>') != -1 );
}

// fungsi untuk mengkonfirmasi penghapusan
function confirmDelete(iteration) {
    iteration = iteration || 1;
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            let button = [...document.querySelectorAll('button')].filter((e) => e.innerHTML === '<span>Delete</span>')[0];
            if (button) {
                button.click();
                await waitConfirmDelete();
                resolve();
            } else if (iteration > 30) {
                console.log('failed confirmDelete');
                reject();
            } else {
                confirmDelete(iteration + 1)
            }
        }, 100);
    });
}

// fungsi untuk menunggu konfirmasi penghapusan
function waitConfirmDelete() {
    return new Promise((resolve, reject) => {
        let iteration = 1;
        let i = setInterval(() => {
            if (iteration++ > 30) {
                clearInterval(i);
                reject();
                return;
            }
            if ([...document.querySelectorAll('button')].filter((e) => e.innerHTML === '<span>Delete</span>')[0]) {
                return;
            }
            clearInterval(i);
            resolve();
        }, 100)
    });
}

// panggil fungsi deleteAllRecords untuk menghapus semua catatan
deleteAllRecords();
