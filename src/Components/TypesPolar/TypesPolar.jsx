import { PolarArea } from 'react-chartjs-2';
import { Chart, RadialLinearScale, ArcElement, Colors, Tooltip, Legend } from 'chart.js';
Chart.register(RadialLinearScale, ArcElement, Colors, Tooltip, Legend);

const TypesPolar = ({ TypedCards = { TypedCards } }) => {

    const data = {
        labels: Object.keys(TypedCards).map((type) => type),
        datasets: [{
                data: Object.keys(TypedCards).map((type) => TypedCards[type].reduce((acc,curr) => acc + Number(curr.quantity),0)),
                "borderWidth":"0",
            }]
    };

    const config = {
        type: 'polarArea',
        data: data,
        options: {
            responsive: true,
        }
    };

    return (
        <div className='types-polar'>
            <h2>Types distribution</h2>
            <PolarArea data={data} options={config} />
        </div>
    )
}
export default TypesPolar;