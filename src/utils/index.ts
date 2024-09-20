export function formatCurrency (amout:number) {
    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'
    }).format(amout)
}
export function toBoolean (string: string){
    return string.toLocaleLowerCase() === 'true'
}