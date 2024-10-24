<template>
  <v-container class="pa-md-12 pa-sm-6" fluid>
    <v-responsive class="text-center mx-auto mb-6 mb-md-12" max-width="700">
      <h1 class="text-md-h4 font-weight-bold mb-4 text-sm-h5">Preços</h1>

      <p class="text-subtitle-1 text-medium-emphasis">
        Com certeza um dos nossos planos entrega tudo o que você precisa!
      </p>
    </v-responsive>

    <v-row dense class="d-flex">
        <v-col 
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="plan in plans"
        :key="plan.title"
        >
            <v-sheet
              border
              class="mx-auto pa-2 mb-4"
              height="830"
              rounded="xl"
            >
              <v-row>
                <v-col cols="12" >
                  <v-card
                    border
                    class="h-100 flex-column d-flex align-center justify-center pa-4"
                    color="grey"
                    rounded="xl"
                    variant="tonal"
                  >
                    <div
                      class="text-subtitle-1 font-weight-medium mb-3 opacity-70 text-high-emphasis"
                    >
                      Acesso imediato!
                    </div>
        
                    <div class="text-h3 mb-8 text-high-emphasis font-weight-bold">
                      {{plan.amount}}
                      <!-- <small class="text-overline">USD</small> -->
                    </div>
        
                    <v-btn
                      class="mb-5 text-none"
                      color="primary"
                      max-height="36"
                      max-width="256"
                      rounded="lg"
                      text="Escolher"
                      variant="flat"
                      width="100%"
                    />
        
                    <div class="text-caption text-medium-emphasis w-75 text-center">
                      Todos os planos permitem cancelamento a qualquer momento.
                    </div>
                  </v-card>
                </v-col>
        
                <v-col class="pa-6" cols="12">
                  <h2 class="text-h5 font-weight-bold mb-4 text-center">{{ plan.title }}</h2>
        
                  <p class="text-medium-emphasis mb-4 text-center">
                    {{ plan.description }}
                  </p>
        
                  <div class="d-flex align-center mb-8">
                    <span
                      class="text-primary text-no-wrap text-body-2 font-weight-medium me-4"
                      >Beneficios</span
                    >
        
                    <v-divider />
                  </div>
        
                  <v-row dense>
                    <v-col v-for="feature in plan.features" :key="feature" cols="12">
                      <v-icon color="success" icon="$success" />
        
                      <span class="text-caption ms-2"> {{ feature }} </span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-sheet>
        </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>

const plans = [
    {
        title: "Free",
        description: "Tenha acesso para testar a plataforma e conhecer seu potencial",
        features: [
            "Até 10 minutos por mês"
        ],
        amount: "R$0,00"
    },
    {
        title: "Pro",
        description: "Estude muito mais com um plano acessível e que cabe no seu bolso!!!",
        features: [
            "Até 60 minutos por mês",
            "Processamento mais rápido",
            "Suporte técnico",
        ],
        amount: "R$29,00"
    },
    {
        title: "Premium",
        description: "Tenha acesso antecipado as novas features e melhorias de tradução!!!",
        features: [
            "Até 120 minutos por mês",
            "Processamento mais rápido",
            "Suporte técnico",
            "Modelos de LLM avançados",
            "Prioridade na fila de processamentos",
        ],
        amount: "R$49,00"
    },
    {
        title: "Enterprise",
        description: "Entre em contato para montarmos o melhor plano para você.",
        features: [
            "Sem limite de minutos",
            "Prioridade total",
            "Ambiente dedicado",
            "Solicitação de feature por demanda",
            "SLA de atendimento",
            "Modelos de LLM avançados",
        ],
        amount: "Consulte"
    },
]
</script>
  