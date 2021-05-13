import { Injectable } from '@angular/core';


@Injectable()
export class FilterListProvider {

  constructor() {
  }

  filterItems(searchTerm, attr, items) {
    return items.filter(item =>  item[attr].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  }

  filterItemsClient(searchTerm, items){
    return items.filter(item =>  item[item.clientType === 'PERSON'? 'name' : 'businessName'].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
  }

  filterbyElement(items, attr, type){
    return items.filter(item =>  item[attr] === type);
  }

  filterDocumentByStatus(searchTerm, items){
    return items.filter(item =>  item.state.indexOf(searchTerm) > -1);
  }



  generateInvoiceTotals(list){
    let discount = 0;
    let exonet = 0;
    let mag = 0;
    let iva = 0;
    let total = 0;
    let subtotal = 0;

    list.forEach(element => {
      const a = (( element.discount / 100) * element.totalPrice)
      discount += a;
      iva += ( element.iva / 100) * element.totalPrice;
      subtotal =  subtotal + element.totalPrice;
      exonet += ( element.exonet / 100) * element.totalPrice;
    });
    total = subtotal - ( discount + exonet); 

    

    return { discount, exonet, mag, total, subtotal, iva }
  }
}
