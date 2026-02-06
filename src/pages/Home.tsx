import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { usePessoaApi } from "../Hooks/UsarApiBunker";

export function Home() {
  const [id, setId] = useState<string|number>(0);

  const { data, loading, error, buscarPessoaPorId } = usePessoaApi();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar Pessoa</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonInput
          type="number"
          placeholder="Digite o ID da pessoa"
          onIonChange={(e) => setId(parseInt(e.detail.value!))}
        />

        <IonButton
          onClick={() => buscarPessoaPorId(id)}
          expand="block"
        >
          {loading ? "Buscando..." : "Buscar"}
        </IonButton>

        {error && <IonText color="danger">{error}</IonText>}

        {data && (
          <IonList>
            <IonItem>
              <IonLabel>CNPJ/CPF: {data.cnpj}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Código: {data.codigo}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Documento: {data.tipo}</IonLabel>
            </IonItem>
          </IonList>
        )}

      </IonContent>
    </IonPage>
  );
}
