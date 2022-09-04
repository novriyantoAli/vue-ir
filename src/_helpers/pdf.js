import jsPDF from 'jspdf';

export function pdf(name, data) {
    var doc = new jsPDF('p', 'pt', 'a4');
    //Dimension of A4 in pts: 595 × 842
    var pageWidth = 595;
    var pageHeight = 842;

    var pageMargin = 20; // sebelumnya 10

    pageWidth -= pageMargin * 2;
    pageHeight -= pageMargin * 2;

    var cellPadding = 5;
    var cellWidth = 120; // dicoba untuk memperkecil tabel
    var cellHeight = 70;
    var lineHeight = 10;

    var startX = pageMargin;
    var startY = pageMargin;

    function createCard(item) {
        //cell projection
        var requiredWidth = startX + cellWidth + (cellPadding * 2);
        var requiredHeight = startY + cellHeight; //+ (cellPadding * 2);
        if (requiredWidth <= pageWidth) {
            textWriter(item, startX + cellPadding, startY + cellPadding);
            startX = requiredWidth;
            //  startY += cellHeight + cellPadding;
        } else {
            if (requiredHeight > pageHeight) {
                doc.addPage();
                startY = pageMargin;
            } else {
                startY = requiredHeight;
            }
            startX = pageMargin;
            textWriter(item, startX + cellPadding, startY + cellPadding);
            startX = startX + cellWidth + (cellPadding * 2);
        }
    }

    function setFont(size, type) {
        doc.setFontSize(size);
        
        var fontType = 'normal';
        if (type === 1) {
            fontType = 'bold';
        } else if (type === 2) {
            fontType = 'italic';
        }

        doc.setFont(undefined, fontType);
    }

    function textWriter(item, xAxis, yAxis) {
        doc.rect(startX - cellPadding, startY - cellPadding, cellWidth, (cellHeight - (cellPadding * 2)))
        setFont(6, 2)
        doc.text("paket\t: " + item.package_name, xAxis, yAxis );
        doc.text("serial\t: " + item.batch_name, xAxis, yAxis + lineHeight);
        setFont(16, 1);
        doc.text(item.voucher_code, xAxis, yAxis + (lineHeight * 3));
        setFont(6, 0);
        doc.text("Call Service: " + "082219193211", xAxis, yAxis + ((lineHeight / 2) + lineHeight * 4));
    }

    setFont(6, 0);

    for (var i = 0; i < data.length; i++) {
        createCard(data[i]);
    }
    
    return doc.save(name+'report.pdf');
}