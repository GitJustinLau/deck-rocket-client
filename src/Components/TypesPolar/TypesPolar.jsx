import { PolarArea } from 'react-chartjs-2';
import { Chart, RadialLinearScale, ArcElement, Colors, Tooltip, Legend } from 'chart.js';
Chart.register(RadialLinearScale, ArcElement, Colors, Tooltip, Legend);

const TypesPolar = ({ TypedCards = { TypedCards } }) => {
    Chart.defaults.borderColor = '#9c9a9b';

    const data = {
        labels: Object.keys(TypedCards).map((type) => type),
        datasets: [{
                data: Object.keys(TypedCards).map((type) => TypedCards[type].reduce((acc,curr) => acc + Number(curr.quantity),0)),
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