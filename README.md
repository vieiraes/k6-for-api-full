# K6 

<br />

## Ferramenta para Testes de Carga, Estress e Spike

<br />

### Pré-definiçoes

- a ferramenta não é designado para teste de regressão/funcionalidade;
- a ferramenta é apenas **uma ferramenta informativa**.
- uma bateria de testes, não afirma que o report apresentado é a fonte da verdade. Mais testes, durante mais períodos é necessário. Tudo varia.
- a decisão dos números e da capacidade da solução testada parte do ESTUDO E ANÁLISE DOS DADOS.
- nunca deverão ser considerados os números brutos entrgues no report da ferramenta. O bom-senso entre a equipe de Arquitetura, Infraestrutura e Qualidade trará o número exato que será declarado como limite saudável da plataforma através de um consenso baseado na configuração de Infraestrutura apresentada no teste.
- para se usar testes em larga escala ( +- 5mil users ) é necessário "tunar" a máquina de testes. Configurações no shell e scripts devem ser executados. Mais informações em [OS fine tunning](https://k6.io/docs/misc/fine-tuning-os/)
- a ferramenta, por padrão assume sempre que, as requisições serão executadas o mais cedo possivel com melhores esforços(best efforts);
- para mudar o intervalo de execuções (caso necessário), deve-se declarar explícitamente o intervalo, na confecção do teste;
- importante entender que: se declarar um intervalo entre as requisições, então eu estou LIMITANDO o número de execuções por melhores esforços. Neste caso, o indicador de `iterations`, que traz a média de requests por segundo, não é a realidade.

<br />

## Teste de carga

- Técnica para MEDIR o desempenho da aplicação.
- Configura-se um pico máximo usuários simultânos e se mantém o número de usuários por um período;
- Melhor cenário de teste para identificar métricas como:
  - métricas P (p50, p90, p99...)
  - número de usuários que a solução suporta de maneira saudável, baseada na configuração da Infraestrutura no teste;
  - Exemplo

```
    stages: [

        { duration: '2m', target: 200 }, //leia-se: em 2 min, chege a 200 usuários simultâneos
        { duration: '10m', target: 200 }, //leia-se: mantenha por 10min os 200 usuários simultâneos
        { duration: '3m', target: 0 }, //leia-se: em 3min faça o remoção dos usuários ate 0 users
    ],

```


<br />

## Teste de Estress

- Técnica para IDENTIFICAR o números máximos de usuários simultâneos possiveis, baseado na configuração de infraesrutura do teste;
- Configura-se etapas onde serão acrescidos lotes de (X() usuarios simultâneos, por um peŕiodo escalável;
- Ao identificar uma certa instabilidade no numero de falhas de execuções, então chegamos ao limite de estresse da aplicação;
- Muito recomendável utilizar um acompanhanho via gráfico como Grafana, Datadog...;
- Necessário a equipe de infraestrutura para acompanhar este cenário;
- Exemplo:

```
    stages: [

        { duration: '2m', target: 50 },  //leia-se: em 2 min, conecte 50 usuários simultâneos
        { duration: '2m', target: 50 },  //leia-se: mantenha 50 usuários simultâneos durante 2min
        { duration: '2m', target: 100 }, //leia-se: nos próximos 2min, suba para 100 usuários simultâneos
        { duration: '2m', target: 100 }, //leia-se: mantenha 100 usuários simultâneos durante 2min
        { duration: '2m', target: 200 }, //leia-se: nos próximos 2min, suba para 200 usuários simultâneos
        { duration: '2m', target: 200 }, //leia-se: mantenha 200 usuários simultâneos durante 2min
        { duration: '2m', target: 300 }, //leia-se: nos próximos 2min, suba para 300 usuários simultâneos
        { duration: '2m', target: 300 }, //leia-se: mantenha 300 usuários simultâneos durante 2min
        { duration: '5m', target: 0 },   //leia-se: nos próximos 5min, faça remoção para 0 usuários
    ],

```

<br />

## Teste de Spike

- Teste de Estouro;
- Simula um pico instantâneo de usuários num periodo curtíssimo de ingresso;
- Geralmente voltado para teste de infraestrutura;
- Neste teste, é necessário acompanhar o "circuit breaker" da aplicação testada;
- Exemplo

```
    stages: [

        { duration: '2m', target: 10 },   //leia-se: em 2 min, conecte 10 usuários simultâneos
        { duration: '10s', target: 300 }, //leia-se: nos próximos 30s, suba para 300 usuários simultâneos
        { duration: '2m', target: 300 },  //leia-se: nos próximos 2min, mantenha os 300 usuários simultâneos
        { duration: '1m', target: 10 },  //leia-se: nos próximos 1m, faça remoção para 10 usuários simultâneos
        { duration: '5m', target: 10 },  //leia-se: nos próximos 5m, mantenha 10 usuários simultâneos 
    ],

```


<br />

## Patterns de mercado

<br />

### Ramping

- Técnica que combina "Teste de carga" + "Teste de estresse";
- 
- Exemplo:


```
    stages: [

        { duration: '30s', target: 10 },
        { duration: '30s', target: 10 },
        { duration: '1m', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '30s', target: 10 },
        { duration: '10s', target: 200 },
        { duration: '4m', target: 200 },
        { duration: '1m', target: 0 },

    ],

```


<br />


## Recomendações técnicas

- desenvolva o teste de maneira mais nativa possível aos pacotes do K6;
- o K6 possui pacotes equivalentes ao node proprios (xk6_crypto,xk6_dotenv...) tudo para EVITAR o uso de pacotes extras. 
- reduzir ao máximo a camada de pacotes extras utilizados. Quanto mais pacotes extras utilizados, é mais carga na memória. A ideia é ter o máximo de desempenho possível para o K6 estar executando o teste. Se for utilizado pacotes extras de NPM ou mesmo desenvolver os testes em typescript (que é possivel usando um transpilador). Nisso, exigiremos que o K6 faça uma pré-carga dos pacotes e transpilação desnecessária para os testes de carga, e o resultado final pode não ser o esperado, ou pior, trazer um falso número de desenpenho da aplicação.
- desenvolva testes o mais simples possivel
- A ideia de um teste de carga é testar a aplicação somente.

<br />

## informações extras

- é necessário otimizar o Mac para o uso do K6 em máquina local. Isto está desctrido no link [OS fine tunning]([https://](https://k6.io/docs/misc/fine-tuning-os/))
- abaixo um resumo dos comando necessarios 

```
sysctl -w net.ipv4.ip_local_port_range="1024 65535"
sysctl -w net.ipv4.tcp_tw_reuse=1
sysctl -w net.ipv4.tcp_timestamps=1
ulimit -n 250000
```


[K6 library]([https://](https://k6.io/docs/javascript-api/jslib/utils/))

## Leitura de principais indicadores



```
running (10.4s), 0/1 VUs, 8 complete and 0 interrupted iterations
default ✓ [======================================] 0/1 VUs  10s

     ✓ status was 200 or 201
     ✓ transaction time less than 3s

     **checks.........................: 100.00% ✓ 16       ✗ 0  **
     data_received..................: 64 kB   6.2 kB/s
     data_sent......................: 6.3 kB  605 B/s
     http_req_blocked...............: avg=39.96ms  min=22.34ms  med=27.47ms  max=130.66ms p(90)=60.4ms   p(95)=95.53ms 
     http_req_connecting............: avg=11.09ms  min=10.16ms  med=10.87ms  max=11.99ms  p(90)=11.93ms  p(95)=11.96ms 
     http_req_duration..............: avg=253.06ms min=192.84ms med=215.06ms max=528.05ms p(90)=330.83ms p(95)=429.44ms
       { expected_response:true }...: avg=253.06ms min=192.84ms med=215.06ms max=528.05ms p(90)=330.83ms p(95)=429.44ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 8  
     http_req_receiving.............: avg=453.38µs min=114.16µs med=495.55µs max=657.56µs p(90)=653.52µs p(95)=655.54µs
     http_req_sending...............: avg=287.79µs min=87.78µs  med=280.63µs max=598.79µs p(90)=461.33µs p(95)=530.06µs
     http_req_tls_handshaking.......: avg=19.64ms  min=12.02ms  med=16.67ms  max=47.02ms  p(90)=26.63ms  p(95)=36.83ms 
     http_req_waiting...............: avg=252.32ms min=192.1ms  med=214.22ms max=527.61ms p(90)=330.49ms p(95)=429.05ms
     http_reqs......................: 8       0.772309/s
     **iteration_duration.............: avg=1.29s **   min=1.22s    med=1.24s    max=1.55s    p(90)=1.43s    p(95)=1.49s   
     **iterations.....................: 8       0.772309/s**
     vus............................: 1       min=1      max=1
     vus_max........................: 1       min=1      max=1

Done in 11.75s.

```

| indicador        |                        info                        |
| ---------------- | :------------------------------------------------: |
| checks           |     numero de iteracoes com sucesso e falhadas     |
| iterations = avg |            media de tempo das iterações            |
| vus              | numero de usuarios simultaneos alcançados no teste |

# Tipos de Executores


## shared-iterations

- um número fixo de iterações é "compartilhado" entre várias VUs e o teste termina quando todas as iterações são executadas. 
- as iterações não são distribuídas de maneira igual por vu.
- 

**vu**: número de vu a ser executada
**iterations**: número TOTAL de iterações, não importando a divisão entre as vus
**maxDurayion**: duração máxima do cenário, antes de ser parado a força



**gracefulStop**: especifica o tempo de parar o cenário, caso não queira que o K6 pare o teste abruptamente. (melhores práticas, por padrão um `gracefulStop` de 30s é recomendado) 


