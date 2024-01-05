import React, { Component } from 'react'
class Amount extends Component {

    render() {
        const { amountData } = this.props
        var amount = 0;
        {
            amountData.map((data, index) => {
                if (data.type === "GET") {
                    amount = parseFloat(amount) + parseFloat(data.amount)
                }
                else if (data.type === "SPEND") {
                    amount = parseFloat(amount) - parseFloat(data.amount)
                }
                else {
                    amount = parseFloat(amount)
                }
            })
        }

        return (
            <span id="visible">
                Total amount : {parseFloat(amount)}
            </span>
        )
    }
}

export default Amount
