import { Container, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'

export const Dashboard = () => {
  return (
    <div>
      <Container maxWidth='lg' sx={{ mt: 1 }}>
        <Typography variant='h4' gutterBottom>
          Общая статистика
        </Typography>
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: [
                'Финансовые нарушения',
                'Защита персональных данных',
                'Защита личных цифровых устройств',
                'Правила работы в сети Интернет'
              ],
              scaleType: 'band'
            }
          ]}
          series={[
            {
              data: [0.2, 0.9, 0.85, 0.56]
            }
          ]}
          width={700}
          height={300}
        />
        <Typography variant='h7' gutterBottom>
          (чем меньше значение, тем меньше ошибок допускают по теме)
        </Typography>
      </Container>
    </div>
  )
}
