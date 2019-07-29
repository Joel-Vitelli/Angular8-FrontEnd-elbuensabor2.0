import { Component, OnInit, ViewChild } from "@angular/core";
import { animate, state, style, transition, trigger} from "@angular/animations";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

import { Manofacturado } from "../../interfaces/manofacturado";
import { ArticuloService } from "../../services/articulo/articulo.service";
import { SocketService } from "../../../Shared/services/socket/socket.service";
import { SnackBarService } from "../../../Shared/services/snack-bar/snack-bar.service";
import { ConfirmDialogService } from "../../../Shared/services/confirm.dialog/confirm-dialog.service";

@Component({
  selector: "app-articulo-manofacturado",
  templateUrl: "./articulo-manofacturado.component.html",
  styleUrls: ["./articulo-manofacturado.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class ArticuloManofacturadoComponent implements OnInit {
  dataSource: MatTableDataSource<Manofacturado> = new MatTableDataSource();
  columnsToDisplay = ["nombre", "precio", "tiempoDeCoccion", "delete"];
  expandedElement: Manofacturado | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private articuloService: ArticuloService,
    private ioService: SocketService,
    private snackBar: SnackBarService,
    private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.getArticulos();
    this.ioService.socket.on("refreshManofacturado", () => {
      this.getArticulos();
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getArticulos() {
    this.articuloService
      .getArticuloManofacturado()
      .subscribe((data: Manofacturado[]) => {
        this.dataSource.data = data;
      });
  }
  deleteArtManofacturado(id: string) {
    this.confirmDialogService
      .getConfirmation("¿Eliminar articulo?")
      .then((confirmation: boolean) => {
        if (confirmation) {
          this.articuloService
            .deleteArticuloManofacturado(id)
            .toPromise()
            .then(() => {
              this.snackBar.openSnackBar("Articulo eliminado correctamente");
            })
            .catch(err => {
              if (err && err.status === 403) {
                this.snackBar.openSnackBar(
                  "Este articulo se encuentra en uso para un producto. No se puede ser eliminado"
                );
              }
              this.snackBar.openSnackBar(
                "Error al eliminar articulo, intente nuevamente"
              );
            });
        }
      });
  }
}
